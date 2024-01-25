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

export type BytenOptions = {
  unit?: Unit;
  base?: Base;
}

const defaultOptions = {
  unit: 'B',
  base: 10,
} satisfies BytenOptions

export type BytenToStringOptions = {
  precision?: number;
} & BytenOptions

export class Byten {
  #intValue: number;

  static validate({ unit, base }: BytenOptions) {
    if (!isValidUnit(unit)) {
      throw new Error(`Invalid unit, must be one of: ${Object.keys(units).join(', ')}`);
    }
    if (base !== 2 && base !== 10) {
      throw new Error(`Invalid base, must be 2 or 10`);
    }
  }

  constructor(value: number, options?: BytenOptions) {
    const o = { ...defaultOptions, ...options };
    Byten.validate(o);
    if (value > Number.MAX_SAFE_INTEGER) {
      throw new Error(`Value is too large, must be less than ${Number.MAX_SAFE_INTEGER}`);
    }

    if (value < Number.MIN_SAFE_INTEGER) {
      throw new Error(`Value is too small, must be greater than ${Number.MIN_SAFE_INTEGER}`);
    }

    const baseValue = o.base === 10 ? 1000 : 1024;
    this.#intValue = value * Math.pow(baseValue, units[o.unit]);
  }

  to(options?: BytenOptions): number {
    const o = { ...defaultOptions, ...options };
    Byten.validate(o);

    const baseValue = o.base === 10 ? 1000 : 1024;
    return this.#intValue / Math.pow(baseValue, units[o.unit]);
  }

  toString(options?: BytenToStringOptions): string {
    const o = { ...defaultOptions, ...options };
    Byten.validate(o);

    const baseValue = o.base === 10 ? 1000 : 1024;
    const value = this.#intValue / Math.pow(baseValue, units[o.unit]);
    const precise = o.precision !== undefined ? value.toFixed(o.precision) : value
    return `${precise} ${o.unit}`;
  }
}

export function byten(value: number, options?: BytenOptions): Byten {
  return new Byten(value, options);
}
