import type { GameView } from '../../src/interface-adapters/ports/GameView';
import type {
    ErrorViewModel,
    GameViewModel,
} from '../../src/interface-adapters/view-models/GameViewModel';

export class GameViewSpy implements GameView {
    readonly results: GameViewModel[] = [];
    readonly errors: ErrorViewModel[] = [];

    showResult(viewModel: GameViewModel): void {
        this.results.push(viewModel);
    }

    showError(viewModel: ErrorViewModel): void {
        this.errors.push(viewModel);
    }
}
