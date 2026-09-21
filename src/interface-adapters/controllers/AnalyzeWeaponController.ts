import type {
    AnalyzeWeaponInputBoundary,
} from '../../application/ports/input/AnalyzeWeaponInputBoundary';
import type {
    InvalidInputOutputBoundary,
} from '../ports/InvalidInputOutputBoundary';
import { parseWeaponSelection } from './parseWeaponSelection';

export class AnalyzeWeaponController {
    constructor(
        private readonly analyzeWeapon: AnalyzeWeaponInputBoundary,
        private readonly invalidInputOutput: InvalidInputOutputBoundary,
    ) {}

    handle(rawWeapon: string): void {
        const weapon = parseWeaponSelection(rawWeapon);

        if (!weapon) {
            this.invalidInputOutput.presentInvalidSelection();
            return;
        }

        this.analyzeWeapon.execute({ weapon });
    }
}
