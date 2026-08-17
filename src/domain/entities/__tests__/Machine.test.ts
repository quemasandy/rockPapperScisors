import { describe, it, expect } from 'vitest';
import { Machine } from '../Machine';
import { Weapon } from '../Weapon';
import { FakeRandomNumberGenerator } from './FakeRandomNumberGenerator';

describe('Machine', () => {
    it('debería generar Piedra cuando el random devuelve 0', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0);
        const machine = new Machine(fakeRandom);

        expect(machine.generateWeapon()).toBe(Weapon.Rock);
    });

    it('debería generar Papel cuando el random devuelve 1', () => {
        const fakeRandom = new FakeRandomNumberGenerator(1);
        const machine = new Machine(fakeRandom);

        expect(machine.generateWeapon()).toBe(Weapon.Paper);
    });

    it('debería generar Tijeras cuando el random devuelve 2', () => {
        const fakeRandom = new FakeRandomNumberGenerator(2);
        const machine = new Machine(fakeRandom);

        expect(machine.generateWeapon()).toBe(Weapon.Scissors);
    });
});
