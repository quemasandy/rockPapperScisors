# 17 — Neutralizar el Lenguaje del Dominio

## 🎯 Objetivo

Eliminar el idioma de presentación de los valores internos del dominio y hacer
que el presenter sea el único responsable de traducir armas al español.

## 📚 Concepto: Dominio Independiente de la UI

El dominio expresa conceptos estables del negocio. El texto que ve una persona,
su idioma, sus emojis o su formato pertenecen a presentación. Si el valor interno
de un enum ya viene traducido, una decisión de UI se filtra hacia el centro.

## 🔍 Problema actual

`Weapon.Rock`, `Weapon.Paper` y `Weapon.Scissors` contienen respectivamente
`piedra`, `papel` y `tijeras`. `GamePresenter` aprovecha esos valores directamente,
por lo que el dominio está actuando como mecanismo de localización.

## ✅ Qué hacer

1. Cambiar los valores de `Weapon`:

```ts
export enum Weapon {
    Rock = 'rock',
    Paper = 'paper',
    Scissors = 'scissors',
}
```

2. Crear en `GamePresenter` un mapa exhaustivo `Record<Weapon, string>` que
   traduzca cada arma al español.
3. Mantener en el controller las entradas aceptadas actualmente: `1`, `2`, `3`,
   `piedra`, `papel` y `tijeras`.
4. Actualizar los tests que hayan confundido el identificador interno con el
   texto mostrado.
5. No introducir todavía un servicio de internacionalización; solo existe una
   presentación en español.

## 🧪 Pruebas

- El presenter transforma `Weapon.Rock` en `piedra`.
- El presenter transforma `Weapon.Paper` en `papel`.
- El presenter transforma `Weapon.Scissors` en `tijeras`.
- La salida completa sigue mostrando español y nunca `rock`, `paper` o `scissors`.
- Las reglas de victoria no cambian.

## ✅ Criterios de finalización

- No hay texto localizado en los valores de `Weapon`.
- Solo la capa de presentación conoce las etiquetas españolas de las armas.
- El comportamiento visible del CLI permanece igual.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

Un modelo interno neutral permite crear otra UI o idioma sin editar las reglas de
negocio. La independencia se comprueba observando qué cambia ante una decisión de
presentación.

## Estado: ⬜ Pendiente
