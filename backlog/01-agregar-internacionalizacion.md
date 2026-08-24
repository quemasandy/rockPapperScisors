# 01 — Agregar Internacionalización

## Estado

⬜ Pendiente

## Prioridad

Alta

## 🎯 Objetivo

Permitir que una persona juegue desde el CLI en español o inglés sin cambiar las
reglas del dominio ni duplicar la lógica de presentación.

## 👤 Historia de usuario

Como persona usuaria, quiero elegir el idioma del juego para entender el menú,
las opciones y el resultado de cada ronda en el idioma seleccionado.

## 💡 Valor

La tarea 17 neutralizó los identificadores internos de `Weapon`. Esta mejora usa
esa separación para localizar toda la experiencia visible y dejar preparado el
sistema para agregar otros idiomas sin editar el dominio.

## 📦 Alcance

1. Soportar inicialmente los locales `es` y `en`.
2. Mantener `es` como locale predeterminado para conservar el comportamiento
   actual.
3. Permitir seleccionar el locale al iniciar el CLI:

   ```bash
   npm start -- --lang=es
   npm start -- --lang=en
   ```

4. Traducir todo el texto visible:
   - título, opciones y prompt del menú;
   - nombres de las armas;
   - mensajes de victoria, derrota y empate;
   - etiquetas de las elecciones del jugador y del oponente;
   - mensajes de entrada o locale inválidos.
5. Aceptar `1`, `2` y `3` en ambos locales.
6. Aceptar `piedra`, `papel` y `tijeras` en español, y `rock`, `paper` y
   `scissors` en inglés.
7. Mantener los emojis actuales como parte de la presentación, independientes
   del locale.

## 🏗️ Orientación técnica

- Representar los locales soportados con un tipo cerrado, por ejemplo
  `type Locale = 'es' | 'en'`.
- Definir un catálogo tipado por locale. Cada catálogo debe implementar todas las
  claves de traducción para que TypeScript detecte mensajes faltantes.
- Mantener los catálogos y el traductor en la capa de interface adapters o
  presentación; `domain` y `application` no deben conocer locales ni textos.
- Inyectar el traductor o el catálogo seleccionado en presenter, controller y
  driver CLI desde `main.ts`, según la responsabilidad de cada texto.
- Resolver `--lang` en el driver exterior. Un locale no soportado debe mostrar un
  error con los valores admitidos y finalizar sin ejecutar una ronda.
- Evitar una dependencia externa de internacionalización mientras solo se
  necesiten catálogos estáticos y sustituciones simples.

## 🧪 Pruebas

- El locale predeterminado conserva exactamente la experiencia en español.
- `--lang=en` muestra menú, armas, resultados y errores en inglés.
- Cada locale contiene todas las claves requeridas.
- Las tres armas y los tres resultados se traducen correctamente en ambos
  idiomas.
- Las entradas numéricas funcionan en ambos idiomas.
- Las palabras de cada idioma se convierten al mismo `Weapon` neutral.
- Un locale no soportado no inicia el caso de uso y produce un error claro.
- Las reglas de victoria, derrota y empate no cambian.
- Los tests de arquitectura confirman que `domain` y `application` no dependen de
  los catálogos ni del locale.

## ✅ Criterios de aceptación

- Se puede completar una ronda en español y otra en inglés desde el CLI.
- Ningún texto visible queda escrito directamente dentro del dominio.
- Agregar un tercer idioma solo requiere registrar el locale y crear un catálogo
  completo; no exige modificar las reglas del juego.
- El comportamiento sin `--lang` sigue siendo compatible con la versión actual.
- `npm test` y `npx tsc --noEmit` pasan.

## 🔗 Dependencias

- Requiere la tarea 17 del roadmap, ya completada.
- Conviene implementarla después de las tareas 21–24 para evitar retrabajo al
  separar definitivamente presenter, controller y driver CLI. Esto no es un
  bloqueo funcional.

## 🚫 Fuera de alcance

- Detección automática del idioma del sistema operativo.
- Persistencia de preferencias entre ejecuciones.
- Pluralización avanzada, formatos regionales o traducciones descargadas.
- Interfaces web o móviles.
- Más idiomas aparte de español e inglés en la primera entrega.

