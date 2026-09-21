import type {
    AnalyzeWeaponErrorViewModel,
    AnalyzeWeaponViewModel,
} from '../view-models/AnalyzeWeaponViewModel';

export interface AnalyzeWeaponView {
    showAnalysis(viewModel: AnalyzeWeaponViewModel): void;
    showError(viewModel: AnalyzeWeaponErrorViewModel): void;
}
