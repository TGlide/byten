import { expect, test } from "bun:test";
import { Unit, Byten } from ".";


type TestCase = {
  from: { value: number, unit: Unit, base: 2 | 10 }
  to: { unit: Unit, base: 2 | 10 }
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
    const instance = new Byten(from.value, from.unit, from.base);
    const actual = instance.to(to.unit, to.base);
    console.log(instance.intValue, actual, expected)
    expect(actual).toBe(expected);
  })
})
