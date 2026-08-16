import * as readline from 'readline';
import { Weapon } from '../domain/entities/Weapon';
import { GameResult } from '../domain/entities/Game';
import { PlayGameInput } from '../domain/ports/PlayGame';
import { GameUI } from '../domain/ports/GameUI';

export class GameCli implements GameUI {
    constructor(private readonly playGame: PlayGameInput) {}

    async askForWeapon(): Promise<Weapon | null> {
        const prompt = "Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ";
        const input = await this.readLine(prompt);
        return this.parseWeapon(input);
    }

    showResult(playerWeapon: Weapon, machineWeapon: Weapon, result: GameResult): void {
        console.log(`\nTú elegiste: ${playerWeapon}`);
        console.log(`La máquina eligió: ${machineWeapon}`);

        switch (result) {
            case GameResult.Win:
                console.log("🎉 ¡Ganaste!");
                break;
            case GameResult.Lose:
                console.log("😢 Perdiste.");
                break;
            case GameResult.Draw:
                console.log("🤝 ¡Empate!");
                break;
        }
    }

    showError(message: string): void {
        console.log(`❌ Error: ${message}`);
    }

    async start(): Promise<void> {
        const weapon = await this.askForWeapon();

        if (!weapon) {
            this.showError("Opción inválida. Elige 1, 2 o 3.");
            return;
        }

        const { result, machineWeapon } = this.playGame.execute(weapon);
        this.showResult(weapon, machineWeapon, result);
    }

    private parseWeapon(input: string): Weapon | null {
        const map: Record<string, Weapon> = {
            "1": Weapon.Rock,
            "2": Weapon.Paper,
            "3": Weapon.Scissors,
            "piedra": Weapon.Rock,
            "papel": Weapon.Paper,
            "tijeras": Weapon.Scissors,
        };
        return map[input.toLowerCase().trim()] ?? null;
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
