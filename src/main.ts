// === COMPOSITION ROOT ===
// Este es el ÚNICO archivo que conoce todas las capas.
// Aquí se conectan las implementaciones concretas.

import { Game } from './domain/entities/Game';
import { MathRandomOpponentWeaponProvider } from './infra/MathRandomOpponentWeaponProvider';
import { PlayGameInteractor } from './application/PlayGameInteractor';
import { PlayGameInputBoundary } from './application/ports/PlayGame';
import { GamePresenter } from './presentation/GamePresenter';
import { GameController } from './controller/GameController';
import { GameCli } from './controller/GameCli';
import { ConsoleGameView } from './controller/ConsoleGameView';

// 1. Crear dominio e implementación de infraestructura
const game = new Game();
const opponentWeaponProvider = new MathRandomOpponentWeaponProvider();

// 2. Conectar la salida: presenter -> view
const view = new ConsoleGameView();
const presenter = new GamePresenter(view);

// 3. Crear el interactor, inyectando dominio, infraestructura y output boundary
const playGameInput: PlayGameInputBoundary = new PlayGameInteractor(
    game,
    opponentWeaponProvider,
    presenter,
);

// 4. Crear el adapter de entrada y conectarlo al driver CLI
const controller = new GameController(playGameInput, presenter);
const gameCli = new GameCli(controller);

// 5. Arrancar la aplicación
gameCli.start();
