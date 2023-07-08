import { ParsingError } from '$core/types/parsing-error';

export class DurationErrorListener {
  public readonly errors: ParsingError[];

  public constructor() {
    this.errors = [];
  }

  public syntaxError = (
    r: unknown,
    o: unknown,
    line: number,
    column: number,
    msg: string,
  ): void => {
    const parserError: ParsingError = {
      charPosition: column,
      message: msg,
    };

    this.errors.push(parserError);
  };

  public reportAmbiguity = (): void => {};

  public reportAttemptingFullContext = (): void => {};

  public reportContextSensitivity = (): void => {};
}
