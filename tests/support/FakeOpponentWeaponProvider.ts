import type { OpponentWeaponProvider } from '../../src/application/ports/output/OpponentWeaponProvider';
import { Weapon } from '../../src/domain/Weapon';

export class FakeOpponentWeaponProvider implements OpponentWeaponProvider {
    chooseCalls = 0;

    constructor(private readonly weapon: Weapon) {}

    choose(): Weapon {
        this.chooseCalls += 1;
        return this.weapon;
    }
}
