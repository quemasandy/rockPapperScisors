import { Weapon } from '../../../domain/Weapon';

export interface AnalyzeWeaponRequest {
    weapon: Weapon;
}

export interface AnalyzeWeaponInputBoundary {
    execute(request: AnalyzeWeaponRequest): void;
}
