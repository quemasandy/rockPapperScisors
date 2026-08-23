import * as readline from 'readline';
import { Weapon } from '../domain/entities/Weapon';
import { GameResult } from '../domain/entities/Game';
import { PlayGameInput } from '../domain/ports/PlayGame';
import { GameUI } from '../domain/ports/GameUI';
import { GamePresenter } from '../presentation/GamePresenter';
import { GameView } from './GameView';

export class GameCli implements GameUI {
    private presenter: GamePresenter;
    private view: GameView;

    constructor(private readonly playGame: PlayGameInput) {
        this.presenter = new GamePresenter();
        this.view = new GameView();
    }

    async askForWeapon(): Promise<Weapon | null> {
        const prompt = "Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ";
        const input = await this.readLine(prompt);
        return this.parseWeapon(input);
    }

    showResult(playerWeapon: Weapon, machineWeapon: Weapon, result: GameResult): void {
        const viewModel = this.presenter.presentResult(playerWeapon, machineWeapon, result);
        this.view.showResult(viewModel);
    }

    showError(message: string): void {
        const errorVM = this.presenter.presentError(message);
        this.view.showError(errorVM);
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
