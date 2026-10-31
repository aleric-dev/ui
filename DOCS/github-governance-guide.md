# 🛡️ Guía de Gobernanza y Protección de Ramas en GitHub (`@aleric-dev/ui`)

> Esta guía describe la configuración exacta que debes aplicar en **GitHub Web** (`https://github.com/aleric-dev/ui/settings`) para bloquear pushes directos a `main` a todos los desarrolladores (incluyendo administradores) y garantizar que cada cambio pase por un Pull Request tipado con **Conventional Commits**.

---

## 🔒 Opción Recomendada: GitHub Ruleset (Moderna y Precisa)

Los **Repository Rulesets** son el mecanismo estándar de GitHub para aplicar reglas estrictas tanto a colaboradores como a administradores, permitiendo excepciones limpias a bots de CI/CD.

### Paso 1: Acceder a Rulesets
1. Ve al repositorio en GitHub: [https://github.com/aleric-dev/ui](https://github.com/aleric-dev/ui)
2. Haz clic en **Settings** (pestaña superior).
3. En el menú lateral izquierdo, bajo la sección **Code and automation**, haz clic en **Rules ➔ Rulesets**.
4. Haz clic en el botón verde **New ruleset ➔ New branch ruleset**.

### Paso 2: Configurar la Regla Principal
- **Ruleset Name**: `Main Branch Governance (Strict SemVer)`
- **Enforcement status**: Selecciona **Active**.

### Paso 3: Definir Ramas Objetivo (Target branches)
- En **Target branches**, haz clic en **Add target ➔ Include default branch** (o especifica `main`).

### Paso 4: Configurar Restricciones Obligatorias
Marca las siguientes casillas:

1. ✅ **Restrict creations**: Evita que se cree una rama llamada `main` si no existiera.
2. ✅ **Restrict deletions**: Impide borrar la rama `main`.
3. ✅ **Block force pushes**: Prohíbe terminantemente `git push --force`.
4. ✅ **Require a pull request before merging**:
   - Required approvals: `0` (si trabajas solo o en equipo pequeño) o `1` (si requieres revisión por pares).
   - Dismiss stale pull request approvals when new commits are pushed: Activado.
5. ✅ **Require status checks to pass before merging**:
   - Haz clic en **Add checks** y selecciona únicamente el job de compilación y previsualización SemVer:
     - `Verify Compilation & SemVer Preview` (del workflow `pr-check.yml`).
   - Marca la opción **Require branches to be up to date before merging**.

### Paso 5: Prohibir Bypasses (Aplica para Ti y Todos los Admins)
- En la sección **Bypass list**:
  - Asegúrate de que **tu usuario NO esté en la lista de bypass** (así nadie puede hacer push directo a `main` desde la terminal).
  - Haz clic en **Add bypass ➔ Roles** o **Apps** y selecciona:
    - **GitHub Actions (Workflow)** o `github-actions[bot]` con permiso de **Always allow**.
    > 💡 *¿Por qué es necesario este bypass?* Porque cuando haces merge de tu PR en GitHub, el workflow `.github/workflows/release.yml` necesita hacer commit del incremento de versión en `package.json`, actualizar `CHANGELOG.md` y crear el Git Tag automáticamente. Si no autorizas al bot, GitHub bloquearía la actualización automática del changelog.

6. Haz clic en **Save changes**.

---

## 🚀 Flujo de Trabajo Diario (Git Flow Estándar)

Una vez configurado, tu flujo de trabajo será:

```bash
# 1. Crear una rama descriptiva
git checkout -b feat/avatar-component

# 2. Hacer tus cambios y commits convencionales
git add .
git commit -m "feat(avatar): agrega componente Avatar con soporte de fallback"

# 3. Subir tu rama a GitHub
git push origin feat/avatar-component

# 4. Abrir el Pull Request en GitHub
# Título del PR sugerido: feat(avatar): agrega componente Avatar con soporte de fallback

# 5. Los checks automáticos validarán el título y la compilación.
# 6. Al hacer "Squash and merge" en main:
#    - GitHub Actions ejecutará release.yml
#    - Se calculará el bump de SemVer (minor para feat, patch para fix)
#    - Se actualizará CHANGELOG.md automáticamente
#    - Se generará la release en GitHub con los bundles compilados
```
