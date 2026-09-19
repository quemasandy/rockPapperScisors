import { describe, expect, it } from 'vitest';
import { CliGameRunner } from '../../../../src/frameworks/cli/CliGameRunner';
import { InputReaderFake } from '../../../support/InputReaderFake';

class GameControllerSpy {
    readonly selections: string[] = [];

    handle(rawSelection: string): void {
        this.selections.push(rawSelection);
    }
}

describe('CliGameRunner', () => {
    it('solicita una selección y entrega la respuesta intacta al controller', async () => {
        const inputReader = new InputReaderFake('  PiEdRa  ');
        const controller = new GameControllerSpy();
        const runner = new CliGameRunner(inputReader, controller);

        await runner.start();

        expect(inputReader.prompts).toEqual([
            'Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ',
        ]);
        expect(controller.selections).toEqual(['  PiEdRa  ']);
    });
});
