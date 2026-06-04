import type { CartCoord, PolarCoord, SinusoidalResult } from '../types.js';

export class Trigonometric {
    static sin(number: number): number {
        return Math.sin(number);
    }

    static arcsin(number: number): number {
        return Math.asin(number);
    }

    static cos(number: number): number {
        return Math.cos(number);
    }

    static arccos(number: number): number {
        return Math.acos(number);
    }

    static tan(number: number): number {
        return Math.tan(number);
    }

    static arctan(number: number): number {
        return Math.atan(number);
    }

    static radiansToDegrees(number: number): number {
        return number * (180 / Math.PI);
    }

    static degreesToRadians(number: number): number {
        return number * (Math.PI / 180);
    }

    static csc(number: number): number {
        return 1 / Math.sin(number);
    }

    static sec(number: number): number {
        return 1 / Math.cos(number);
    }

    static cot(number: number): number {
        return 1 / Math.tan(number);
    }

    static arctan2(y: number, x: number): number {
        return Math.atan2(y, x);
    }

    static hypot(a: number, b: number): number {
        return Math.hypot(a, b);
    }

    static lawOfCosines(a: number, b: number, angleC: number): number {
        return Math.sqrt(a ** 2 + b ** 2 - 2 * a * b * Math.cos(angleC));
    }

    static polarToCartesian(r: number, theta: number): CartCoord {
        return {
            x: r * Math.cos(theta),
            y: r * Math.sin(theta)
        };
    }

    static cartesianToPolar(x: number, y: number): PolarCoord {
        return {
            r: Math.sqrt(x ** 2 + y ** 2),
            theta: Math.atan2(y, x)
        };
    }

    static sinusoidalFunction(a: number, k: number, d: number, c: number): SinusoidalResult {
        const amplitude = Math.abs(a);
        const period = 2 * Math.PI / Math.abs(k);
        const periodDegrees = 360 / Math.abs(k);
        const phaseShift = d;
        const verticalShift = c;
        const maxValue = c + amplitude;
        const minValue = c - amplitude;

        let phaseShiftDescription: string;
        if (d > 0) {
            phaseShiftDescription = `${d} units right`;
        } else if (d < 0) {
            phaseShiftDescription = `${Math.abs(d)} units left`;
        } else {
            phaseShiftDescription = "No phase shift";
        }

        const midline = `y = ${c}`;
        const range = `[${minValue}, ${maxValue}]`;

        return { amplitude, period, periodDegrees, phaseShift, phaseShiftDescription, verticalShift, midline, range, maxValue, minValue };
    }
}
