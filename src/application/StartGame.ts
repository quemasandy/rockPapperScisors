import { Game } from '../domain/entities/Game'

export class StartGame {
    private game: Game
    constructor() {
        this.game = new Game()
    }

    
}