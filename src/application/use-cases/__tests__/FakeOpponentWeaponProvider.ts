import { Weapon } from '../../../domain/Weapon';
import type { OpponentWeaponProvider } from '../../ports/output/OpponentWeaponProvider';

export class FakeOpponentWeaponProvider implements OpponentWeaponProvider {
    chooseCalls = 0;

    constructor(private readonly weapon: Weapon) {}

    choose(): Weapon {
        this.chooseCalls += 1;
        return this.weapon;
    }
}
