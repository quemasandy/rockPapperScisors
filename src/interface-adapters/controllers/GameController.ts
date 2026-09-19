import type {
    PlayGameInputBoundary,
} from '../../application/ports/input/PlayGameInputBoundary';
import type {
    InvalidInputOutputBoundary,
} from '../../application/ports/output/InvalidInputOutputBoundary';
import { Weapon } from '../../domain/Weapon';

const weaponBySelection: Readonly<Record<string, Weapon>> = {
    '1': Weapon.Rock,
    '2': Weapon.Paper,
    '3': Weapon.Scissors,
    piedra: Weapon.Rock,
    papel: Weapon.Paper,
    tijeras: Weapon.Scissors,
};

export class GameController {
    constructor(
        private readonly playGame: PlayGameInputBoundary,
        private readonly invalidInputOutput: InvalidInputOutputBoundary,
    ) {}

    handle(rawSelection: string): void {
        const normalizedSelection = rawSelection.trim().toLowerCase();
        const playerWeapon = weaponBySelection[normalizedSelection];

        if (!playerWeapon) {
            this.invalidInputOutput.presentInvalidSelection();
            return;
        }

        this.playGame.execute({ playerWeapon });
    }
}
