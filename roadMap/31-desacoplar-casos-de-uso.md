# 31 — Agregar un Caso de Uso Independiente

## 🎯 Objetivo

Implementar **analizar un arma**: consultar contra qué gana, pierde y empata sin
jugar una ronda ni elegir un oponente aleatorio.

**Concepto:** independencia entre casos de uso.
**Requiere:** fase 2 completa. **Tiempo:** 35–50 minutos.

## 📚 Qué vas a aprender

Separar capas no impide que dos funcionalidades queden acopladas entre sí.
Jugar y analizar necesitan coordinación propia, aunque compartan las reglas de
[Game](../src/domain/Game.ts). Compartir esa regla evita duplicar conocimiento;
compartir sus DTOs solo porque se parecen podría obligarlos a cambiar juntos.

## ✅ Qué hacer

1. Define `AnalyzeWeaponRequest` con un `Weapon` y su input boundary en
   `application/ports/input`. Define la respuesta y su output boundary en
   `application/ports/output`. Sigue el patrón existente: `execute` retorna
   `void` y entrega la respuesta mediante `present`.
2. Crea `AnalyzeWeaponInteractor` con `Game` y el output boundary inyectados.
   Evalúa el arma recibida contra cada valor de `Weapon`, clasificando los
   resultados de `Game.play`. No copies la tabla de victorias ni llames a
   `PlayGameInteractor`.
3. Prueba el nuevo caso de uso con un output spy. Para piedra, la respuesta debe
   representar esta información:

   ```typescript
   // Forma orientativa de la respuesta.
   {
       weapon: Weapon.Rock,
       winsAgainst: [Weapon.Scissors],
       losesAgainst: [Weapon.Paper],
       drawsAgainst: [Weapon.Rock],
   }
   ```

4. Revisa el diff: el interactor de jugar y sus DTOs deben permanecer iguales.
   Ejecuta las pruebas de ambos casos de uso para comprobar que conviven.

**Alcance:** la práctica termina con el caso de uso ejecutable desde tests. La
interfaz CLI continúa jugando una ronda; no necesitas añadir un controller,
presenter, menú ni flags para el análisis.

## 🧪 Cómo comprobarlo

| Arma | Gana contra | Pierde contra | Empata contra |
|------|-------------|---------------|---------------|
| Piedra | Tijeras | Papel | Piedra |
| Papel | Piedra | Tijeras | Papel |
| Tijeras | Papel | Piedra | Tijeras |

Verifica las tres filas y una sola entrega al output boundary por ejecución.
El test de análisis no necesita un provider aleatorio. Termina con
`npm run verify`.

## ✅ Criterios de finalización

- [x] El análisis tiene contratos propios y no importa el interactor ni los DTOs de jugar.
- [x] Ambos recorridos usan la misma regla de dominio.
- [x] Agregar el análisis no modifica el comportamiento ni los tests de jugar.

## 💡 Reflexión

¿Por qué compartir `Game` tiene sentido y compartir `PlayGameResponse` no?
¿Las reglas actuales de arquitectura detectarían un import entre dos
interactores del mismo anillo? Compruébalo leyendo su configuración.

`Game` contiene la política común y estable que decide el resultado de dos
armas; ambos casos de uso necesitan esa misma verdad del negocio. En cambio,
`PlayGameResponse` describe exclusivamente una ronda, mientras que el análisis
necesita tres colecciones. Reutilizar ese DTO acoplaría dos protocolos que
cambian por razones diferentes.

Las reglas actuales de `dependency-cruiser` no detectarían un import entre dos
interactores: ambos pertenecen a `application` y las fitness functions solo
impiden dependencias hacia anillos exteriores y ciclos. En este ejercicio, la
independencia también queda protegida por el diseño y por revisar los imports.

Al terminar, marca este archivo y el [índice](./README.md) como completados.

### Extensión posterior: exposición mediante comandos CLI

Después de completar el alcance original, ambos casos de uso se conectaron a un
router de comandos:

```bash
npm start -- play
npm start -- analyze piedra
```

`play` conserva la lectura interactiva del arma. `analyze` recibe el arma en el
segundo argumento y recorre un controller y un presenter propios. La traducción
de selecciones se comparte entre los controllers porque pertenece al mismo
protocolo CLI; los DTOs y la coordinación de los casos de uso siguen separados.

## Estado: ✅ Completado
