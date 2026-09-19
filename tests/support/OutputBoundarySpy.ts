import type { InvalidInputOutputBoundary } from '../../src/application/ports/output/InvalidInputOutputBoundary';
import type {
    PlayGameOutputBoundary,
    PlayGameResponse,
} from '../../src/application/ports/output/PlayGameOutputBoundary';

export class OutputBoundarySpy
    implements PlayGameOutputBoundary, InvalidInputOutputBoundary
{
    readonly responses: PlayGameResponse[] = [];
    presentInvalidSelectionCalls = 0;

    present(response: PlayGameResponse): void {
        this.responses.push(response);
    }

    presentInvalidSelection(): void {
        this.presentInvalidSelectionCalls += 1;
    }
}
