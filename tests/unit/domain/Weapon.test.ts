import { describe, expect, it } from 'vitest';
import { Weapon } from '../../../src/domain/Weapon';

describe('Weapon', () => {
    it('usa identificadores internos neutrales', () => {
        expect(Weapon.Rock).toBe('rock');
        expect(Weapon.Paper).toBe('paper');
        expect(Weapon.Scissors).toBe('scissors');
    });
});
