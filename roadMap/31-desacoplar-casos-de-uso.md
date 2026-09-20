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

- [ ] El análisis tiene contratos propios y no importa el interactor ni los DTOs de jugar.
- [ ] Ambos recorridos usan la misma regla de dominio.
- [ ] Agregar el análisis no modifica el comportamiento ni los tests de jugar.

## 💡 Reflexión

¿Por qué compartir `Game` tiene sentido y compartir `PlayGameResponse` no?
¿Las reglas actuales de arquitectura detectarían un import entre dos
interactores del mismo anillo? Compruébalo leyendo su configuración.

Al terminar, marca este archivo y el [índice](./README.md) como completados.

## Estado: ⬜ Pendiente
