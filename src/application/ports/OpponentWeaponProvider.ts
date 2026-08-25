import { Weapon } from '../../domain/entities/Weapon';

export interface OpponentWeaponProvider {
    choose(): Weapon;
}
