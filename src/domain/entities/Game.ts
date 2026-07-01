import { Machine } from './Machine'
import { Player } from './Player'
import { Weapon } from './Weapon';

export class Game {
    private machine: Machine;
    private player: Player;
    private machineWeapon: Weapon;

    constructor() {
        this.machine = new Machine()
        this.player = new Player()
        this.machineWeapon = this.machine.getWeapon()
    }

    evaluateAnswer(answer: string) {
        const machineAnswer = this.machine.generateWeapon()
        
        if (machineAnswer === answer) {
            return true
        }

        return false
    }
}