#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const isDryRun = process.argv.includes('--dry-run');
const rootDir = path.resolve(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const changelogPath = path.join(rootDir, 'CHANGELOG.md');

// 1. Leer package.json actual
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentVersion = pkg.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

// 2. Obtener el último tag de Git
let latestTag = '';
try {
  latestTag = execSync('git describe --tags --abbrev=0', {
    cwd: rootDir,
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'ignore'],
  }).trim();
} catch (e) {
  latestTag = '';
}

console.log(`📌 Versión actual en package.json: v${currentVersion}`);
console.log(`🏷️ Último tag Git detectado: ${latestTag || '(Ninguno - primer release)'}`);

// 3. Obtener commits desde el último tag
const gitLogRange = latestTag ? `${latestTag}..HEAD` : 'HEAD';
let rawCommits = '';
try {
  rawCommits = execSync(`git log ${gitLogRange} --pretty=format:"%H|%s|%an"`, {
    cwd: rootDir,
    encoding: 'utf8',
  }).trim();
} catch (e) {
  rawCommits = '';
}

if (!rawCommits) {
  console.log('ℹ️ No hay nuevos commits desde el último tag. No se requiere nuevo release.');
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'has_release=false\n');
  }
  process.exit(0);
}

const commitLines = rawCommits.split('\n').filter(Boolean);
console.log(`📝 Analizando ${commitLines.length} commits nuevos...`);

// 4. Clasificar commits y determinar SemVer bump
let bumpType = 'patch';
const categorized = {
  features: [],
  fixes: [],
  improvements: [],
  maintenance: [],
  other: [],
};

for (const line of commitLines) {
  const [hash, subject, author] = line.split('|');
  const shortHash = hash ? hash.substring(0, 7) : '';
  const item = { hash: shortHash, subject, author };

  // Detectar Breaking Change
  if (subject.includes('BREAKING CHANGE') || /^[a-z]+(\([a-z-]+\))?!:/.test(subject)) {
    bumpType = 'major';
  } else if (/^feat(\([a-z-]+\))?:/i.test(subject) && bumpType !== 'major') {
    bumpType = 'minor';
  }

  // Agrupar
  if (/^feat(\([a-z-]+\))?:/i.test(subject)) {
    categorized.features.push(item);
  } else if (/^fix(\([a-z-]+\))?:/i.test(subject)) {
    categorized.fixes.push(item);
  } else if (/^(refactor|perf|style)(\([a-z-]+\))?:/i.test(subject)) {
    categorized.improvements.push(item);
  } else if (/^(chore|docs|test|ci|build)(\([a-z-]+\))?:/i.test(subject)) {
    // Excluir commits de release generados por el bot
    if (!subject.includes('chore(release):')) {
      categorized.maintenance.push(item);
    }
  } else {
    categorized.other.push(item);
  }
}

// Si todos los commits fueron únicamente del release anterior del bot, salir
const totalValidCommits =
  categorized.features.length +
  categorized.fixes.length +
  categorized.improvements.length +
  categorized.maintenance.length +
  categorized.other.length;

if (totalValidCommits === 0) {
  console.log('ℹ️ Todos los commits son del bot de release. No se requiere nuevo release.');
  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, 'has_release=false\n');
  }
  process.exit(0);
}

// 5. Calcular nueva versión SemVer
let newVersion = '';
if (bumpType === 'major') {
  newVersion = `${major + 1}.0.0`;
} else if (bumpType === 'minor') {
  newVersion = `${major}.${minor + 1}.0`;
} else {
  newVersion = `${major}.${minor}.${patch + 1}`;
}

const newTag = `v${newVersion}`;
console.log(`🚀 Siguiente versión calculada: ${newTag} (Incremento: ${bumpType.toUpperCase()})`);

// 6. Generar notas de la versión en Markdown
const today = new Date().toISOString().split('T')[0];
let releaseNotes = `## [${newVersion}] - ${today}\n\n`;

if (categorized.features.length > 0) {
  releaseNotes += `### Added / Features\n`;
  for (const c of categorized.features) {
    releaseNotes += `- ${c.subject} (\`${c.hash}\`)\n`;
  }
  releaseNotes += `\n`;
}

if (categorized.fixes.length > 0) {
  releaseNotes += `### Fixed / Bug Fixes\n`;
  for (const c of categorized.fixes) {
    releaseNotes += `- ${c.subject} (\`${c.hash}\`)\n`;
  }
  releaseNotes += `\n`;
}

if (categorized.improvements.length > 0) {
  releaseNotes += `### Changed / Improvements\n`;
  for (const c of categorized.improvements) {
    releaseNotes += `- ${c.subject} (\`${c.hash}\`)\n`;
  }
  releaseNotes += `\n`;
}

if (categorized.maintenance.length > 0) {
  releaseNotes += `### Maintenance & Chore\n`;
  for (const c of categorized.maintenance) {
    releaseNotes += `- ${c.subject} (\`${c.hash}\`)\n`;
  }
  releaseNotes += `\n`;
}

if (categorized.other.length > 0) {
  releaseNotes += `### Other Changes\n`;
  for (const c of categorized.other) {
    releaseNotes += `- ${c.subject} (\`${c.hash}\`)\n`;
  }
  releaseNotes += `\n`;
}

console.log('--- NOTAS DE RELEASE GENERADAS ---');
console.log(releaseNotes.trim());
console.log('----------------------------------');

if (isDryRun) {
  console.log('🧪 Modo DRY-RUN activado. No se escribieron cambios en archivos.');
  process.exit(0);
}

// 7. Actualizar package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log(`✅ package.json actualizado a v${newVersion}`);

// 8. Actualizar CHANGELOG.md
if (fs.existsSync(changelogPath)) {
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  const unreleasedMarker = '## [Unreleased]';

  if (changelog.includes(unreleasedMarker)) {
    const replacement = `${unreleasedMarker}\n\n---\n\n${releaseNotes.trim()}`;
    const updatedChangelog = changelog.replace(unreleasedMarker, replacement);
    fs.writeFileSync(changelogPath, updatedChangelog, 'utf8');
    console.log(`✅ CHANGELOG.md actualizado con la entrada [${newVersion}]`);
  } else {
    // Si no tiene el marker, anteponer al inicio
    const updatedChangelog = `# Changelog\n\n${releaseNotes}\n---\n\n` + changelog.replace(/^# Changelog\s*\n*/i, '');
    fs.writeFileSync(changelogPath, updatedChangelog, 'utf8');
    console.log(`✅ CHANGELOG.md actualizado al inicio.`);
  }
}

// 9. Guardar archivo temporal con notas de release para GitHub Actions
const releaseNotesTempPath = path.join(rootDir, 'RELEASE_NOTES.tmp.md');
fs.writeFileSync(releaseNotesTempPath, releaseNotes, 'utf8');

// 10. Emitir variables de salida para GitHub Actions
if (process.env.GITHUB_OUTPUT) {
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `has_release=true\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `version=${newVersion}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `tag=${newTag}\n`);
  fs.appendFileSync(process.env.GITHUB_OUTPUT, `notes_file=${releaseNotesTempPath}\n`);
}

console.log(`\n🎉 Preparación de ${newTag} completada exitosamente.`);
