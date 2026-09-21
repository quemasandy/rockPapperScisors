import type {
    AnalyzeWeaponOutputBoundary,
    AnalyzeWeaponResponse,
} from '../../application/ports/output/AnalyzeWeaponOutputBoundary';
import type { AnalyzeWeaponView } from '../ports/AnalyzeWeaponView';
import type { InvalidInputOutputBoundary } from '../ports/InvalidInputOutputBoundary';

export class AnalyzeWeaponPresenter
    implements AnalyzeWeaponOutputBoundary, InvalidInputOutputBoundary
{
    constructor(private readonly view: AnalyzeWeaponView) {}

    present(response: AnalyzeWeaponResponse): void {
        this.view.showAnalysis({
            fullOutput: JSON.stringify(response),
        });
    }

    presentInvalidSelection(): void {
        this.view.showError({
            errorMessage: JSON.stringify({ error: 'invalid_selection' }),
        });
    }
}
