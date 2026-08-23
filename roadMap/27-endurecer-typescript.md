# 27 — Endurecer TypeScript

## 🎯 Objetivo

Activar comprobaciones que detecten accesos inseguros, código muerto y diferencias
de casing antes de ejecutar la aplicación.

## 📚 Concepto: Seguridad Estática

Clean Architecture controla dependencias entre módulos; el compilador puede
controlar invariantes locales. Ambas defensas reducen estados inválidos y hacen
que los límites sean más confiables.

## 🔍 Problema actual

Aunque `strict` está activo, un acceso `weapons[index]` se infiere como `Weapon`
aun cuando un índice podría estar fuera del arreglo. Tampoco se reportan imports,
variables o parámetros que hayan quedado obsoletos durante el refactor.

## ✅ Qué hacer

Añadir a `compilerOptions`:

```json
"noUncheckedIndexedAccess": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"forceConsistentCasingInFileNames": true
```

1. Resolver cada error sin usar `any`, non-null assertions (`!`) ni desactivar la
   regla localmente.
2. En el adapter aleatorio, comprobar explícitamente el resultado del acceso al
   arreglo antes de devolverlo.
3. Eliminar imports y colaboradores que hayan quedado sin uso.
4. Renombrar parámetros deliberadamente ignorados con `_` solo cuando el contrato
   realmente exija conservarlos.
5. Aplicar las mismas reglas a `src` y `tests` mediante la configuración base.

## 🧪 Pruebas

- `npm run typecheck` debe pasar con las cuatro reglas activas.
- Las ramas defensivas del adapter aleatorio deben estar cubiertas cuando puedan
  recibir una fuente inyectada fuera de contrato.
- `npm run build` y todas las pruebas deben continuar pasando.

## ✅ Criterios de finalización

- No se utilizan `any`, `!` ni comentarios para silenciar los nuevos errores.
- Todos los accesos por índice tienen un resultado seguro.
- No quedan imports, variables ni parámetros accidentales sin uso.
- `npm run verify` pasa.

## 💡 Reflexión

Un compilador estricto convierte supuestos implícitos en decisiones visibles. La
solución correcta no es callarlo, sino representar o controlar el caso inseguro.

## Estado: ⬜ Pendiente
