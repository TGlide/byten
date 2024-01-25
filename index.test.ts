import { expect, test, describe } from "bun:test";
import { BytenOptions, Unit, byten } from ".";


describe('to', () => {
  type TestCase = {
    from: { value: number } & BytenOptions
    to: BytenOptions
    expected: number;
  }

  const testCases: TestCase[] = [
    { from: { value: 1, unit: 'B', base: 10 }, to: { unit: 'KB', base: 10 }, expected: 0.001 },
    { from: { value: 1, unit: 'KB', base: 10 }, to: { unit: 'B', base: 10 }, expected: 1000 },
    { from: { value: 1, unit: 'KB', base: 2 }, to: { unit: 'B', base: 10 }, expected: 1024 },
    { from: { value: 1, unit: 'MB', base: 2 }, to: { unit: 'KB', base: 2 }, expected: 1024 },
    { from: { value: 1, unit: 'KB', base: 10 }, to: { unit: 'B', base: 2 }, expected: 1000 },
  ];

  testCases.forEach(({ from, to, expected }) => {
    test(`Convert ${from.value}${from.unit} (base ${from.base}) to ${to.unit} (base ${to.base})`, () => {
      const instance = byten(from.value, from);
      const actual = instance.to(to);
      expect(actual).toBe(expected);
    })
  })
})

describe('toString', () => {
  type TestCase = {
    from: { value: number } & BytenOptions
    to: { precision?: number } & BytenOptions
    expected: string;
  }

  const testCases: TestCase[] = [
    { from: { value: 1, unit: 'B', base: 10 }, to: { unit: 'KB', base: 10 }, expected: '0.001 KB' },
    { from: { value: 1, unit: 'KB', base: 10 }, to: { unit: 'B', base: 10 }, expected: '1000 B' },
    { from: { value: 1, unit: 'KB', base: 2 }, to: { unit: 'B', base: 10 }, expected: '1024 B' },
    { from: { value: 1, unit: 'MB', base: 2 }, to: { unit: 'KB', base: 2 }, expected: '1024 KB' },
    { from: { value: 1, unit: 'KB', base: 10 }, to: { unit: 'B', base: 2 }, expected: '1000 B' },
    { from: { value: 1500, unit: 'B', base: 10 }, to: { unit: 'KB', base: 10 }, expected: '1.5 KB' },
    { from: { value: 1500, unit: 'B', base: 10 }, to: { unit: 'KB', base: 10, precision: 2 }, expected: '1.50 KB' },
    { from: { value: 1500, unit: 'B', base: 10 }, to: { unit: 'KB', base: 10, precision: 0 }, expected: '2 KB' },
  ];

  testCases.forEach(({ from, to, expected }) => {
    test(`Convert ${from.value}${from.unit} (base ${from.base}) to ${to.unit} (base ${to.base})`, () => {
      const instance = byten(from.value, from);
      const actual = instance.toString(to);
      expect(actual).toBe(expected);
    })
  })
})

describe('error boundaries', () => {
  test('throws when value is too large', () => {
    expect(() => byten(Number.MAX_SAFE_INTEGER + 1)).toThrow();
  })

  test('throws when value is too small', () => {
    expect(() => byten(Number.MIN_SAFE_INTEGER - 1)).toThrow();
  })
})
