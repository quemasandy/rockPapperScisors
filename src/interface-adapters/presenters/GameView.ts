import type {
    ErrorViewModel,
    GameViewModel,
} from '../view-models/GameViewModel';

export interface GameView {
    showResult(viewModel: GameViewModel): void;
    showError(viewModel: ErrorViewModel): void;
}
