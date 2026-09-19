import { createInterface } from 'node:readline/promises';
import type { InputReader } from './CliGameRunner';

export class ReadlineInputReader implements InputReader {
    async read(prompt: string): Promise<string> {
        const readline = createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        try {
            return await readline.question(prompt);
        } finally {
            readline.close();
        }
    }
}
