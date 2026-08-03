# 🔗 ¿Cómo identificar acoplamiento vs desacoplamiento?

## Definición simple

> **Acoplamiento** = cuánto sabe una pieza de código sobre otra.
> Cuanto más sabe, más acopladas están. Cuanto menos sabe, más desacopladas.

No se trata de "bueno" o "malo" en abstracto. Se trata de **qué tanto necesitas cambiar cuando algo cambia**.

---

## La prueba del cambio: El detector de acoplamiento

La forma más práctica de identificar acoplamiento es hacerte esta pregunta:

> **"Si cambio X, ¿tengo que cambiar Y también?"**
>
> - Si sí → están **acopladas**
> - Si no → están **desacopladas**

### Aplicado a tu código actual

```typescript
// Machine.ts (dominio)
generateWeapon(): Weapon {
    const randomNumber = Math.floor(Math.random() * weapons.length)
    return weapons[randomNumber]
}
```

Pregunta: **"Si cambio la forma de generar números aleatorios, ¿tengo que cambiar `Machine.ts`?"**

Respuesta: **Sí.** Tengo que abrir `Machine.ts`, buscar la línea de `Math.random()`, y reemplazarla. `Machine` está **acoplada** a `Math.random()`.

```typescript
// GameCli.ts (controller)
async start() {
    const game = new StartGame()  // ← Conoce la clase concreta
    // ...
    const result = game.evaluateAnswer(userResponse)
}
```

Pregunta: **"Si renombro `StartGame` a `PlayGameUseCase`, ¿tengo que cambiar `GameCli.ts`?"**

Respuesta: **Sí.** Tengo que cambiar el import y el `new StartGame()`. `GameCli` está **acoplada** a `StartGame`.

---

## Los 4 niveles de acoplamiento

De más acoplado a más desacoplado:

### Nivel 1: Acoplamiento DIRECTO (más fuerte 🔴)

```typescript
class Machine {
    generateWeapon(): Weapon {
        // Usa directamente una API concreta
        return weapons[Math.floor(Math.random() * weapons.length)]
    }
}
```

**Machine sabe:**
- Que existe `Math.random()`
- Que devuelve un número entre 0 y 1
- Que necesita `Math.floor()` para obtener un entero
- La fórmula exacta para convertir el rango

Si `Math.random()` cambiara su API, `Machine` se rompe.

### Nivel 2: Acoplamiento por CREACIÓN (fuerte 🟠)

```typescript
class GameCli {
    async start() {
        const game = new StartGame()  // Crea la instancia directamente
    }
}
```

**GameCli sabe:**
- Que la clase se llama `StartGame`
- Que su constructor no recibe parámetros
- Dónde está el archivo (`'../application/StartGame'`)

Si `StartGame` cambia de nombre, de ubicación, o de constructor, `GameCli` se rompe.

### Nivel 3: Acoplamiento por INTERFAZ (débil 🟡)

```typescript
class GameCli {
    constructor(private readonly playGame: PlayGameInput) {}
    
    async start() {
        const result = this.playGame.execute(weapon)  // Usa la interfaz
    }
}
```

**GameCli sabe:**
- Que existe algo con un método `execute(Weapon)`
- Que devuelve un `PlayGameOutput`

**GameCli NO sabe:**
- Cómo se llama la clase concreta
- Cómo se construye
- Qué hace internamente
- De dónde viene

Puedes cambiar la implementación completa y `GameCli` no se entera.

### Nivel 4: DESACOPLAMIENTO total (más débil 🟢)

Cuando dos piezas de código no se conocen en absoluto. Por ejemplo, `MathRandomNumberGenerator` y `GameCli` no saben que el otro existe. Se comunican **indirectamente** a través del dominio.

---

## Los 3 tests rápidos para detectar acoplamiento

### Test 1: El test del `import`

Mira los imports de un archivo. Cada import es una dependencia:

```typescript
// GameCli.ts — ¿De qué depende?
import { StartGame } from '../application/StartGame'     // ← Depende de Application
import * as readline from 'readline'                      // ← Depende de Node.js
```

**Regla:** En Clean Architecture pura, cada archivo solo debería importar de su propia capa o de capas **más internas**.

```
✅ Controller importa de Domain (más interna)
❌ Domain importa de Controller (más externa)
❌ Domain importa de Infrastructure (más externa)
✅ Infrastructure importa de Domain (más interna)
```

Si ves que el dominio importa de `infra/` o `controller/`, hay acoplamiento prohibido.

### Test 2: El test del `new`

Cada vez que ves `new AlgunaClase()` dentro de un archivo, ese archivo está **acoplado** a `AlgunaClase`:

