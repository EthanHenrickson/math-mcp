import { describe, it, expect } from 'vitest';
import { Arithmetic } from './Arithmetic.js';
describe("Arithmetic", () => {
    describe("add()", () => {
        it("should add two positive numbers", () => {
            const result = Arithmetic.add(5, 3);
            expect(result).toBe(8);
        });
        it("should add two negative numbers", () => {
            const result = Arithmetic.add(-5, -3);
            expect(result).toBe(-8);
        });
        it("should add positive and negative numbers", () => {
            const result = Arithmetic.add(5, -3);
            expect(result).toBe(2);
        });
        it("should add decimal numbers", () => {
            const result = Arithmetic.add(1.5, 2.3);
            expect(result).toBeCloseTo(3.8);
        });
        it("should add zero to a number", () => {
            const result = Arithmetic.add(5, 0);
            expect(result).toBe(5);
        });
        it("should handle very large numbers", () => {
            const result = Arithmetic.add(1e10, 2e10);
            expect(result).toBe(3e10);
        });
    });
    describe("subtract()", () => {
        it("should subtract two positive numbers", () => {
            const result = Arithmetic.subtract(8, 3);
            expect(result).toBe(5);
        });
        it("should subtract two negative numbers", () => {
            const result = Arithmetic.subtract(-5, -3);
            expect(result).toBe(-2);
        });
        it("should subtract negative from positive", () => {
            const result = Arithmetic.subtract(5, -3);
            expect(result).toBe(8);
        });
        it("should subtract positive from negative", () => {
            const result = Arithmetic.subtract(-5, 3);
            expect(result).toBe(-8);
        });
        it("should subtract decimal numbers", () => {
            const result = Arithmetic.subtract(5.7, 2.3);
            expect(result).toBeCloseTo(3.4);
        });
        it("should subtract zero from a number", () => {
            const result = Arithmetic.subtract(5, 0);
            expect(result).toBe(5);
        });
        it("should subtract a number from zero", () => {
            const result = Arithmetic.subtract(0, 5);
            expect(result).toBe(-5);
        });
    });
    describe("multiply()", () => {
        it("should multiply two positive numbers", () => {
            const result = Arithmetic.multiply(4, 3);
            expect(result).toBe(12);
        });
        it("should multiply two negative numbers", () => {
            const result = Arithmetic.multiply(-4, -3);
            expect(result).toBe(12);
        });
        it("should multiply positive and negative numbers", () => {
            const result = Arithmetic.multiply(4, -3);
            expect(result).toBe(-12);
        });
        it("should multiply decimal numbers", () => {
            const result = Arithmetic.multiply(2.5, 4);
            expect(result).toBe(10);
        });
        it("should multiply by zero", () => {
            const result = Arithmetic.multiply(5, 0);
            expect(result).toBe(0);
        });
        it("should multiply by one", () => {
            const result = Arithmetic.multiply(5, 1);
            expect(result).toBe(5);
        });
    });
    describe("division()", () => {
        it("should divide two positive numbers", () => {
            const result = Arithmetic.division(12, 3);
            expect(result).toBe(4);
        });
        it("should divide two negative numbers", () => {
            const result = Arithmetic.division(-12, -3);
            expect(result).toBe(4);
        });
        it("should divide positive by negative", () => {
            const result = Arithmetic.division(12, -3);
            expect(result).toBe(-4);
        });
        it("should divide negative by positive", () => {
            const result = Arithmetic.division(-12, 3);
            expect(result).toBe(-4);
        });
        it("should divide decimal numbers", () => {
            const result = Arithmetic.division(7.5, 2.5);
            expect(result).toBe(3);
        });
        it("should divide by one", () => {
            const result = Arithmetic.division(5, 1);
            expect(result).toBe(5);
        });
        it("should handle division by zero", () => {
            const result = Arithmetic.division(5, 0);
            expect(result).toBe(Infinity);
        });
        it("should handle zero divided by number", () => {
            const result = Arithmetic.division(0, 5);
            expect(result).toBe(0);
        });
        it("should handle division resulting in decimal", () => {
            const result = Arithmetic.division(5, 2);
            expect(result).toBe(2.5);
        });
    });
    describe("sum()", () => {
        it("should calculate sum of positive numbers", () => {
            const result = Arithmetic.sum([1, 2, 3, 4, 5]);
            expect(result).toBe(15);
        });
        it("should calculate sum of negative numbers", () => {
            const result = Arithmetic.sum([-1, -2, -3, -4, -5]);
            expect(result).toBe(-15);
        });
        it("should calculate sum of mixed positive and negative numbers", () => {
            const result = Arithmetic.sum([-2, -1, 0, 1, 2]);
            expect(result).toBe(0);
        });
        it("should calculate sum of decimal numbers", () => {
            const result = Arithmetic.sum([1.5, 2.5, 3.5]);
            expect(result).toBe(7.5);
        });
        it("should calculate sum of single number", () => {
            const result = Arithmetic.sum([42]);
            expect(result).toBe(42);
        });
        it("should handle empty array", () => {
            const result = Arithmetic.sum([]);
            expect(result).toBe(0);
        });
        it("should handle array with zeros", () => {
            const result = Arithmetic.sum([0, 0, 0]);
            expect(result).toBe(0);
        });
        it("should handle duplicate numbers", () => {
            const result = Arithmetic.sum([5, 5, 5, 5]);
            expect(result).toBe(20);
        });
        it("should handle very large numbers", () => {
            const result = Arithmetic.sum([1e10, 2e10, 3e10]);
            expect(result).toBe(6e10);
        });
    });
    describe("floor()", () => {
        it("should floor positive decimal number", () => {
            const result = Arithmetic.floor(4.7);
            expect(result).toBe(4);
        });
        it("should floor negative decimal number", () => {
            const result = Arithmetic.floor(-4.7);
            expect(result).toBe(-5);
        });
        it("should floor positive integer", () => {
            const result = Arithmetic.floor(5);
            expect(result).toBe(5);
        });
        it("should floor negative integer", () => {
            const result = Arithmetic.floor(-5);
            expect(result).toBe(-5);
        });
        it("should floor zero", () => {
            const result = Arithmetic.floor(0);
            expect(result).toBe(0);
        });
        it("should floor number close to integer", () => {
            const result = Arithmetic.floor(4.999);
            expect(result).toBe(4);
        });
        it("should floor very small positive number", () => {
            const result = Arithmetic.floor(0.1);
            expect(result).toBe(0);
        });
        it("should floor very small negative number", () => {
            const result = Arithmetic.floor(-0.1);
            expect(result).toBe(-1);
        });
    });
    describe("ceil()", () => {
        it("should ceil positive decimal number", () => {
            const result = Arithmetic.ceil(4.3);
            expect(result).toBe(5);
        });
        it("should ceil negative decimal number", () => {
            const result = Arithmetic.ceil(-4.3);
            expect(result).toBe(-4);
        });
        it("should ceil positive integer", () => {
            const result = Arithmetic.ceil(5);
            expect(result).toBe(5);
        });
        it("should ceil negative integer", () => {
            const result = Arithmetic.ceil(-5);
            expect(result).toBe(-5);
        });
        it("should ceil zero", () => {
            const result = Arithmetic.ceil(0);
            expect(result).toBe(0);
        });
        it("should ceil number close to integer", () => {
            const result = Arithmetic.ceil(4.001);
            expect(result).toBe(5);
        });
        it("should ceil very small positive number", () => {
            const result = Arithmetic.ceil(0.1);
            expect(result).toBe(1);
        });
    });
    describe("round()", () => {
        it("should round positive decimal number up", () => {
            const result = Arithmetic.round(4.6);
            expect(result).toBe(5);
        });
        it("should round positive decimal number down", () => {
            const result = Arithmetic.round(4.4);
            expect(result).toBe(4);
        });
        it("should round negative decimal number up", () => {
            const result = Arithmetic.round(-4.4);
            expect(result).toBe(-4);
        });
        it("should round negative decimal number down", () => {
            const result = Arithmetic.round(-4.6);
            expect(result).toBe(-5);
        });
        it("should round positive integer", () => {
            const result = Arithmetic.round(5);
            expect(result).toBe(5);
        });
        it("should round negative integer", () => {
            const result = Arithmetic.round(-5);
            expect(result).toBe(-5);
        });
        it("should round zero", () => {
            const result = Arithmetic.round(0);
            expect(result).toBe(0);
        });
        it("should round 0.5 up", () => {
            const result = Arithmetic.round(4.5);
            expect(result).toBe(5);
        });
        it("should round -0.5 up (towards zero)", () => {
            const result = Arithmetic.round(-4.5);
            expect(result).toBe(-4);
        });
        it("should round very small positive number", () => {
            const result = Arithmetic.round(0.1);
            expect(result).toBe(0);
        });
    });
    describe("modulo()", () => {
        it("should calculate modulo of two positive numbers", () => {
            const result = Arithmetic.modulo(5, 2);
            expect(result).toBe(1);
        });
        it("should calculate modulo with zero remainder", () => {
            const result = Arithmetic.modulo(10, 5);
            expect(result).toBe(0);
        });
        it("should calculate modulo with larger denominator", () => {
            const result = Arithmetic.modulo(3, 5);
            expect(result).toBe(3);
        });
        it("should calculate modulo with negative numerator", () => {
            const result = Arithmetic.modulo(-7, 3);
            expect(result).toBe(-1);
        });
        it("should calculate modulo with negative denominator", () => {
            const result = Arithmetic.modulo(7, -3);
            expect(result).toBe(1);
        });
        it("should calculate modulo with both negative numbers", () => {
            const result = Arithmetic.modulo(-7, -3);
            expect(result).toBe(-1);
        });
        it("should calculate modulo with decimal numbers", () => {
            const result = Arithmetic.modulo(5.5, 2);
            expect(result).toBeCloseTo(1.5);
        });
        it("should calculate modulo with decimal denominator", () => {
            const result = Arithmetic.modulo(7, 2.5);
            expect(result).toBeCloseTo(2);
        });
        it("should calculate modulo with both decimal numbers", () => {
            const result = Arithmetic.modulo(7.5, 2.3);
            expect(result).toBeCloseTo(0.6);
        });
        it("should handle modulo with zero numerator", () => {
            const result = Arithmetic.modulo(0, 5);
            expect(result).toBe(0);
        });
        it("should handle modulo by one", () => {
            const result = Arithmetic.modulo(7, 1);
            expect(result).toBe(0);
        });
        it("should handle modulo by zero (returns NaN)", () => {
            const result = Arithmetic.modulo(5, 0);
            expect(isNaN(result)).toBeTruthy();
        });
        it("should handle same numbers", () => {
            const result = Arithmetic.modulo(5, 5);
            expect(result).toBe(0);
        });
        it("should handle large numbers", () => {
            const result = Arithmetic.modulo(1000000, 7);
            expect(result).toBe(1);
        });
        it("should handle very small decimal numbers", () => {
            const result = Arithmetic.modulo(0.1, 0.03);
            expect(result).toBeCloseTo(0.01);
        });
        it("should preserve sign of numerator for negative results", () => {
            const result = Arithmetic.modulo(-10, 3);
            expect(result).toBe(-1);
        });
    });
    describe("Edge cases", () => {
        it("should handle Infinity in addition", () => {
            const result = Arithmetic.add(Infinity, 5);
            expect(result).toBe(Infinity);
        });
        it("should handle -Infinity in subtraction", () => {
            const result = Arithmetic.subtract(-Infinity, 5);
            expect(result).toBe(-Infinity);
        });
        it("should handle Infinity in multiplication", () => {
            const result = Arithmetic.multiply(Infinity, 2);
            expect(result).toBe(Infinity);
        });
        it("should handle NaN in operations", () => {
            const result = Arithmetic.add(NaN, 5);
            expect(isNaN(result)).toBeTruthy();
        });
        it("should handle very large array in sum", () => {
            const largeArray = new Array(1000).fill(1);
            const result = Arithmetic.sum(largeArray);
            expect(result).toBe(1000);
        });
        it("should handle floating point precision in floor", () => {
            const result = Arithmetic.floor(0.1 + 0.2); // 0.30000000000000004
            expect(result).toBe(0);
        });
        it("should handle floating point precision in ceil", () => {
            const result = Arithmetic.ceil(0.1 + 0.2); // 0.30000000000000004
            expect(result).toBe(1);
        });
        it("should handle floating point precision in round", () => {
            const result = Arithmetic.round(0.1 + 0.2); // 0.30000000000000004
            expect(result).toBe(0);
        });
    });
});
