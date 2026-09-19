# 28 — Automatizar la Dependency Rule

## 🎯 Objetivo

Convertir la dirección permitida de las dependencias en una prueba automática que
falle cuando un import atraviese un boundary hacia afuera.

## 📚 Concepto: Fitness Functions Arquitectónicas

Una convención documentada se degrada si ninguna herramienta la verifica. Una
fitness function evalúa continuamente una propiedad estructural, igual que un test
unitario protege una regla de comportamiento.

## 🔍 Problema actual

La estructura de carpetas comunica los anillos, pero TypeScript permite que
`domain` importe accidentalmente un presenter o que `application` conozca un
driver. Los tests de comportamiento pueden seguir verdes aunque la arquitectura
se haya invertido.

## ✅ Qué hacer

1. Instalar `dependency-cruiser` como dependencia de desarrollo.
2. Crear su configuración con reglas que prohíban:
   - `domain` → `application`, `interface-adapters` o `frameworks`;
   - `application` → `interface-adapters` o `frameworks`;
   - `interface-adapters` → `frameworks`;
   - dependencias circulares dentro de `src`.
3. Permitir que `frameworks` dependa de contratos y modelos internos.
4. Excluir `src/main.ts` de las prohibiciones entre anillos, ya que es el
   composition root, pero mantener sobre él la regla de ciclos.
5. Añadir scripts:

```json
"test:architecture": "depcruise src --config .dependency-cruiser.cjs",
"verify": "npm run typecheck && npm test && npm run test:architecture && npm run build"
```

6. Documentar junto a cada regla el boundary que protege y por qué existe.

## 🧪 Pruebas

- Ejecutar `npm run test:architecture` sobre el código válido.
- Crear temporalmente un import de `frameworks` desde `domain` y confirmar que el
  comando falla; eliminar el import inmediatamente.
- Repetir con un ciclo temporal entre dos módulos y revertirlo.
- Ejecutar `npm run verify` completo.

## ✅ Criterios de finalización

- Las cuatro direcciones prohibidas están automatizadas.
- Los ciclos producen un fallo legible.
- `main.ts` puede ensamblar todas las capas sin abrir excepciones más amplias.
- El chequeo arquitectónico forma parte de `verify`.
- `npm run verify` pasa.

## 💡 Reflexión

Una arquitectura protegida por pruebas deja de depender de memoria o disciplina
individual. Las reglas importantes deben fallar de manera rápida y explicable.

## Estado: ✅ Completado
