import { MathRandomNumberGenerator } from './infra/MathRandomNumberGenerator'
import { PlayGameUseCase } from './application/PlayGameUseCase'
import { GameCli } from './controller/GameCli'

const randomNumberGenerator = new MathRandomNumberGenerator()
const playGame = new PlayGameUseCase(randomNumberGenerator)
const game = new GameCli(playGame)

game.start()
