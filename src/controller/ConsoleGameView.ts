import { GameView } from '../presentation/GamePresenter';
import { ErrorViewModel, GameViewModel } from '../presentation/GameViewModel';

// La View es el objeto humilde: solo vuelca ViewModels ya formateados.
export class ConsoleGameView implements GameView {
    showResult(viewModel: GameViewModel): void {
        console.log(viewModel.fullOutput);
    }

    showError(viewModel: ErrorViewModel): void {
        console.log(viewModel.errorMessage);
    }
}
