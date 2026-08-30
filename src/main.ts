// === COMPOSITION ROOT ===
// Este es el ÚNICO archivo que conoce todas las capas.
// Aquí se conectan las implementaciones concretas.

import { Game } from './domain/entities/Game';
import { MathRandomOpponentWeaponProvider } from './infra/MathRandomOpponentWeaponProvider';
import { PlayGameUseCase } from './application/PlayGameUseCase';
import { PlayGameInput } from './application/ports/PlayGame';
import { GameCli } from './controller/GameCli';

// 1. Crear dominio e implementación de infraestructura
const game = new Game();
const opponentWeaponProvider = new MathRandomOpponentWeaponProvider();

// 2. Crear caso de uso, inyectando sus dependencias
const playGameInput: PlayGameInput = new PlayGameUseCase(game, opponentWeaponProvider);

// 3. Crear controller, inyectando el caso de uso
const gameCli = new GameCli(playGameInput);

// 4. Arrancar la aplicación
gameCli.start();
