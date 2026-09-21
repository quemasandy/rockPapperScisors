import { Weapon } from '../../../domain/Weapon';

export interface AnalyzeWeaponResponse {
    weapon: Weapon;
    winsAgainst: Weapon[];
    losesAgainst: Weapon[];
    drawsAgainst: Weapon[];
}

export interface AnalyzeWeaponOutputBoundary {
    present(response: AnalyzeWeaponResponse): void;
}
