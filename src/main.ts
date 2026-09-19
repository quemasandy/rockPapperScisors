// === COMPOSITION ROOT ===
// Este es el ÚNICO archivo que conoce todas las capas.
// Aquí se conectan las implementaciones concretas.

import { Game } from './domain/entities/Game';
import { MathRandomOpponentWeaponProvider } from './infra/MathRandomOpponentWeaponProvider';
import { PlayGameInteractor } from './application/PlayGameInteractor';
import { PlayGameInputBoundary } from './application/ports/PlayGame';
import { GamePresenter } from './presentation/GamePresenter';
import { GameController } from './controller/GameController';
import { CliGameRunner } from './controller/CliGameRunner';
import { ReadlineInputReader } from './controller/ReadlineInputReader';
import { ConsoleGameView } from './controller/ConsoleGameView';

async function main(): Promise<void> {
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

    // 4. Crear el adapter de entrada y conectarlo a los drivers del CLI
    const controller = new GameController(playGameInput, presenter);
    const inputReader = new ReadlineInputReader();
    const gameRunner = new CliGameRunner(inputReader, controller);

    // 5. Arrancar una ronda de la aplicación
    await gameRunner.start();
}

void main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
