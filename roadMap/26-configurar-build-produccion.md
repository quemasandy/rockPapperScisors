# 26 — Separar Build y Type-check

## 🎯 Objetivo

Crear configuraciones distintas para revisar todo el workspace y para generar un
artefacto productivo que contenga exclusivamente `src`.

## 📚 Concepto: Configuración de Entrega

El type-check debe validar tanto producción como tests. El build, en cambio, debe
emitir solo lo necesario para ejecutar la aplicación. Son dos operaciones con
propósitos y alcances distintos.

## 🔍 Problema actual

`tsconfig.json` usa `rootDir: ./src` y solo incluye `src/**/*`. Después de mover los
tests, estos quedarían fuera del type-check. Tampoco existe un script de build ni
una configuración que garantice que `dist` no incluya pruebas.

## ✅ Qué hacer

1. Usar `tsconfig.json` para desarrollo y type-check:
   - incluir `src/**/*` y `tests/**/*`;
   - quitar `rootDir` y `outDir` de la configuración compartida;
   - establecer `noEmit: true`.
2. Crear `tsconfig.build.json` que extienda la base y defina:

```json
{
  "compilerOptions": {
    "noEmit": false,
    "rootDir": "./src",
    "outDir": "./dist"
  },
  "include": ["src/**/*"],
  "exclude": ["tests", "**/*.test.ts", "**/__tests__/**"]
}
```

3. Añadir a `package.json`:

```json
"build": "tsc -p tsconfig.build.json",
"typecheck": "tsc -p tsconfig.json",
"verify": "npm run typecheck && npm test && npm run build"
```

4. Actualizar `main` de `package.json` para apuntar al entrypoint generado en
   `dist`.

## 🧪 Pruebas

- Introducir temporalmente un error de tipos en un test y confirmar que
  `npm run typecheck` lo detecta; revertirlo inmediatamente.
- Ejecutar el build y revisar los archivos generados.
- Confirmar que ningún `.test.js`, fake o carpeta `tests` aparece en `dist`.
- Ejecutar el entrypoint compilado con Node 24.

## ✅ Criterios de finalización

- `npm run typecheck` cubre producción y tests sin emitir archivos.
- `npm run build` emite únicamente código productivo.
- `npm run verify` ejecuta type-check, tests y build en ese orden.
- El código compilado permite jugar una ronda.

## 💡 Reflexión

Separar validación y entrega evita elegir entre tests tipados o builds limpios. La
configuración también forma parte de los límites del sistema.

## Estado: ✅ Completada
