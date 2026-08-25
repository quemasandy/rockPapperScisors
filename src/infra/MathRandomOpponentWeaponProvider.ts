import { OpponentWeaponProvider } from '../application/ports/OpponentWeaponProvider';
import { Weapon } from '../domain/entities/Weapon';

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
