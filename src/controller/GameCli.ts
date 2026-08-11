import { StartGame } from '../application/StartGame'
import { GameResult } from '../domain/entities/Game'
import { Weapon } from '../domain/entities/Weapon'
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator'
import * as readline from 'readline'

export class GameCli {
    constructor(private randomNumberGenerator: RandomNumberGenerator) { }

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

    private parseWeapon(input: string): Weapon | null {
        const normalized = input.trim().toLowerCase()
        const weaponMap: Record<string, Weapon> = {
            '1': Weapon.Rock,
            '2': Weapon.Paper,
            '3': Weapon.Scissors,
            'piedra': Weapon.Rock,
            'papel': Weapon.Paper,
            'tijeras': Weapon.Scissors,
        }
        return weaponMap[normalized] ?? null
    }

    async start() {
        const game = new StartGame(this.randomNumberGenerator)

        const question = "Piedra, Papel o Tijera. 1, 2, 3...\n"
        const userResponse = await this.askQuestion(question)

        const playerWeapon = this.parseWeapon(userResponse)

        if (!playerWeapon) {
            console.log("Opción no válida. Usa: 1 (piedra), 2 (papel), 3 (tijeras)")
            return
        }

        const { result, machineWeapon } = game.play(playerWeapon)

        console.log(`Elegiste: ${playerWeapon}`)
        console.log(`Máquina eligió: ${machineWeapon}`)

        if (result === GameResult.Draw) {
            console.log("¡Empate!")
        } else if (result === GameResult.Win) {
            console.log("¡Ganaste!")
        } else {
            console.log("Perdiste")
        }
    }
}

