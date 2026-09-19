import { Weapon } from '../../../domain/Weapon';

export interface OpponentWeaponProvider {
    choose(): Weapon;
}
