import * as readline from 'readline';
import { GameController } from './GameController';

export class GameCli {
    constructor(private readonly controller: GameController) {}

    async start(): Promise<void> {
        const prompt = 'Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ';
        const rawSelection = await this.readLine(prompt);
        this.controller.handle(rawSelection);
    }

    private readLine(prompt: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }
}
