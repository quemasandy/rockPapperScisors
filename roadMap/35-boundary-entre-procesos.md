# 35 — Cruzar un Límite de Proceso con el CLI

## 🎯 Objetivo

Consumir el análisis desde otro proceso y comparar ese cruce con la llamada en
memoria que ya prueba el proyecto.

**Concepto:** comunicación a través de un boundary de proceso local.
**Requiere:** comando `analyze` actual. **Tiempo:** 25–40 minutos.

## 📚 Qué vas a aprender

El consumidor externo intercambia argumentos y texto con el programa mediante
un protocolo. No recibe referencias a sus objetos: reconstruye datos desde JSON.
El proceso separa espacios de memoria, pero añade arranque, serialización, espera
y manejo de fallos. El contrato CLI permite usar el análisis sin importar sus
clases internas.

## ✅ Qué hacer

1. Revisa
   [AnalyzeCliCommandFlow.test.ts](../tests/integration/cli/AnalyzeCliCommandFlow.test.ts)
   y predice qué cambia al ejecutar el mismo análisis en un proceso hijo.
   Compila con `npm run build` y comprueba `node dist/main.js analyze piedra`.
2. Crea un único script de laboratorio, `experiments/analyze-process.cjs`, que
   lance ese comando mediante `execFileSync` de `node:child_process`. Usa
   `process.execPath` como ejecutable, la ruta absoluta a `dist/main.js`, argumentos
   separados, `encoding: 'utf8'` y un timeout de 5 segundos. Captura la salida;
   el script no debe importar módulos de `src` ni de `dist`.
3. Convierte `stdout` con `JSON.parse` y comprueba con `node:assert/strict` que
   piedra gana a tijeras, pierde ante papel y empata consigo misma. Contrasta
   esos datos con la prueba en memoria. Ejecuta el consumidor desde la raíz con
   `node experiments/analyze-process.cjs`.
4. Añade al mismo script una segunda ejecución con `analyze` sin arma. Captura
   el error de `execFileSync` y comprueba el estado de salida `1` y el mensaje de
   uso en `stderr`. El consumidor debe completar ambas comprobaciones sin
   intentar interpretar ese fallo como una respuesta JSON correcta.

**Alcance:** un consumidor de laboratorio y dos ejecuciones. Conserva iguales
`src`, los contratos y los scripts de `package.json`. Para estas ejecuciones
cortas, la API síncrona reduce el montaje, a costa de bloquear al consumidor
mientras espera. Consulta su comportamiento en la
[documentación de Node](https://nodejs.org/api/child_process.html#child_processexecfilesyncfile-args-options).

## 🧪 Cómo comprobarlo

- El script termina correctamente solo si pasan las comprobaciones del JSON y
  del error de uso. Lanza directamente Node para que `stdout` contenga la salida
  del programa sin los mensajes añadidos por `npm start`.
- Puedes señalar el protocolo de entrada y salida y dónde se serializan y
  reconstruyen los datos. El consumidor no llama al interactor en su memoria.
- El diff contiene únicamente el script y tus notas; `npm run verify` pasa.

## 💡 Reflexión

Sigues compilando y entregando todo `dist`: ¿qué faltaría para desplegar un
presenter como componente independiente? Si este protocolo viajara a un servicio
remoto, ¿qué fallos de red y costes de espera tendrías que contemplar?

## ✅ Criterios de finalización

- [ ] El consumidor comprueba tanto el resultado como el fallo del proceso hijo.
- [ ] Distingo llamada en memoria, comunicación entre procesos y entrega independiente.

Al terminar, marca este archivo y el [índice](./README.md) como completados.

## Estado: ⬜ Pendiente
