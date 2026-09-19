import type {
    OpponentWeaponProvider,
} from '../../application/ports/output/OpponentWeaponProvider';
import { Weapon } from '../../domain/Weapon';

const weapons: readonly Weapon[] = [
    Weapon.Rock,
    Weapon.Paper,
    Weapon.Scissors,
];

export class MathRandomOpponentWeaponProvider implements OpponentWeaponProvider {
    choose(): Weapon {
        const index = Math.floor(Math.random() * weapons.length);
        const weapon = weapons[index];

        if (weapon === undefined) {
            throw new RangeError(
                'Math.random() must return a value in the range [0, 1).',
            );
        }

        return weapon;
    }
}
