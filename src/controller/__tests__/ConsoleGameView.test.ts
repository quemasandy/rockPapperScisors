import { afterEach, describe, expect, it, vi } from 'vitest';
import { ConsoleGameView } from '../ConsoleGameView';

afterEach(() => {
    vi.restoreAllMocks();
});

describe('ConsoleGameView', () => {
    it('escribe la salida ya formateada de un resultado', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        const view = new ConsoleGameView();

        view.showResult({
            playerWeaponText: 'piedra',
            machineWeaponText: 'tijeras',
            resultEmoji: '🎉',
            resultMessage: '¡Ganaste!',
            fullOutput:
                '\nTú elegiste: piedra\nLa máquina eligió: tijeras\n🎉 ¡Ganaste!',
        });

        expect(log).toHaveBeenCalledOnce();
        expect(log).toHaveBeenCalledWith(
            '\nTú elegiste: piedra\nLa máquina eligió: tijeras\n🎉 ¡Ganaste!',
        );
    });

    it('escribe el mensaje ya formateado de un error', () => {
        const log = vi.spyOn(console, 'log').mockImplementation(() => undefined);
        const view = new ConsoleGameView();

        view.showError({ errorMessage: '❌ selección inválida' });

        expect(log).toHaveBeenCalledOnce();
        expect(log).toHaveBeenCalledWith('❌ selección inválida');
    });
});
