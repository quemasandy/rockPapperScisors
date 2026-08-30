import { GameResult } from '../../domain/entities/Game';
import { Weapon } from '../../domain/entities/Weapon';

// Input Port: define la acción que la aplicación puede ejecutar
export interface PlayGameInput {
    execute(playerWeapon: Weapon): PlayGameOutput;
}

// Output DTO: estructura de datos que devuelve el caso de uso
export interface PlayGameOutput {
    result: GameResult;
    machineWeapon: Weapon;
}
