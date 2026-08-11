import { Game, GameResult } from '../domain/entities/Game'
import { Weapon } from '../domain/entities/Weapon'
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator'

export class StartGame {
    private game: Game
    constructor(randomNumberGenerator: RandomNumberGenerator) {
        this.game = new Game(randomNumberGenerator)
    }

    play(playerWeapon: Weapon): { result: GameResult; machineWeapon: Weapon } {
        return this.game.play(playerWeapon)
    }
}