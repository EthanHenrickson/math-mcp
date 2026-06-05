import { describe, it, expect } from "vitest";
import { Utilities } from "../Utilities.js";

describe("Utilities", () => {
  it("clamp stays within [min, max]", () => {
    for (let i = 0; i < 10; i++) {
      const r = Utilities.clamp(Math.random() * 200 - 100, -50, 50);
      expect(r).toBeGreaterThanOrEqual(-50);
      expect(r).toBeLessThanOrEqual(50);
    }
  });
  it("lerp: t=0 → a, t=1 → b, t=0.5 → midpoint", () => {
    expect(Utilities.lerp(10, 20, 0)).toBe(10);
    expect(Utilities.lerp(10, 20, 1)).toBe(20);
    expect(Utilities.lerp(10, 20, 0.5)).toBe(15);
  });
  it("mapRange linearity", () => {
    expect(Utilities.mapRange(50, 0, 100, 0, 1000)).toBe(500);
    expect(Utilities.mapRange(0, 0, 100, 100, 0)).toBe(100);
  });
  it("percentageOf: part=whole → 100, part=0 → 0", () => {
    expect(Utilities.percentageOf(50, 50)).toBe(100);
    expect(Utilities.percentageOf(0, 50)).toBe(0);
  });
  it("percentageChange: double → +100%, half → -50%", () => {
    expect(Utilities.percentageChange(50, 100)).toBe(100);
    expect(Utilities.percentageChange(100, 50)).toBe(-50);
  });
  it("randomInt stays in [min, max] and is integer", () => {
    for (let i = 0; i < 50; i++) {
      const r = Utilities.randomInt(1, 6);
      expect(r).toBeGreaterThanOrEqual(1);
      expect(r).toBeLessThanOrEqual(6);
      expect(Number.isInteger(r)).toBe(true);
    }
  });
  it("sign: positive → 1, negative → -1, zero → 0", () => {
    expect(Utilities.sign(42)).toBe(1);
    expect(Utilities.sign(-42)).toBe(-1);
    expect(Utilities.sign(0)).toBe(0);
  });
  it("baseConvert round trip", () => {
    expect(Utilities.baseConvert("FF", 16, 10)).toBe("255");
    expect(Utilities.baseConvert("255", 10, 16)).toBe("FF");
  });
  it("fractionSimplify: value preserved, gcd(n,d)=1", () => {
    for (let i = 0; i < 10; i++) {
      const n = Math.floor(Math.random() * 1000) + 1;
      const d = Math.floor(Math.random() * 1000) + 1;
      const r = Utilities.fractionSimplify(n, d);
      expect(r.numerator / r.denominator).toBeCloseTo(n / d, 12);
    }
  });
  it("isBetween boundary", () => {
    expect(Utilities.isBetween(5, 1, 10)).toBe(true);
    expect(Utilities.isBetween(10, 1, 10)).toBe(true);
    expect(Utilities.isBetween(15, 1, 10)).toBe(false);
  });
});