```typescript
// ❌ Acoplado — GameCli crea su propia dependencia
class GameCli {
    async start() {
        const game = new StartGame()  // Acoplado a StartGame
    }
}

// ✅ Desacoplado — GameCli recibe su dependencia
class GameCli {
    constructor(private readonly playGame: PlayGameInput) {}  // Solo conoce la interfaz
}
```

**Regla:** `new` no es malo en sí mismo. Es malo **en el lugar equivocado**. El `new` debe vivir en la Composition Root (`main.ts`), no esparcido por todo el código.

```
¿Dónde está el new?        ¿Es acoplamiento problemático?

main.ts (Composition Root)     ✅ No — es el lugar correcto
Entidades del dominio          🟡 Depende — crear Value Objects está bien
Casos de uso                   🟡 Depende — crear entidades del dominio está bien
Controllers                    ❌ Sí — no deberían crear sus dependencias
```

### Test 3: El test del reemplazo

Intenta mentalmente reemplazar una pieza. ¿Cuántos archivos tienes que tocar?

**Escenario:** Quiero reemplazar la CLI por una interfaz Web.

Con tu código actual (acoplado):
```
1. Crear GameWeb.ts                    (nuevo)
2. Modificar main.ts                   (cambiar GameCli por GameWeb)
3. GameWeb necesita saber de StartGame (acoplamiento heredado)
```

Con código desacoplado:
```
1. Crear GameWeb.ts que implemente GameUI    (nuevo)
2. Modificar main.ts                         (cambiar GameCli por GameWeb)
— Fin. GameWeb solo conoce PlayGameInput y GameUI. —
```

**Regla:** Cuantos menos archivos tengas que tocar para hacer un cambio, más desacoplado estás.

---

## Visualizando el acoplamiento

### Tu código actual (acoplado)

```
main.ts ──────► GameCli ──────► StartGame ──────► Game ──────► Machine
                   │                                              │
                   │ readline                                     │ Math.random()
                   │                                              │
              Node.js I/O                                   JavaScript API

Cada flecha es una DEPENDENCIA CONCRETA.
Si cualquier pieza cambia, las que apuntan a ella se rompen.
```

### Código desacoplado

```
main.ts (conoce todo — es la Composition Root)
   │
   ├── MathRandomNumberGenerator  ──implements──► RandomNumberGenerator (port)
   │                                                      ▲
   ├── PlayGameUseCase ──implements──► PlayGameInput       │ usa
   │         │                           (port)           │
   │         └── Game ───────────────────────────────────────┘
   │
   └── GameCli ──implements──► GameUI (port)
         │
         └── usa ──► PlayGameInput (port)

Las flechas apuntan a INTERFACES, no a implementaciones.
Si cambias MathRandomNumberGenerator, solo tocas main.ts.
Si cambias GameCli por GameWeb, solo tocas main.ts.
```

---

## Analogía: Enchufes y electrodomésticos

### Acoplado (cable soldado)
Imagina que tu laptop viniera con el cable de carga **soldado directamente** a la toma de corriente de tu casa. Funciona perfectamente... hasta que te mudas a otro país con otro tipo de enchufe. Tendrías que abrir tu laptop y resoldar el cable.

### Desacoplado (enchufe estándar)
Tu laptop tiene un conector estándar. Si viajas a otro país, compras un adaptador. No tocas ni la laptop ni la pared. Solo cambias el adaptador.

En tu código:
- **El enchufe estándar** = la interfaz (`RandomNumberGenerator`)
- **La laptop** = tu dominio (`Machine`, `Game`)
- **La toma de corriente** = la infraestructura (`Math.random()`, `readline`)
- **El adaptador** = la implementación (`MathRandomNumberGenerator`)
- **La persona que conecta** = la Composition Root (`main.ts`)

---

## Resumen práctico

```
Para detectar ACOPLAMIENTO, usa estos 3 tests:

1. TEST DEL IMPORT
   → ¿De dónde importa este archivo?
   → ¿Importa de capas que no debería?

2. TEST DEL NEW
   → ¿Quién crea las instancias?
   → ¿Las crea el que las usa o se las inyectan?

3. TEST DEL REEMPLAZO
   → Si cambio esta pieza, ¿cuántos archivos toco?
   → Si la respuesta es "más de 2", hay acoplamiento alto.
```

### La regla de oro

> **Depende de abstracciones (interfaces), no de implementaciones concretas.**
>
> — Dependency Inversion Principle (la D de SOLID)

Cuando tu código depende de una interfaz, está desacoplado de quien la implementa. Cuando depende de una clase concreta, está acoplado a ella.
