# 🏗️ ¿Qué es realmente "infraestructura"?

## La confusión más común

Es muy normal pensar que "infraestructura" = AWS, bases de datos, lambdas, SQS, servidores. Eso **es** infraestructura, pero es solo **una parte**.

La definición real es mucho más amplia:

> **Infraestructura es todo mecanismo concreto que el dominio necesita para funcionar, pero que NO es una regla de negocio.**

Vamos a desmenuzar esto con calma.

---

## El test mental: ¿Pertenece al dominio?

Para saber si algo es dominio o infraestructura, hazte esta pregunta:

> **"Si yo le explico mi negocio a alguien que no sabe nada de programación... ¿mencionaría esto?"**

Ejemplo con Piedra-Papel-Tijera:

| Concepto | ¿Lo mencionarías? | ¿Qué es? |
|----------|-------------------|----------|
| "Piedra vence a Tijeras" | ✅ Sí, es una regla del juego | **Dominio** |
| "El jugador elige un arma" | ✅ Sí, es parte del juego | **Dominio** |
| "La máquina elige un arma al azar" | ✅ Sí, es parte del juego | **Dominio** |
| "Usamos `Math.random()` para generar el azar" | ❌ No, eso es un detalle técnico | **Infraestructura** |
| "Leemos la respuesta del usuario por terminal" | ❌ No, eso es cómo interactuamos | **Infraestructura** |
| "Guardamos el puntaje en PostgreSQL" | ❌ No, eso es dónde lo guardamos | **Infraestructura** |

¿Ves la diferencia? "La máquina elige al azar" es una regla de negocio. **Cómo** se genera ese azar (`Math.random()`, un dado físico, una API criptográfica) es un detalle de implementación.

---

## ¿Por qué `Math.random()` es infraestructura?

Piensa en esto: `Math.random()` es una **función del runtime de JavaScript**. Es un mecanismo que el lenguaje de programación te provee para interactuar con el generador de números pseudoaleatorios del sistema operativo.

Es igual que:
- `fs.readFile()` → mecanismo para leer archivos del sistema operativo
- `fetch()` → mecanismo para hacer peticiones HTTP
- `console.log()` → mecanismo para escribir en la terminal
- `Date.now()` → mecanismo para leer el reloj del sistema

Todos son **mecanismos concretos del runtime/OS**. Ninguno es una regla de negocio.

### La prueba definitiva

Imagina que tu juego se ejecuta en 3 entornos diferentes:

```
Entorno 1: Node.js en un servidor     → Math.random()
Entorno 2: Un microcontrolador Arduino → hardware random generator
Entorno 3: Un navegador web            → crypto.getRandomValues()
```

Las reglas de Piedra-Papel-Tijera **no cambian** entre estos entornos. Pero el mecanismo para generar aleatoriedad **sí cambia**. Si tu dominio usa `Math.random()` directamente, estás atando tu lógica de negocio a Node.js. Eso es acoplamiento a infraestructura.

---

## Las categorías de infraestructura

Infraestructura NO es solo "cosas de la nube". Es cualquier **detalle técnico concreto**:

```
┌─────────────────────────────────────────────────────────────┐
│                    INFRAESTRUCTURA                           │
│                                                             │
│  📦 Persistencia                                            │
│     PostgreSQL, MongoDB, Redis, archivos JSON, localStorage │
│                                                             │
│  🌐 Comunicación externa                                    │
│     HTTP (fetch), WebSockets, gRPC, correo electrónico      │
│                                                             │
│  ☁️  Servicios cloud                                        │
│     AWS Lambda, SQS, S3, Azure Functions                    │
│                                                             │
│  🖥️  I/O del sistema operativo                              │
│     readline, console.log, fs.readFile, process.stdin       │
│                                                             │
│  🎲 APIs del runtime                                        │
│     Math.random(), Date.now(), crypto, setTimeout           │
│                                                             │
│  🔧 Librerías de terceros                                   │
│     Express, Axios, Prisma, cualquier SDK                   │
│                                                             │
│  ⏰ Tiempo y relojes                                        │
│     new Date(), performance.now()                           │
└─────────────────────────────────────────────────────────────┘
```

---

## Analogía: El restaurante

Imagina un restaurante:

- **Dominio (reglas de negocio):** La receta del chef. "Para hacer pasta carbonara necesitas: guanciale, huevo, pecorino, pimienta negra. Cocinar el guanciale hasta que esté crujiente..."

- **Infraestructura:** La cocina física. ¿Cocinas con estufa de gas o eléctrica? ¿Los ingredientes vienen del supermercado o de un huerto propio? ¿El horno es industrial o casero?

La receta (dominio) no cambia si cambias la estufa (infraestructura). Si la receta dijera "precalentar la estufa GE modelo XR-500 a 180°C", estaría **acoplada** a una estufa específica. Mejor decir "precalentar el horno a 180°C" y que la cocina decida qué horno usar.

En tu código:

```typescript
// ❌ La "receta" menciona la "estufa" específica
generateWeapon(): Weapon {
    const randomNumber = Math.floor(Math.random() * weapons.length)  // Math.random = estufa específica
    return weapons[randomNumber]
}

// ✅ La "receta" solo dice "necesito calor"
generateWeapon(): Weapon {
    const index = this.randomGenerator.generate(0, weapons.length - 1)  // "dame un número" sin importar cómo
    return weapons[index]
}
```

---

## Regla práctica para identificar infraestructura

Cuando escribas código en el dominio, pregúntate:

> **"¿Puedo reemplazar CÓMO se hace esto sin cambiar QUÉ hace mi negocio?"**

- ¿Puedo cambiar `Math.random()` por un dado? → Sí → Es infraestructura
- ¿Puedo cambiar "Piedra vence a Tijeras" por "Piedra pierde contra Tijeras"? → No, eso cambiaría las reglas → Es dominio
- ¿Puedo cambiar `readline` por un formulario web? → Sí → Es infraestructura
- ¿Puedo cambiar que el juego tenga empate? → No, eso cambia la lógica → Es dominio

---

## Resumen

```
"Infraestructura" en Clean Architecture ≠ "cosas de AWS"

"Infraestructura" = TODO lo que es un detalle de implementación
                    que puede cambiar sin que cambien
                    las reglas de negocio.

Incluye: bases de datos, APIs, servicios cloud,
         PERO TAMBIÉN: Math.random(), Date.now(),
         console.log(), readline, fetch(), fs...
```

Lo que Robert C. Martin (Uncle Bob) llama "detail" — un detalle. Las bases de datos son un detalle. El framework web es un detalle. La generación de números aleatorios es un detalle. **El negocio no es un detalle.**
