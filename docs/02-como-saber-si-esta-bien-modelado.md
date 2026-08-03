# 🎯 ¿Cómo saber si algo está bien o mal modelado?

## La pregunta del millón

"Mal modelado" no significa que el código no funcione. Tu `Game.evaluateAnswer()` funciona — compila, se ejecuta, no tira errores. Pero está **mal modelado** porque no representa fielmente la realidad del negocio.

> **Modelar bien = que tu código cuente la misma historia que tu negocio.**

---

## Las 5 señales de un mal modelado

### 1. 🔴 El código no dice lo que hace el negocio

Tu código actual:

```typescript
evaluateAnswer(answer: string) {
    const machineAnswer = this.machine.generateWeapon()
    if (machineAnswer === answer) {
        return true
    }
    return false
}
```

Lee esto como si fuera una historia: *"Evalúo la respuesta. Si la máquina y el jugador eligen lo mismo, devuelvo verdadero."*

Ahora piensa en las reglas **reales** de Piedra-Papel-Tijera:
- Piedra vence a Tijeras ✂️
- Tijeras vence a Papel 📄
- Papel vence a Piedra 🪨
- Si ambos eligen lo mismo, es empate 🤝

¿Tu código refleja esas reglas? **No.** Solo compara igualdad. Si el jugador elige "piedra" y la máquina "tijeras", tu código devuelve `false` (perdiste), cuando debería ser una victoria.

**Señal:** Si alguien lee tu código y no puede entender las reglas del negocio, el modelado es malo.

### 2. 🔴 Los tipos no protegen contra errores

```typescript
evaluateAnswer(answer: string)  // Acepta CUALQUIER string
```

¿Qué pasa si alguien llama `evaluateAnswer("pizza")`? El código no se queja. Compara `"pizza"` con un `Weapon` y devuelve `false`. No hay error, no hay advertencia. Simplemente funciona mal en silencio.

**Señal:** Si puedes pasar datos inválidos sin que el sistema se queje, el modelado es débil.

Un buen modelado usa el sistema de tipos para hacer **imposibles los estados inválidos**:

```typescript
// ✅ Solo acepta armas válidas — "pizza" es un error de compilación
play(playerWeapon: Weapon): GameResult
```

### 3. 🔴 El retorno es ambiguo

```typescript
return true   // ¿Qué significa true? ¿Ganó? ¿Empató? ¿La respuesta es válida?
return false  // ¿Qué significa false? ¿Perdió? ¿Error? ¿Empate?
```

Un `boolean` no tiene semántica. `true` y `false` podrían significar cualquier cosa. El que llama tiene que **adivinar** qué significa.

**Señal:** Si necesitas leer la implementación de un método para saber qué significan sus valores de retorno, el modelado es pobre.

Un buen modelado usa el **lenguaje del dominio** (Ubiquitous Language):

```typescript
// ✅ El retorno habla el idioma del negocio
enum GameResult {
    Win = "win",
    Lose = "lose",
    Draw = "draw",
}

play(playerWeapon: Weapon): { result: GameResult; machineWeapon: Weapon }
```

Nadie tiene que adivinar qué significa `GameResult.Win`.

### 4. 🔴 Faltan estados del negocio

Tu código tiene dos estados: `true` y `false`. Pero el juego real tiene **tres** estados: ganar, perder, empatar.

```
Tu código:      true | false           → 2 estados
Reglas reales:  Win  | Lose  | Draw    → 3 estados
```

Falta un estado entero (`Draw`). Eso significa que tu modelo es **incompleto** — no puede representar todas las situaciones posibles del negocio.

**Señal:** Si hay situaciones reales del negocio que tu código no puede representar, el modelado está incompleto.

### 5. 🔴 El nombre del método no refleja la acción

```typescript
evaluateAnswer(answer: string)  // ¿Evaluar qué? ¿Una respuesta de un examen?
```

En Piedra-Papel-Tijera, no se "evalúan respuestas". Se **juega una ronda**. El nombre debería reflejar lo que hace el negocio:

```typescript
play(playerWeapon: Weapon)  // "Jugar" — exactamente lo que hace el negocio
```

**Señal:** Si tienes que explicar qué hace un método porque su nombre no lo dice, el modelado necesita trabajo.

---

## Checklist: ¿Mi modelado es bueno?

Cuando modeles algo en el dominio, revisa esta lista:

```
□ ¿Un experto del negocio entendería mi código sin saber programar?
□ ¿Los nombres de clases y métodos usan el lenguaje del negocio?
□ ¿Los tipos previenen estados inválidos? (no acepta "pizza" como arma)
□ ¿Todos los estados del negocio están representados? (ganar, perder, empatar)
□ ¿Los retornos son semánticos? (GameResult vs boolean)
□ ¿Las reglas de negocio están en el código, no en la cabeza del programador?
□ ¿Si cambio cómo interactúa el usuario, las reglas siguen intactas?
```

---

## Ejemplo completo: Antes vs Después

### ❌ Mal modelado

```typescript
class Game {
    evaluateAnswer(answer: string) {
        const machineAnswer = this.machine.generateWeapon()
        if (machineAnswer === answer) {
            return true
        }
        return false
    }
}
```

Problemas:
- `answer: string` → acepta cualquier texto
- `return true/false` → ambiguo
- Solo compara igualdad → reglas incompletas
- No devuelve qué eligió la máquina → información perdida
- Nombre genérico → no dice qué hace

### ✅ Bien modelado

```typescript
enum GameResult {
    Win = "win",
    Lose = "lose",
    Draw = "draw",
}

class Game {
    play(playerWeapon: Weapon): { result: GameResult; machineWeapon: Weapon } {
        const machineWeapon = this.machine.generateWeapon();

        if (playerWeapon === machineWeapon) {
            return { result: GameResult.Draw, machineWeapon };
        }

        const winsAgainst: Record<Weapon, Weapon> = {
            [Weapon.Rock]: Weapon.Scissors,
            [Weapon.Paper]: Weapon.Rock,
            [Weapon.Scissors]: Weapon.Paper,
        };

        const result = winsAgainst[playerWeapon] === machineWeapon
            ? GameResult.Win
            : GameResult.Lose;

        return { result, machineWeapon };
    }
}
```

Mejoras:
- `playerWeapon: Weapon` → solo acepta armas válidas
- `GameResult` → retorno semántico y completo
- `winsAgainst` → las reglas están **escritas en el código**, no en la cabeza del programador
- Devuelve `machineWeapon` → el llamador tiene toda la información
- `play()` → nombre que habla el idioma del juego

---

## La metáfora del mapa

Modelar es como hacer un mapa. Un buen mapa de una ciudad:
- Muestra **todas** las calles (no le faltan estados)
- Las calles tienen **nombre** (no dice "calle true" y "calle false")
- Refleja la **realidad** (si hay una calle de un solo sentido, el mapa lo muestra)
- Es **útil** sin necesitar explicación adicional

Tu código es el mapa de tu negocio. Si el mapa no refleja la realidad, los que lo lean se van a perder.

---

## Resumen

```
Bien modelado = Tu código es un ESPEJO del negocio.

                Un experto del negocio debería poder leer
                tus clases, métodos y tipos y decir:
                "Sí, así funciona el juego."

Mal modelado  = Tu código FUNCIONA, pero no REFLEJA el negocio.

                Faltan estados, los nombres son genéricos,
                los tipos son débiles, las reglas están
                incompletas o en la cabeza del programador.
```
