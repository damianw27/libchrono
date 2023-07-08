import { DurationListener } from '$generated/duration-listener';
import { DurationParser } from '$generated/duration-parser';
import { DurationGrammarUtils } from '$core/duration-grammar-utils';

describe('DurationTermTailContext', () => {
  const listener: DurationListener = {
    enterDurationTermTail: jest.fn(),
    exitDurationTermTail: jest.fn(),
  };

  const parser = DurationGrammarUtils.getParser('10d * 2');
  const context = parser.durationTerm().durationTermTail(0);

  test('should return correct ruleIndex', () => {
    expect(context.ruleIndex).toBe(DurationParser.RULE_durationTermTail);
  });

  test('should call enterRule on listener', () => {
    context.enterRule(listener);
    expect(listener.enterDurationTermTail).toHaveBeenCalledWith(context);
  });

  test('should call exitRule on listener', () => {
    context.exitRule(listener);
    expect(listener.exitDurationTermTail).toHaveBeenCalledWith(context);
  });

  test('should get NUMBER token', () => {
    expect(context.NUMBER()?.text).toBe('2');
  });

  test('should get DIV token', () => {
    expect(context.DIV()?.text).toBeUndefined();
  });

  test('should get MUL token', () => {
    expect(context.MUL()?.text).toBe('*');
  });
});
