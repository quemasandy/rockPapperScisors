import type { InputReader } from '../../src/frameworks/cli/CliGameRunner';

export class InputReaderFake implements InputReader {
    readonly prompts: string[] = [];

    constructor(private readonly answer: string) {}

    async read(prompt: string): Promise<string> {
        this.prompts.push(prompt);
        return this.answer;
    }
}
