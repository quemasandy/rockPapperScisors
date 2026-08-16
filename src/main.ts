// === COMPOSITION ROOT ===
// Este es el ÚNICO archivo que conoce todas las capas.
// Aquí se conectan las implementaciones concretas.

import { MathRandomNumberGenerator } from './infra/MathRandomNumberGenerator';
import { PlayGameUseCase } from './application/PlayGameUseCase';
import { GameCli } from './controller/GameCli';

// 1. Crear implementación de infraestructura
const randomGenerator = new MathRandomNumberGenerator();

// 2. Crear caso de uso, inyectando la dependencia de infra
const playGameUseCase = new PlayGameUseCase(randomGenerator);

// 3. Crear controller, inyectando el caso de uso
const gameCli = new GameCli(playGameUseCase);

// 4. Arrancar la aplicación
gameCli.start();
