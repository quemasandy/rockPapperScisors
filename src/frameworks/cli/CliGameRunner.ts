import type { GameController } from '../../interface-adapters/controllers/GameController';

export interface InputReader {
    read(prompt: string): Promise<string>;
}

type SelectionController = Pick<GameController, 'handle'>;

const GAME_MENU_PROMPT =
    'Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ';

export class CliGameRunner {
    constructor(
        private readonly inputReader: InputReader,
        private readonly controller: SelectionController,
    ) {}

    async start(): Promise<void> {
        const rawSelection = await this.inputReader.read(GAME_MENU_PROMPT);
        this.controller.handle(rawSelection);
    }
}
