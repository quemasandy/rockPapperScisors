# 33 — Seguir las Dos Direcciones de un Boundary

## 🎯 Objetivo

Observar cómo el análisis entrega su resultado a un presenter sin depender de su
clase concreta.

**Concepto:** flujo de control frente a dependencias de código.
**Requiere:** comando `analyze` actual. **Tiempo:** 15–20 minutos.

## 📚 Qué vas a aprender

Al cruzar un output boundary, la llamada puede salir de `application` mientras
los imports siguen apuntando hacia ella. El contrato protege al caso de uso de
decisiones como serializar JSON; el coste es mantener ese contrato y ensamblar
su implementación en el composition root.

## ✅ Qué hacer

1. Predice qué objeto recibirá `present` al ejecutar `analyze piedra` y si
   necesitas modificar producción para observarlo. Localiza el ensamblado en
   [main.ts](../src/main.ts).
2. Ejecuta `npm start -- analyze piedra` con el depurador del IDE. Detente en
   `this.outputBoundary.present(...)` de
   [AnalyzeWeaponInteractor](../src/application/use-cases/AnalyzeWeaponInteractor.ts),
   entra en la llamada y observa la pila y el objeto recibido por
   [AnalyzeWeaponPresenter](../src/interface-adapters/presenters/AnalyzeWeaponPresenter.ts).
   Identifica dónde se convierte la respuesta en texto JSON.
3. Dibuja en tus notas dos esquemas pequeños usando el interactor, el
   [output boundary](../src/application/ports/output/AnalyzeWeaponOutputBoundary.ts)
   y el presenter: uno con llamadas en runtime y otro con dependencias de código.
   Justifica cada dependencia con un import o un `implements`; localiza quién
   es propietario del contrato.
4. Ejecuta la prueba existente con
   `npm test -- tests/unit/application/AnalyzeWeaponInteractor.test.ts`.
   Compara el objeto que recibe `present` allí con el de la ejecución CLI,
   revisando [AnalyzeWeaponOutputBoundarySpy](../tests/support/AnalyzeWeaponOutputBoundarySpy.ts).

**Alcance:** usa el código y los tests existentes. Basta con los dos esquemas y
unas líneas de observaciones; no hace falta crear otro presenter ni otro test.

## 🧪 Cómo comprobarlo

- La pila muestra qué implementación recibe la llamada en el CLI.
- Tus esquemas distinguen la llamada hacia el presenter de los imports del
  contrato, y explican por qué el mismo interactor acepta el spy en la prueba.
- La prueba pasa y el diff no contiene cambios productivos.

## 💡 Reflexión

¿Por qué el caso de uso puede invocar al presenter sin importarlo? Un thread puede
atravesar varios boundaries: ¿qué evidencia de esta práctica muestra que un
límite arquitectónico no exige crear un thread nuevo?

## ✅ Criterios de finalización

- [ ] He observado el cruce real y localizado la conversión a JSON.
- [ ] Puedo explicar las dos direcciones con los imports y la prueba del proyecto.

Al terminar, marca este archivo y el [índice](./README.md) como completados.

## Estado: ⬜ Pendiente
