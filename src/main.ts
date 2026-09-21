// === COMPOSITION ROOT ===
// Este es el ÚNICO archivo que conoce todas las capas.
// Aquí se conectan las implementaciones concretas.

import { Game } from './domain/Game';
import { MathRandomOpponentWeaponProvider } from './frameworks/random/MathRandomOpponentWeaponProvider';
import { PlayGameInteractor } from './application/use-cases/PlayGameInteractor';
import { AnalyzeWeaponInteractor } from './application/use-cases/AnalyzeWeaponInteractor';
import type {
    PlayGameInputBoundary,
} from './application/ports/input/PlayGameInputBoundary';
import { JsonGamePresenter } from './interface-adapters/presenters/JsonGamePresenter';
import { GameController } from './interface-adapters/controllers/GameController';
import { CliGameRunner } from './frameworks/cli/CliGameRunner';
import { ReadlineInputReader } from './frameworks/cli/ReadlineInputReader';
import { ConsoleGameView } from './frameworks/cli/ConsoleGameView';
import { AnalyzeWeaponPresenter } from './interface-adapters/presenters/AnalyzeWeaponPresenter';
import { AnalyzeWeaponController } from './interface-adapters/controllers/AnalyzeWeaponController';
import { CliCommandRouter } from './frameworks/cli/CliCommandRouter';

async function main(): Promise<void> {
    // 1. Crear dominio e implementación de infraestructura
    const game = new Game();
    const opponentWeaponProvider = new MathRandomOpponentWeaponProvider();

    // 2. Conectar la presentación JSON con la vista de consola
    const view = new ConsoleGameView();
    const presenter = new JsonGamePresenter(view);

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

    // 5. Conectar el flujo independiente de análisis
    const analyzePresenter = new AnalyzeWeaponPresenter(view);
    const analyzeWeaponInput = new AnalyzeWeaponInteractor(
        game,
        analyzePresenter,
    );
    const analyzeController = new AnalyzeWeaponController(
        analyzeWeaponInput,
        analyzePresenter,
    );

    // 6. Elegir el caso de uso solicitado por la línea de comandos
    const commandRouter = new CliCommandRouter(gameRunner, analyzeController);
    await commandRouter.run(process.argv.slice(2));
}

void main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
