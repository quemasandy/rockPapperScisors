import * as readline from 'readline';
import { Weapon } from '../domain/entities/Weapon';
import { PlayGameInputBoundary } from '../application/ports/PlayGame';
import { GamePresenter } from '../presentation/GamePresenter';

export class GameCli {
    constructor(
        private readonly playGame: PlayGameInputBoundary,
        private readonly presenter: GamePresenter,
    ) {}

    async askForWeapon(): Promise<Weapon | null> {
        const prompt = "Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ";
        const input = await this.readLine(prompt);
        return this.parseWeapon(input);
    }

    showError(message: string): void {
        this.presenter.presentError(message);
    }

    async start(): Promise<void> {
        const weapon = await this.askForWeapon();

        if (!weapon) {
            this.showError("Opción inválida. Elige 1, 2 o 3.");
            return;
        }

        this.playGame.execute({ playerWeapon: weapon });
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
