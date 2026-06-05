import { describe, it, expect } from "vitest";
import { Finance } from "../Finance.js";

describe("Finance", () => {
  it("monthly compounding", () => {
    expect(Finance.compoundInterest(1000, 0.05, 10, 12)).toBeCloseTo(1647.01, 1);
  });
  it("annual compounding", () => {
    expect(Finance.compoundInterest(1000, 0.10, 5)).toBeCloseTo(1610.51, 1);
  });
  it("zero rate → principal", () => {
    expect(Finance.compoundInterest(500, 0, 10)).toBe(500);
  });
  it("zero time → principal", () => {
    expect(Finance.compoundInterest(500, 0.05, 0)).toBe(500);
  });
  it("presentValue: FV then PV round-trip", () => {
    for (let i = 0; i < 10; i++) {
      const p = Math.random() * 10000 + 100;
      const r = Math.random() * 0.2;
      const t = Math.floor(Math.random() * 30) + 1;
      const n = [1, 4, 12, 365][Math.floor(Math.random() * 4)];
      expect(Finance.presentValue(Finance.compoundInterest(p, r, t, n), r, t, n)).toBeCloseTo(p, 6);
    }
  });
  it("daily compounding approaches e", () => {
    expect(Finance.compoundInterest(1, 1, 1, 365)).toBeCloseTo(Math.E, 0);
  });
  it("presentValue: zero rate → future value", () => {
    expect(Finance.presentValue(500, 0, 10)).toBe(500);
  });
});
