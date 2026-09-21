import type { AnalyzeWeaponView } from '../../src/interface-adapters/ports/AnalyzeWeaponView';
import type {
    AnalyzeWeaponErrorViewModel,
    AnalyzeWeaponViewModel,
} from '../../src/interface-adapters/view-models/AnalyzeWeaponViewModel';

export class AnalyzeWeaponViewSpy implements AnalyzeWeaponView {
    readonly analyses: AnalyzeWeaponViewModel[] = [];
    readonly errors: AnalyzeWeaponErrorViewModel[] = [];

    showAnalysis(viewModel: AnalyzeWeaponViewModel): void {
        this.analyses.push(viewModel);
    }

    showError(viewModel: AnalyzeWeaponErrorViewModel): void {
        this.errors.push(viewModel);
    }
}
