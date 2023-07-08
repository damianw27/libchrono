import { DurationListener } from '$generated/duration-listener';
import { DurationParser } from '$generated/duration-parser';
import { DaysStatementContext } from '$generated/context/days-statement-context';
import { DurationGrammarUtils } from '$core/duration-grammar-utils';

describe('DaysStatementContext', () => {
  const listener: DurationListener = {
    enterDaysStatement: jest.fn(),
    exitDaysStatement: jest.fn(),
  };

  const parser = DurationGrammarUtils.getParser('10d');
  const context = parser.daysStatement();

  test('should return correct ruleIndex', () => {
    expect(context.ruleIndex).toBe(DurationParser.RULE_daysStatement);
  });

  test('should call enterRule on listener', () => {
    context.enterRule(listener);
    expect(listener.enterDaysStatement).toHaveBeenCalledWith(context);
  });

  test('should call exitRule on listener', () => {
    context.exitRule(listener);
    expect(listener.exitDaysStatement).toHaveBeenCalledWith(context);
  });

  test('should get NUMBER token', () => {
    expect(context.NUMBER().text).toBe('10');
  });

  test('should get DAY token', () => {
    expect(context.DAY().text).toBe('d');
  });
});
