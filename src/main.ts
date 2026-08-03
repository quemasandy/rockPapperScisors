
import { GameCli } from './controller/GameCli'
import { MathRandomNumberGenerator } from './infra/MathRandomNumberGenerator'

const randomNumberGenerator = new MathRandomNumberGenerator()
const game = new GameCli(randomNumberGenerator)

game.start()
