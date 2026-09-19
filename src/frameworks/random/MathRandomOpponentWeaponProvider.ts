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
        return weapons[index];
    }
}
