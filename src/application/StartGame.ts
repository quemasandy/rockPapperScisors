import { Game } from '../domain/entities/Game'
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator'

export class StartGame {
    private game: Game
    constructor(randomNumberGenerator: RandomNumberGenerator) {
        this.game = new Game(randomNumberGenerator)
    }

    evaluateAnswer(answer: string) {
        return this.game.evaluateAnswer(answer)
    }
}