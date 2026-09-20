# Reglas del Proyecto

## Propósito del proyecto

- Este es un proyecto didáctico para aprender y profundizar en Clean Architecture
  de forma práctica mediante la evolución del juego Rock-Paper-Scissors.
- El objetivo principal es comprender las decisiones arquitectónicas, sus motivos
  y sus costes. Entregar funcionalidades es el medio para aprender, no el único fin.
- El roadmap de aprendizaje y el estado de los ejercicios están en
  `roadMap/README.md`. Consultarlo antes de crear, explicar o implementar una tarea.
- La descripción canónica de la arquitectura actual está en `docs/README.md`.
  Las tareas antiguas conservan decisiones
  históricas y pueden haber sido reemplazadas por fases posteriores.

## Roadmap

- Al finalizar cada tarea del roadmap, actualizar tanto su archivo individual
  (`roadMap/XX-nombre.md`) como la tabla de `roadMap/README.md`, cambiando ⬜ a ✅.
- No marcar una tarea como completada por haber creado su enunciado. Solo marcarla
  cuando la implementación y las verificaciones indicadas estén terminadas.
- Mantener cada ejercicio compilable, verificable y centrado en un concepto principal.
- Conservar el recorrido histórico del roadmap. Si una decisión queda superada,
  documentarlo y enlazar su reemplazo en lugar de reescribir el pasado.

## Forma de enseñar y colaborar

- Responder en español, usando términos técnicos en inglés cuando sean los nombres
  habituales del libro o del código, y explicarlos con lenguaje sencillo.
- Relacionar cada concepto con archivos, dependencias y pruebas reales del proyecto.
  Explicar qué problema resuelve, qué boundary protege y qué coste introduce.
- Si el usuario pide ayuda para aprender o resolver un ejercicio, acompañarlo de
  forma incremental: explicar el objetivo, proponer el siguiente paso, revisar su
  intento y aumentar el nivel de ayuda según lo necesite. No entregar de entrada
  toda la solución ni implementar el ejercicio completo sin que lo pida.
- Si el usuario pide explícitamente implementar, corregir o completar una tarea,
  realizar el trabajo completo y explicar las decisiones relevantes al finalizar.
- Antes de modificar código en un ejercicio, formular una predicción breve de qué
  capas o archivos deberían cambiar. Después, contrastarla con el diff y las pruebas.
- Enseñar Clean Architecture como un conjunto de decisiones y trade-offs, no como
  reglas dogmáticas ni como una estructura fija de carpetas.
- Distinguir cuando corresponda entre flujo de control en runtime, dirección de
  dependencias de código e independencia de despliegue.
- Evitar abstracciones, interfaces, capas, servicios o frameworks especulativos.
  Introducir un boundary cuando exista una necesidad concreta que permita comprobarlo.
- Preservar el comportamiento existente salvo que el ejercicio pida cambiarlo y
  ejecutar verificaciones proporcionales al cambio, terminando con `npm run verify`
  cuando se modifique código productivo.

## Preferencias para ejercicios didácticos

- El usuario dispone de poco tiempo: cuando pida ejercicios para aprender un tema
  o capítulo, proponer por defecto los **3 más útiles**, salvo que indique otra cantidad.
- Priorizar ejercicios prácticos sobre el proyecto actual, con alcance pequeño,
  pasos concretos, tiempo estimado y una comprobación observable de lo aprendido.
- Reducir también el trabajo total: no agrupar una lista larga de tareas dentro
  de tres ejercicios ni añadir retos opcionales que vuelvan a ampliar la ruta.
- Incluir una explicación breve del concepto y pocas preguntas de reflexión.
  Evitar documentación extensa, infraestructura adicional o teoría que no sea
  necesaria para practicar el concepto.
