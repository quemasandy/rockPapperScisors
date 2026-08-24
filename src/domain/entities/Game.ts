import { Weapon } from './Weapon';

export enum GameResult {
    Win = "win",
    Lose = "lose",
    Draw = "draw",
}

const WINS_AGAINST: Readonly<Record<Weapon, Weapon>> = Object.freeze({
    [Weapon.Rock]: Weapon.Scissors,
    [Weapon.Paper]: Weapon.Rock,
    [Weapon.Scissors]: Weapon.Paper,
});

export class Game {
    play(
        playerWeapon: Weapon,
        opponentWeapon: Weapon,
    ): { result: GameResult; opponentWeapon: Weapon } {
        if (playerWeapon === opponentWeapon) {
            return { result: GameResult.Draw, opponentWeapon };
        }

        const result = WINS_AGAINST[playerWeapon] === opponentWeapon
            ? GameResult.Win
            : GameResult.Lose;

        return { result, opponentWeapon };
    }
}
