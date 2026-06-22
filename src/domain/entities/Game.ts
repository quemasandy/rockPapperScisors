import { Machine } from './Machine.ts'
import { Player } from './Player.ts'
import { Weapon } from './Weapon.ts';

export class Game {
    private machine: Machine;
    private player: Player;
    private machineWeapon: Weapon;

    constructor() {
        this.machine = new Machine()
        this.player = new Player()
        this.machineWeapon = this.machine.getWeapon()
    }

    start() {
        
    }
}