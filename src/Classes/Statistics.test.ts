import { describe, it, expect } from 'vitest'

import { Statistics } from './Statistics.js';

describe("Statistics", () => {
    describe("mean()", () => {
        it("should calculate the mean of positive numbers", () => {
            const result = Statistics.mean([1, 2, 3, 4, 5]);
            expect(result).toBe(3)
        });

        it("should calculate the mean of negative numbers", () => {
            const result = Statistics.mean([-1, -2, -3, -4, -5]);
            expect(result).toBe(-3);
        });

        it("should calculate the mean of mixed positive and negative numbers", () => {
            const result = Statistics.mean([-2, -1, 0, 1, 2]);
            expect(result).toBe(0);
        });

        it("should calculate the mean of decimal numbers", () => {
            const result = Statistics.mean([1.5, 2.5, 3.5]);
            expect(result).toBe(2.5);
        });

        it("should calculate the mean of a single number", () => {
            const result = Statistics.mean([42]);
            expect(result).toBe(42);
        });

        it("should handle duplicate numbers", () => {
            const result = Statistics.mean([5, 5, 5, 5]);
            expect(result).toBe(5);
        });
    });

    describe("median()", () => {
        it("should calculate the median of odd-length array", () => {
            const result = Statistics.median([3, 1, 4, 1, 5]);
            expect(result).toBe(3);
        });

        it("should calculate the median of even-length array", () => {
            const result = Statistics.median([1, 2, 3, 4]);
            expect(result).toBe(2.5);
        });

        it("should calculate the median of unsorted array", () => {
            const result = Statistics.median([5, 2, 8, 1, 9]);
            expect(result).toBe(5);
        });

        it("should calculate the median of negative numbers", () => {
            const result = Statistics.median([-5, -2, -8, -1, -9]);
            expect(result).toBe(-5);
        });

        it("should calculate the median of a single number", () => {
            const result = Statistics.median([7]);
            expect(result).toBe(7);
        });

        it("should calculate the median of two numbers", () => {
            const result = Statistics.median([10, 20]);
            expect(result).toBe(15);
        });

        it("should handle duplicate numbers", () => {
            const result = Statistics.median([3, 3, 3, 3, 3]);
            expect(result).toBe(3);
        });

        it("should calculate the median of decimal numbers", () => {
            const result = Statistics.median([1.1, 2.2, 3.3]);
            expect(result).toBe(2.2);
        });
    });

    describe("mode()", () => {
        it("should find the mode of numbers with single mode", () => {
            const result = Statistics.mode([1, 2, 2, 3, 4]);
            expect(result.modeResult).toEqual([2]);
            expect(result.maxFrequency).toBe(2);
        });

        it("should find multiple modes", () => {
            const result = Statistics.mode([1, 1, 2, 2, 3]);
            expect(result.modeResult.sort()).toEqual([1, 2]);
            expect(result.maxFrequency).toBe(2);
        });

        it("should handle all numbers appearing once", () => {
            const result = Statistics.mode([1, 2, 3, 4, 5]);
            expect(result.modeResult.sort()).toEqual([1, 2, 3, 4, 5]);
            expect(result.maxFrequency).toBe(1);
        });

        it("should handle single number", () => {
            const result = Statistics.mode([42]);
            expect(result.modeResult).toEqual([42]);
            expect(result.maxFrequency).toBe(1);
        });

        it("should handle all same numbers", () => {
            const result = Statistics.mode([5, 5, 5, 5]);
            expect(result.modeResult).toEqual([5]);
            expect(result.maxFrequency).toBe(4);
        });

        it("should handle negative numbers", () => {
            const result = Statistics.mode([-1, -1, -2, -3]);
            expect(result.modeResult).toEqual([-1]);
            expect(result.maxFrequency).toBe(2);
        });

        it("should handle decimal numbers", () => {
            const result = Statistics.mode([1.5, 1.5, 2.5, 3.5]);
            expect(result.modeResult).toEqual([1.5]);
            expect(result.maxFrequency).toBe(2);
        });
    });

    describe("min()", () => {
        it("should find the minimum of positive numbers", () => {
            const result = Statistics.min([3, 1, 4, 1, 5]);
            expect(result).toBe(1);
        });

        it("should find the minimum of negative numbers", () => {
            const result = Statistics.min([-3, -1, -4, -1, -5]);
            expect(result).toBe(-5);
        });

        it("should find the minimum of mixed positive and negative numbers", () => {
            const result = Statistics.min([-2, 5, -10, 3, 0]);
            expect(result).toBe(-10);
        });

        it("should find the minimum of decimal numbers", () => {
            const result = Statistics.min([1.5, 0.5, 2.5, 1.2]);
            expect(result).toBe(0.5);
        });

        it("should handle single number", () => {
            const result = Statistics.min([42]);
            expect(result).toBe(42);
        });

        it("should handle duplicate numbers", () => {
            const result = Statistics.min([5, 5, 5, 5]);
            expect(result).toBe(5);
        });

        it("should handle zero", () => {
            const result = Statistics.min([0, 1, 2, 3]);
            expect(result).toBe(0);
        });
    });

    describe("max()", () => {
        it("should find the maximum of positive numbers", () => {
            const result = Statistics.max([3, 1, 4, 1, 5]);
            expect(result).toBe(5);
        });

        it("should find the maximum of negative numbers", () => {
            const result = Statistics.max([-3, -1, -4, -1, -5]);
            expect(result).toBe(-1);
        });

        it("should find the maximum of mixed positive and negative numbers", () => {
            const result = Statistics.max([-2, 5, -10, 3, 0]);
            expect(result).toBe(5);
        });

        it("should find the maximum of decimal numbers", () => {
            const result = Statistics.max([1.5, 0.5, 2.5, 1.2]);
            expect(result).toBe(2.5);
        });

        it("should handle single number", () => {
            const result = Statistics.max([42]);
            expect(result).toBe(42);
        });

        it("should handle duplicate numbers", () => {
            const result = Statistics.max([5, 5, 5, 5]);
            expect(result).toBe(5);
        });

        it("should handle zero", () => {
            const result = Statistics.max([0, -1, -2, -3]);
            expect(result).toBe(0);
        });
    });

    describe("Edge cases", () => {
        it("should handle empty array for median", () => {
            const result = Statistics.median([]);
            expect(isNaN(result)).toBeTruthy();
        });

        it("should handle empty array for mode", () => {
            const result = Statistics.mode([]);
            expect(result.modeResult).toEqual([]);
            expect(result.maxFrequency).toBe(0);
        });

        it("should handle empty array for min", () => {
            const result = Statistics.min([]);
            expect(result).toBe(Infinity);
        });

        it("should handle empty array for max", () => {
            const result = Statistics.max([]);
            expect(result).toBe(-Infinity);
        });

        it("should handle very large numbers", () => {
            const largeNumbers = [1e10, 2e10, 3e10];
            expect(Statistics.mean(largeNumbers)).toBe(2e10);
            expect(Statistics.median(largeNumbers)).toBe(2e10);
            expect(Statistics.min(largeNumbers)).toBe(1e10);
            expect(Statistics.max(largeNumbers)).toBe(3e10);
        });

        it("should handle very small numbers", () => {
            const smallNumbers = [1e-10, 2e-10, 3e-10];
            expect(Statistics.mean(smallNumbers)).toBe(2e-10);
            expect(Statistics.median(smallNumbers)).toBe(2e-10);
            expect(Statistics.min(smallNumbers)).toBe(1e-10);
            expect(Statistics.max(smallNumbers)).toBe(3e-10);
        });
    });
});
