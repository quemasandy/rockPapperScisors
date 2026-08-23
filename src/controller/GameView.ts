import { GameViewModel, ErrorViewModel } from '../presentation/GameViewModel';

// La View es el OBJETO HUMILDE.
// No tiene lógica de formato, no decide qué emoji usar,
// no construye strings. Solo lee del ViewModel y lo muestra.
// Es TAN simple que no necesita tests unitarios.
export class GameView {

    showResult(viewModel: GameViewModel): void {
        console.log(viewModel.fullOutput);
    }

    showError(viewModel: ErrorViewModel): void {
        console.log(viewModel.errorMessage);
    }
}
