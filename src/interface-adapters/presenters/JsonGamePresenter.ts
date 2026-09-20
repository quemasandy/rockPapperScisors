import type {
    PlayGameOutputBoundary,
    PlayGameResponse,
} from '../../application/ports/output/PlayGameOutputBoundary';
import type {
    InvalidInputOutputBoundary,
} from '../ports/InvalidInputOutputBoundary';

type WriteLine = (line: string) => void;

export class JsonGamePresenter
    implements PlayGameOutputBoundary, InvalidInputOutputBoundary
{
    constructor(private readonly writeLine: WriteLine) {}

    present(response: PlayGameResponse): void {
        this.writeLine(JSON.stringify({
            playerWeapon: response.playerWeapon,
            opponentWeapon: response.opponentWeapon,
            result: response.result,
        }));
    }

    presentInvalidSelection(): void {
        this.writeLine(JSON.stringify({ error: 'invalid_selection' }));
    }
}
