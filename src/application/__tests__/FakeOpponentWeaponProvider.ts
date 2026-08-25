import { Weapon } from '../../domain/entities/Weapon';
import { OpponentWeaponProvider } from '../ports/OpponentWeaponProvider';

export class FakeOpponentWeaponProvider implements OpponentWeaponProvider {
    chooseCalls = 0;

    constructor(private readonly weapon: Weapon) {}

    choose(): Weapon {
        this.chooseCalls += 1;
        return this.weapon;
    }
}
