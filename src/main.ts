// === COMPOSITION ROOT ===
// Este es el ÚNICO archivo que conoce todas las capas.
// Aquí se conectan las implementaciones concretas.

import { Game } from './domain/Game';
import { MathRandomOpponentWeaponProvider } from './frameworks/random/MathRandomOpponentWeaponProvider';
import { PlayGameInteractor } from './application/use-cases/PlayGameInteractor';
import type {
    PlayGameInputBoundary,
} from './application/ports/input/PlayGameInputBoundary';
import { JsonGamePresenter } from './interface-adapters/presenters/JsonGamePresenter';
import { GameController } from './interface-adapters/controllers/GameController';
import { CliGameRunner } from './frameworks/cli/CliGameRunner';
import { ReadlineInputReader } from './frameworks/cli/ReadlineInputReader';

async function main(): Promise<void> {
    // 1. Crear dominio e implementación de infraestructura
    const game = new Game();
    const opponentWeaponProvider = new MathRandomOpponentWeaponProvider();

    // 2. Conectar la presentación JSON con la escritura a consola
    const presenter = new JsonGamePresenter((line) => console.log(line));

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
