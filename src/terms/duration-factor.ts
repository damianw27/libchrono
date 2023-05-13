import { BaseOperand } from '$terms/types/base-operand';
import { DurationExpression } from '$terms/duration-expression';
import { DurationStatement } from '$terms/duration-statement';
import { DurationFactorContext } from '$generated/DurationParser';
import { isDurationStatementContext } from '$terms/contexts-guards';

export class DurationFactor implements BaseOperand {
  public static of = (context: DurationFactorContext): DurationFactor => {
    const childContext = context.durationStatement() ?? context.durationExpression();

    if (childContext === undefined) {
      throw new Error('Duration factor needs to have child');
    }

    const child = isDurationStatementContext(childContext)
      ? new DurationStatement(childContext)
      : DurationExpression.of(childContext);

    return new DurationFactor(child);
  };

  public constructor(public readonly content: DurationStatement | DurationExpression) {}

  public solve = (): number => this.content.solve();
}
