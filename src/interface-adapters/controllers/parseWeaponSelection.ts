import { Weapon } from '../../domain/Weapon';

const weaponBySelection: Readonly<Record<string, Weapon>> = {
    '1': Weapon.Rock,
    '2': Weapon.Paper,
    '3': Weapon.Scissors,
    piedra: Weapon.Rock,
    papel: Weapon.Paper,
    tijeras: Weapon.Scissors,
};

export function parseWeaponSelection(rawSelection: string): Weapon | undefined {
    return weaponBySelection[rawSelection.trim().toLowerCase()];
}
