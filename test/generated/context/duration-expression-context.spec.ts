import { DurationListener } from '$generated/duration-listener';
import { DurationParser } from '$generated/duration-parser';
import { DurationExpressionContext } from '$generated/context/duration-expression-context';
import { DurationGrammarUtils } from '$core/duration-grammar-utils';

describe('DurationExpressionContext', () => {
  const listener: DurationListener = {
    enterDurationExpression: jest.fn(),
    exitDurationExpression: jest.fn(),
  };

  const parser = DurationGrammarUtils.getParser('10d + 1w');
  const context = parser.durationExpression();

  test('should return correct ruleIndex', () => {
    expect(context.ruleIndex).toBe(DurationParser.RULE_durationExpression);
  });

  test('should call enterRule on listener', () => {
    context.enterRule(listener);
    expect(listener.enterDurationExpression).toHaveBeenCalledWith(context);
  });

  test('should call exitRule on listener', () => {
    context.exitRule(listener);
    expect(listener.exitDurationExpression).toHaveBeenCalledWith(context);
  });

  test('should get duration term', () => {
    expect(context.durationTerm().text).toBe('10d');
  });

  test('should get duration expression tail', () => {
    expect(context.durationExpressionTail().length).toBe(1);
  });
});
