// Base 10, e.g. 1 kilobyte = 1000 bytes
const units = {
  B: 0,
  KB: 1,
  MB: 2,
  GB: 3,
  TB: 4,
  PB: 5,
  EB: 6,
  ZB: 7,
  YB: 8,
} as const;

export type Unit = keyof typeof units;
export type Base = 2 | 10;

function isValidUnit(unit: unknown): unit is Unit {
  return typeof unit === 'string' && unit in units;
}

export class Byten {
  intValue: number;

  static validate(unit: Unit, base: Base) {
    if (!isValidUnit(unit)) {
      throw new Error(`Invalid unit, must be one of: ${Object.keys(units).join(', ')}`);
    }
    if (base !== 2 && base !== 10) {
      throw new Error(`Invalid base, must be 2 or 10`);
    }
  }

  constructor(value: number, unit: Unit = 'B', base: Base = 10) {
    Byten.validate(unit, base);

    const baseValue = base === 10 ? 1000 : 1024;
    this.intValue = value * Math.pow(baseValue, units[unit]);
  }

  to(unit: Unit, base: Base = 10): number {
    Byten.validate(unit, base);

    const baseValue = base === 10 ? 1000 : 1024;
    return this.intValue / Math.pow(baseValue, units[unit]);
  }
}
