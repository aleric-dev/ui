#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const type = process.argv[2] || 'patch';
if (!['patch', 'minor', 'major'].includes(type)) {
  console.error('Uso: node scripts/release.cjs [patch | minor | major]');
  process.exit(1);
}

const rootDir = path.resolve(__dirname, '..');
const pkgPath = path.join(rootDir, 'package.json');
const changelogPath = path.join(rootDir, 'CHANGELOG.md');

// 1. Leer package.json
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
const currentVersion = pkg.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

let newVersion = '';
if (type === 'major') newVersion = `${major + 1}.0.0`;
else if (type === 'minor') newVersion = `${major}.${minor + 1}.0`;
else newVersion = `${major}.${minor}.${patch + 1}`;

console.log(`\n🚀 Preparando release: v${currentVersion} ➔ v${newVersion} (${type})`);

// 2. Compilar librería y validar TypeScript
console.log('📦 Validando compilación de la librería (npm run build:lib)...');
try {
  execSync('npm run build:lib', { cwd: rootDir, stdio: 'inherit' });
} catch (err) {
  console.error('❌ Error al compilar la librería. Abortando release.');
  process.exit(1);
}

// 3. Actualizar package.json
pkg.version = newVersion;
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
console.log(`✅ package.json actualizado a v${newVersion}`);

// 4. Actualizar CHANGELOG.md
if (fs.existsSync(changelogPath)) {
  const changelog = fs.readFileSync(changelogPath, 'utf8');
  const today = new Date().toISOString().split('T')[0];

  const unreleasedMarker = '## [Unreleased]';
  const newReleaseHeader = `## [Unreleased]\n\n---\n\n## [${newVersion}] - ${today}`;

  if (changelog.includes(unreleasedMarker)) {
    const updatedChangelog = changelog.replace(unreleasedMarker, newReleaseHeader);
    fs.writeFileSync(changelogPath, updatedChangelog, 'utf8');
    console.log(`✅ CHANGELOG.md actualizado con entrada para v${newVersion}`);
  }
}

console.log(`\n✨ ¡Release v${newVersion} generado con éxito!`);
console.log(`\nComandos sugeridos para publicar:\n`);
console.log(`  git add package.json CHANGELOG.md dist`);
console.log(`  git commit -m "chore(release): v${newVersion}"`);
console.log(`  git tag v${newVersion}`);
console.log(`  git push origin main --tags\n`);
