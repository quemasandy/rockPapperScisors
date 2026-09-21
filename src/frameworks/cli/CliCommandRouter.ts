interface PlayCommand {
    start(): Promise<void>;
}

interface AnalyzeCommand {
    handle(rawWeapon: string): void;
}

const USAGE = 'Uso: npm start -- play | analyze <piedra|papel|tijeras>';

export class CliCommandRouter {
    constructor(
        private readonly playCommand: PlayCommand,
        private readonly analyzeCommand: AnalyzeCommand,
    ) {}

    async run(args: readonly string[]): Promise<void> {
        if (args.length === 1 && args[0] === 'play') {
            await this.playCommand.start();
            return;
        }

        if (args.length === 2 && args[0] === 'analyze') {
            const rawWeapon = args[1];

            if (rawWeapon !== undefined) {
                this.analyzeCommand.handle(rawWeapon);
                return;
            }
        }

        throw new Error(USAGE);
    }
}
