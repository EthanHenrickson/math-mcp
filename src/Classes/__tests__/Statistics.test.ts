import { describe, it, expect } from "vitest";
import { Statistics } from "../Statistics.js";

describe("Statistics", () => {
  const data = [1, 2, 3, 4, 5];
  it("mean", () => expect(Statistics.mean(data)).toBe(3));
  it("median (even length)", () => expect(Statistics.median([1, 2, 3, 4])).toBe(2.5));
  it("mode: highest frequency", () => {
    const r = Statistics.mode([1, 1, 2, 3, 3, 3]);
    expect(r.modes).toEqual([3]);
    expect(r.maxFrequency).toBe(3);
  });
  it("std = √variance", () => {
    for (let i = 0; i < 10; i++) {
      const arr = Array.from({ length: 10 }, () => Math.random() * 100);
      expect(Statistics.standardDeviationSample(arr)).toBeCloseTo(Math.sqrt(Statistics.varianceSample(arr)), 10);
    }
  });
  it("z-scores have mean 0 and sd 1", () => {
    const n = Math.floor(Math.random() * 10) + 5;
    const arr = Array.from({ length: n }, () => Math.random() * 100);
    const zs = arr.map(v => Statistics.zScore(v, arr));
    expect(Statistics.mean(zs)).toBeCloseTo(0, 10);
    if (Statistics.varianceSample(arr) > 0) {
      expect(Statistics.standardDeviationSample(zs)).toBeCloseTo(1, 8);
    }
  });
  it("correlation with itself = 1", () => {
    for (let i = 0; i < 5; i++) {
      const arr = Array.from({ length: 8 }, () => Math.random() * 100);
      expect(Statistics.correlation(arr, arr)).toBeCloseTo(1, 10);
    }
  });
  it("min <= mean <= max", () => {
    for (let i = 0; i < 10; i++) {
      const arr = Array.from({ length: 10 }, () => Math.random() * 100);
      const mn = Statistics.min(arr);
      const mx = Statistics.max(arr);
      const m = Statistics.mean(arr);
      expect(mn <= m && m <= mx).toBe(true);
    }
  });
  it("empty/single returns NaN for variance", () => {
    expect(Statistics.varianceSample([])).toBe(NaN);
    expect(Statistics.varianceSample([1])).toBe(NaN);
  });
  it("movingAverage window=1 equals original", () => {
    expect(Statistics.movingAverage([3, 7, 2, 9], 1)).toEqual([3, 7, 2, 9]);
  });
  it("skewness of symmetric data ≈ 0", () => {
    expect(Statistics.skewness([1, 2, 3, 4, 5, 6, 7, 8, 9])).toBeCloseTo(0, 1);
  });
});
