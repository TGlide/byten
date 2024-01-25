// Base 10, e.g. 1 kilobyte = 1000 bytes
const units = {
  B: 1,
  KB: 1000,
  MB: 1000 ** 2,
  GB: 1000 ** 3,
  TB: 1000 ** 4,
  PB: 1000 ** 5,
  EB: 1000 ** 6,
  ZB: 1000 ** 7,
  YB: 1000 ** 8,
} as const;

type Unit = keyof typeof units;

function isValidUnit(unit: unknown): unit is Unit {
  return typeof unit === 'string' && unit in units;
}

class Byten {
  intValue: number;

  constructor(value: number, unit: Unit = 'B') {
    if (!isValidUnit(unit)) {
      throw new Error(`Invalid unit, must be one of: ${Object.keys(units).join(', ')}`);
    }

    this.intValue = value * units[unit];
  }

  to(unit: Unit): number {
    if (!isValidUnit(unit)) {
      throw new Error(`Invalid unit, must be one of: ${Object.keys(units).join(', ')}`);
    }

    return this.intValue / units[unit];
  }
}
