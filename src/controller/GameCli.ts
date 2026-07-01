import { StartGame } from '../application/StartGame'
import * as readline from 'readline'

export class GameCli {
    constructor() { }

    private askQuestion(prompt: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                rl.close()
                resolve(answer)
            })
        })
    }

    async start() {
        const game = new StartGame()

        const question = "Piedra, Papel o Tijera. 1, 2, 3...\n"
        const userResponse = await this.askQuestion(question)

        console.log(`Elegiste: ${userResponse}`)
        
        const result = game.evaluateAnswer(userResponse)

        if (!result) {
            console.log("perdiste")
            return
        }

        console.log("ganaste")
    }
}

