# Configuración de Git - Problemas Resueltos

## 🔴 Problemas Encontrados

### 1. Advertencias LF/CRLF (INFORMATIVAS, no críticas)
```
warning: in the working copy of 'file.ts', LF will be replaced by CRLF
```

**Causa**: Windows usa CRLF (Carriage Return + Line Feed) para terminaciones de línea, mientras que Unix/Mac usa LF. Git convierte automáticamente al hacer checkout.

**Solución aplicada**: Estas advertencias son **normales en Windows** y no afectan la funcionalidad.

### 2. Repositorio Git Embebido (CRÍTICO) ✅ RESUELTO
```
warning: adding embedded git repository: frontend
```

**Causa**: El directorio `frontend/` tenía su propio `.git`, convirtiéndolo en un repositorio separado.

**Solución aplicada**:
```bash
rm -rf frontend/.git
```

### 3. node_modules en Git (CRÍTICO) ✅ RESUELTO

**Causa**: No existían archivos `.gitignore` apropiados.

**Solución aplicada**: Creación de `.gitignore` en la raíz:
```
node_modules/
*.db
*.db-shm
*.db-wal
.env
dist/
build/
*.log
.DS_Store
```

## ✅ Estado Actual

**44 archivos listos para commit** (solo código fuente, sin dependencias)

### Archivos correctamente excluidos:
- ✅ `node_modules/` (backend y frontend)
- ✅ `*.db` (base de datos SQLite)
- ✅ `*.db-shm` and `*.db-wal` (archivos WAL de SQLite)

### Archivos incluidos (correcto):
- ✅ Código fuente TypeScript (`backend/src/`, `frontend/src/`)
- ✅ Archivos de configuración (`package.json`, `tsconfig.json`)
- ✅ Documentación (`.md`)

## 📋 Próximos Pasos

```bash
# 1. Hacer commit
git commit -m "feat: Implementación inicial de AppTEA con backend (Express+SQLite+JWT) y frontend (Next.js+Tailwind v4)"

# 2. (Opcional) Si tienes repositorio remoto:
git remote add origin <URL_REPOSITORIO>
git push -u origin master
```

## 🔧 Configuración Opcional (Silenciar Advertencias LF/CRLF)

Si deseas eliminar las advertencias LF/CRLF (opcional):

```bash
# Opción 1: Configurar Git para manejar automáticamente
git config core.autocrlf true

# Opción 2: Crear .gitattributes
echo "* text=auto" > .gitattributes
git add .gitattributes
```

**Recomendación**: No es necesario, son solo advertencias informativas.

## 📚 Comandos Útiles

```bash
# Ver estado resumido
git status --short

# Ver archivos ignorados
git status --ignored

# Ver último commit
git log -1

# Deshacer staging (sin perder cambios)
git reset

# Ver diferencias
git diff --staged
```
