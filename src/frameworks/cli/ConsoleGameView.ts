import type { GameView } from '../../interface-adapters/ports/GameView';
import type {
    AnalyzeWeaponView,
} from '../../interface-adapters/ports/AnalyzeWeaponView';
import type {
    AnalyzeWeaponViewModel,
} from '../../interface-adapters/view-models/AnalyzeWeaponViewModel';
import type {
    ErrorViewModel,
    GameViewModel,
} from '../../interface-adapters/view-models/GameViewModel';

// La View es el objeto humilde: solo vuelca salidas ya formateadas.
export class ConsoleGameView implements GameView, AnalyzeWeaponView {
    showResult(viewModel: GameViewModel): void {
        console.log(viewModel.fullOutput);
    }

    showError(viewModel: ErrorViewModel): void {
        console.log(viewModel.errorMessage);
    }

    showAnalysis(viewModel: AnalyzeWeaponViewModel): void {
        console.log(viewModel.fullOutput);
    }
}
