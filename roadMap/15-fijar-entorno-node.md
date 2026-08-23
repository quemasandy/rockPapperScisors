# 15 — Fijar el Entorno de Ejecución

## 🎯 Objetivo

Hacer reproducible el entorno del proyecto y evitar que Vitest falle antes de
ejecutar una sola prueba por utilizar una versión incompatible de Node.js.

## 📚 Concepto: Reproducibilidad

Una arquitectura solo puede evolucionar con seguridad si todas las personas y
los procesos automáticos ejecutan la misma base. La versión del runtime es parte
del contrato técnico del proyecto, igual que las dependencias de `package.json`.

## 🔍 Problema actual

El shell puede seleccionar Node 14, pero Vitest 4.1.10 requiere Node 20, 22 o 24+
y utiliza sintaxis que Node 14 no entiende. El proyecto no declara ese requisito,
por lo que `npm test` termina con un error de parseo de `??=`.

## ✅ Qué hacer

1. Crear `.nvmrc` con la versión `20.19.6`, disponible en el entorno actual.
2. Añadir a `package.json`:

```json
"engines": {
  "node": "^20.0.0 || ^22.0.0 || >=24.0.0"
}
```

3. No actualizar dependencias ni cambiar todavía los scripts; esta tarea solo
   establece el runtime de referencia.
4. Activar la versión declarada antes de continuar:

```bash
nvm use
node --version
```

## 🧪 Pruebas

Ejecutar el baseline sin modificar código productivo:

```bash
npm test
npx tsc --noEmit
```

El resultado esperado es 4 archivos de test y 22 pruebas aprobadas.

## ✅ Criterios de finalización

- `node --version` muestra `v20.19.6` después de `nvm use`.
- `package.json` rechaza o advierte runtimes incompatibles.
- Las 22 pruebas actuales pasan.
- TypeScript compila sin emitir archivos.

## 💡 Reflexión

La reproducibilidad no pertenece al dominio, pero protege todas las decisiones
arquitectónicas posteriores: una prueba que ni siquiera arranca no puede defender
ningún límite.

## Estado: ⬜ Pendiente
