import { describe, it, expect } from 'vitest';
import { Trigonometric } from './Trigonometric.js';
describe("Trigonometric", () => {
    describe("sin()", () => {
        it("should calculate sin of 0", () => {
            const result = Trigonometric.sin(0);
            expect(result).toBe(0);
        });
        it("should calculate sin of π/2", () => {
            const result = Trigonometric.sin(Math.PI / 2);
            expect(result).toBeCloseTo(1);
        });
        it("should calculate sin of π", () => {
            const result = Trigonometric.sin(Math.PI);
            expect(result).toBeCloseTo(0);
        });
        it("should calculate sin of 3π/2", () => {
            const result = Trigonometric.sin(3 * Math.PI / 2);
            expect(result).toBeCloseTo(-1);
        });
        it("should calculate sin of 2π", () => {
            const result = Trigonometric.sin(2 * Math.PI);
            expect(result).toBeCloseTo(0);
        });
        it("should calculate sin of negative values", () => {
            const result = Trigonometric.sin(-Math.PI / 2);
            expect(result).toBeCloseTo(-1);
        });
        it("should calculate sin of arbitrary angle", () => {
            const result = Trigonometric.sin(Math.PI / 6);
            expect(result).toBeCloseTo(0.5);
        });
    });
    describe("arcsin()", () => {
        it("should calculate arcsin of 0", () => {
            const result = Trigonometric.arcsin(0);
            expect(result).toBe(0);
        });
        it("should calculate arcsin of 1", () => {
            const result = Trigonometric.arcsin(1);
            expect(result).toBeCloseTo(Math.PI / 2);
        });
        it("should calculate arcsin of -1", () => {
            const result = Trigonometric.arcsin(-1);
            expect(result).toBeCloseTo(-Math.PI / 2);
        });
        it("should calculate arcsin of 0.5", () => {
            const result = Trigonometric.arcsin(0.5);
            expect(result).toBeCloseTo(Math.PI / 6);
        });
        it("should calculate arcsin of -0.5", () => {
            const result = Trigonometric.arcsin(-0.5);
            expect(result).toBeCloseTo(-Math.PI / 6);
        });
        it("should return NaN for values outside [-1, 1]", () => {
            const result1 = Trigonometric.arcsin(2);
            const result2 = Trigonometric.arcsin(-2);
            expect(isNaN(result1)).toBeTruthy();
            expect(isNaN(result2)).toBeTruthy();
        });
    });
    describe("cos()", () => {
        it("should calculate cos of 0", () => {
            const result = Trigonometric.cos(0);
            expect(result).toBe(1);
        });
        it("should calculate cos of π/2", () => {
            const result = Trigonometric.cos(Math.PI / 2);
            expect(result).toBeCloseTo(0);
        });
        it("should calculate cos of π", () => {
            const result = Trigonometric.cos(Math.PI);
            expect(result).toBeCloseTo(-1);
        });
        it("should calculate cos of 3π/2", () => {
            const result = Trigonometric.cos(3 * Math.PI / 2);
            expect(result).toBeCloseTo(0);
        });
        it("should calculate cos of 2π", () => {
            const result = Trigonometric.cos(2 * Math.PI);
            expect(result).toBeCloseTo(1);
        });
        it("should calculate cos of negative values", () => {
            const result = Trigonometric.cos(-Math.PI);
            expect(result).toBeCloseTo(-1);
        });
        it("should calculate cos of arbitrary angle", () => {
            const result = Trigonometric.cos(Math.PI / 3);
            expect(result).toBeCloseTo(0.5);
        });
    });
    describe("arccos()", () => {
        it("should calculate arccos of 1", () => {
            const result = Trigonometric.arccos(1);
            expect(result).toBe(0);
        });
        it("should calculate arccos of 0", () => {
            const result = Trigonometric.arccos(0);
            expect(result).toBeCloseTo(Math.PI / 2);
        });
        it("should calculate arccos of -1", () => {
            const result = Trigonometric.arccos(-1);
            expect(result).toBeCloseTo(Math.PI);
        });
        it("should calculate arccos of 0.5", () => {
            const result = Trigonometric.arccos(0.5);
            expect(result).toBeCloseTo(Math.PI / 3);
        });
        it("should calculate arccos of -0.5", () => {
            const result = Trigonometric.arccos(-0.5);
            expect(result).toBeCloseTo(2 * Math.PI / 3);
        });
        it("should return NaN for values outside [-1, 1]", () => {
            const result1 = Trigonometric.arccos(2);
            const result2 = Trigonometric.arccos(-2);
            expect(isNaN(result1)).toBeTruthy();
            expect(isNaN(result2)).toBeTruthy();
        });
    });
    describe("tan()", () => {
        it("should calculate tan of 0", () => {
            const result = Trigonometric.tan(0);
            expect(result).toBe(0);
        });
        it("should calculate tan of π/4", () => {
            const result = Trigonometric.tan(Math.PI / 4);
            expect(result).toBeCloseTo(1);
        });
        it("should calculate tan of π", () => {
            const result = Trigonometric.tan(Math.PI);
            expect(result).toBeCloseTo(0);
        });
        it("should calculate tan of -π/4", () => {
            const result = Trigonometric.tan(-Math.PI / 4);
            expect(result).toBeCloseTo(-1);
        });
        it("should calculate tan of π/6", () => {
            const result = Trigonometric.tan(Math.PI / 6);
            expect(result).toBeCloseTo(Math.sqrt(3) / 3);
        });
        it("should calculate tan of π/3", () => {
            const result = Trigonometric.tan(Math.PI / 3);
            expect(result).toBeCloseTo(Math.sqrt(3));
        });
    });
    describe("arctan()", () => {
        it("should calculate arctan of 0", () => {
            const result = Trigonometric.arctan(0);
            expect(result).toBe(0);
        });
        it("should calculate arctan of 1", () => {
            const result = Trigonometric.arctan(1);
            expect(result).toBeCloseTo(Math.PI / 4);
        });
        it("should calculate arctan of -1", () => {
            const result = Trigonometric.arctan(-1);
            expect(result).toBeCloseTo(-Math.PI / 4);
        });
        it("should calculate arctan of √3", () => {
            const result = Trigonometric.arctan(Math.sqrt(3));
            expect(result).toBeCloseTo(Math.PI / 3);
        });
        it("should calculate arctan of 1/√3", () => {
            const result = Trigonometric.arctan(1 / Math.sqrt(3));
            expect(result).toBeCloseTo(Math.PI / 6);
        });
        it("should handle large positive values", () => {
            const result = Trigonometric.arctan(1000);
            expect(result).toBeCloseTo(Math.PI / 2, 2);
        });
        it("should handle large negative values", () => {
            const result = Trigonometric.arctan(-1000);
            expect(result).toBeCloseTo(-Math.PI / 2, 2);
        });
    });
    describe("radiansToDegrees()", () => {
        it("should convert 0 radians to 0 degrees", () => {
            const result = Trigonometric.radiansToDegrees(0);
            expect(result).toBe(0);
        });
        it("should convert π radians to 180 degrees", () => {
            const result = Trigonometric.radiansToDegrees(Math.PI);
            expect(result).toBeCloseTo(180);
        });
        it("should convert π/2 radians to 90 degrees", () => {
            const result = Trigonometric.radiansToDegrees(Math.PI / 2);
            expect(result).toBeCloseTo(90);
        });
        it("should convert 2π radians to 360 degrees", () => {
            const result = Trigonometric.radiansToDegrees(2 * Math.PI);
            expect(result).toBeCloseTo(360);
        });
        it("should convert negative radians", () => {
            const result = Trigonometric.radiansToDegrees(-Math.PI);
            expect(result).toBeCloseTo(-180);
        });
        it("should convert arbitrary radian values", () => {
            const result = Trigonometric.radiansToDegrees(Math.PI / 3);
            expect(result).toBeCloseTo(60);
        });
        it("should convert decimal radian values", () => {
            const result = Trigonometric.radiansToDegrees(1.5);
            expect(result).toBeCloseTo(85.94366927);
        });
    });
    describe("degreesToRadians()", () => {
        it("should convert 0 degrees to 0 radians", () => {
            const result = Trigonometric.degreesToRadians(0);
            expect(result).toBe(0);
        });
        it("should convert 180 degrees to π radians", () => {
            const result = Trigonometric.degreesToRadians(180);
            expect(result).toBeCloseTo(Math.PI);
        });
        it("should convert 90 degrees to π/2 radians", () => {
            const result = Trigonometric.degreesToRadians(90);
            expect(result).toBeCloseTo(Math.PI / 2);
        });
        it("should convert 360 degrees to 2π radians", () => {
            const result = Trigonometric.degreesToRadians(360);
            expect(result).toBeCloseTo(2 * Math.PI);
        });
        it("should convert negative degrees", () => {
            const result = Trigonometric.degreesToRadians(-180);
            expect(result).toBeCloseTo(-Math.PI);
        });
        it("should convert arbitrary degree values", () => {
            const result = Trigonometric.degreesToRadians(60);
            expect(result).toBeCloseTo(Math.PI / 3);
        });
        it("should convert decimal degree values", () => {
            const result = Trigonometric.degreesToRadians(45.5);
            expect(result).toBeCloseTo(0.79408);
        });
    });
    describe("Edge cases and special values", () => {
        it("should handle very small numbers", () => {
            const smallValue = 1e-10;
            expect(Trigonometric.sin(smallValue)).toBeCloseTo(smallValue);
            expect(Trigonometric.cos(smallValue)).toBeCloseTo(1);
            expect(Trigonometric.tan(smallValue)).toBeCloseTo(smallValue);
        });
        it("should handle very large numbers", () => {
            const largeValue = 1e6;
            const sinResult = Trigonometric.sin(largeValue);
            const cosResult = Trigonometric.cos(largeValue);
            expect(sinResult).toBeGreaterThanOrEqual(-1);
            expect(sinResult).toBeLessThanOrEqual(1);
            expect(cosResult).toBeGreaterThanOrEqual(-1);
            expect(cosResult).toBeLessThanOrEqual(1);
        });
        it("should maintain precision for conversion round trips", () => {
            const originalDegrees = 45;
            const radians = Trigonometric.degreesToRadians(originalDegrees);
            const backToDegrees = Trigonometric.radiansToDegrees(radians);
            expect(backToDegrees).toBeCloseTo(originalDegrees);
        });
        it("should maintain precision for inverse function pairs", () => {
            const value = 0.5;
            // sin and arcsin
            const sinResult = Trigonometric.sin(Trigonometric.arcsin(value));
            expect(sinResult).toBeCloseTo(value);
            // cos and arccos
            const cosResult = Trigonometric.cos(Trigonometric.arccos(value));
            expect(cosResult).toBeCloseTo(value);
            // tan and arctan
            const tanResult = Trigonometric.tan(Trigonometric.arctan(value));
            expect(tanResult).toBeCloseTo(value);
        });
        it("should handle Infinity", () => {
            expect(Trigonometric.arctan(Infinity)).toBeCloseTo(Math.PI / 2);
            expect(Trigonometric.arctan(-Infinity)).toBeCloseTo(-Math.PI / 2);
            expect(Trigonometric.radiansToDegrees(Infinity)).toBe(Infinity);
            expect(Trigonometric.degreesToRadians(Infinity)).toBe(Infinity);
        });
    });
});
