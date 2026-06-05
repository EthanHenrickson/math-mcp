import { NumberTheory } from './NumberTheory.js';
import type { FractionResult } from '../types.js';

export class Utilities {
    static clamp(value: number, min: number, max: number): number {
        if (Number.isNaN(value)) return min;
        return Math.max(min, Math.min(max, value));
    }

    static lerp(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    static mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
    }

    static percentageOf(part: number, whole: number): number {
        return (part / whole) * 100;
    }

    static percentageChange(oldValue: number, newValue: number): number {
        return ((newValue - oldValue) / oldValue) * 100;
    }

    // math.random not crypto secure, dont use for tokens
    static randomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static randomFloat(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    static sign(x: number): number {
        if (x > 0) return 1;
        if (x < 0) return -1;
        return 0;
    }

    static isBetween(x: number, lower: number, upper: number): boolean {
        return x >= lower && x <= upper;
    }

    static baseConvert(value: string, fromBase: number, toBase: number): string {
        if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) return '';
        const decimal = parseInt(value, fromBase);
        if (Number.isNaN(decimal)) return '';
        return decimal.toString(toBase).toUpperCase();
    }

    // sign in numerator, denominator always positive, reduced by gcd
    static fractionSimplify(numerator: number, denominator: number): FractionResult {
        if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
            return { numerator: NaN, denominator: NaN };
        }
        if (denominator === 0) return { numerator: NaN, denominator: NaN };
        if (numerator === 0) return { numerator: 0, denominator: 1 };
        const g = NumberTheory.gcd(Math.abs(numerator), Math.abs(denominator));
        const sign = denominator < 0 ? -1 : 1;
        return {
            numerator: sign * numerator / g,
            denominator: Math.abs(denominator) / g
        };
    }
}
