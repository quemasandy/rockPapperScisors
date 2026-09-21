import type {
    AnalyzeWeaponOutputBoundary,
    AnalyzeWeaponResponse,
} from '../../src/application/ports/output/AnalyzeWeaponOutputBoundary';

export class AnalyzeWeaponOutputBoundarySpy implements AnalyzeWeaponOutputBoundary {
    readonly responses: AnalyzeWeaponResponse[] = [];

    present(response: AnalyzeWeaponResponse): void {
        this.responses.push(response);
    }
}
