import { describe, expect, it } from 'vitest';
import { CliCommandRouter } from '../../../../src/frameworks/cli/CliCommandRouter';

class PlayCommandSpy {
    startCalls = 0;

    async start(): Promise<void> {
        this.startCalls += 1;
    }
}

class AnalyzeCommandSpy {
    readonly weapons: string[] = [];

    handle(rawWeapon: string): void {
        this.weapons.push(rawWeapon);
    }
}

describe('CliCommandRouter', () => {
    it('ejecuta el flujo interactivo cuando el comando es play', async () => {
        const playCommand = new PlayCommandSpy();
        const analyzeCommand = new AnalyzeCommandSpy();
        const router = new CliCommandRouter(playCommand, analyzeCommand);

        await router.run(['play']);

        expect(playCommand.startCalls).toBe(1);
        expect(analyzeCommand.weapons).toHaveLength(0);
    });

    it('entrega el arma al flujo de análisis cuando el comando es analyze', async () => {
        const playCommand = new PlayCommandSpy();
        const analyzeCommand = new AnalyzeCommandSpy();
        const router = new CliCommandRouter(playCommand, analyzeCommand);

        await router.run(['analyze', 'piedra']);

        expect(analyzeCommand.weapons).toEqual(['piedra']);
        expect(playCommand.startCalls).toBe(0);
    });

    it.each([
        [],
        ['desconocido'],
        ['play', 'piedra'],
        ['analyze'],
        ['analyze', 'piedra', 'extra'],
    ])('rechaza argumentos que no respetan el contrato: %j', async (...args) => {
        const router = new CliCommandRouter(
            new PlayCommandSpy(),
            new AnalyzeCommandSpy(),
        );

        await expect(router.run(args)).rejects.toThrow(
            'Uso: npm start -- play | analyze <piedra|papel|tijeras>',
        );
    });
});
