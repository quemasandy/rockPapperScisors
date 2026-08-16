# 10 — Limpiar Código Muerto

## 🎯 Objetivo

Eliminar código que no tiene propósito y archivos obsoletos.

## 📚 Concepto: Code Hygiene en Clean Architecture

Clean Architecture no es solo sobre la estructura de capas — también es sobre **claridad**. Cada archivo, clase y método debe tener un **propósito claro**. El código muerto genera confusión.

> "El código que no debería existir es el peor tipo de deuda técnica." — Robert C. Martin

## ✅ Qué hacer

### 1. Eliminar `src/domain/entities/Player.ts`

```typescript
// Este archivo está vacío y no se usa en ningún lado
export class Player {
    
}
```

**¿Por qué eliminarlo?**
- Está vacío — no tiene propiedades ni métodos
- Ningún otro archivo lo usa (excepto `Game.ts` que lo importa pero no hace nada con él)
- Si en el futuro necesitas un `Player` con nombre, puntaje o historial, lo creas cuando tenga propósito

### 2. Eliminar `src/application/StartGame.ts`

Ya fue reemplazado por `PlayGameUseCase.ts` en el paso 06.

### 3. Verificar imports huérfanos

Asegúrate de que ningún archivo importa `Player` o `StartGame`.

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ No hay archivos sin propósito
3. ✅ No hay imports que apunten a archivos eliminados
4. ✅ `npm start` funciona correctamente

## 💡 Reflexión

En Clean Architecture, **menos es más**. Cada clase debe justificar su existencia. Si no tiene lógica de negocio, ni es usada por nadie, elimínala. Siempre puedes recrearla cuando la necesites — para eso tienes Git.

## Estado: ✅ Completado
