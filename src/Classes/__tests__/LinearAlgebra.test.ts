import { describe, it, expect } from "vitest";
import { LinearAlgebra } from "../LinearAlgebra.js";

describe("LinearAlgebra", () => {
  it("I × A = A", () => {
    const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    const A = [[2, 3], [4, 5], [6, 7]];
    expect(LinearAlgebra.matrixMultiply(I, A)).toEqual(A);
  });
  it("det(I) = 1", () => {
    expect(LinearAlgebra.determinant([[1, 0], [0, 1]])).toBe(1);
    expect(LinearAlgebra.determinant([[1, 0, 0], [0, 1, 0], [0, 0, 1]])).toBe(1);
  });
  it("det(A × B) = det(A) × det(B)", () => {
    for (let i = 0; i < 10; i++) {
      const A = [[Math.random() * 10, Math.random() * 10], [Math.random() * 10, Math.random() * 10]];
      const B = [[Math.random() * 10, Math.random() * 10], [Math.random() * 10, Math.random() * 10]];
      const detA = LinearAlgebra.determinant(A);
      const detB = LinearAlgebra.determinant(B);
      expect(LinearAlgebra.determinant(LinearAlgebra.matrixMultiply(A, B))).toBeCloseTo(detA * detB, 8);
    }
  });
  it("det(Aᵀ) = det(A)", () => {
    for (let i = 0; i < 5; i++) {
      const A = [[Math.random() * 10, Math.random() * 10], [Math.random() * 10, Math.random() * 10]];
      expect(LinearAlgebra.determinant(LinearAlgebra.transpose(A))).toBeCloseTo(LinearAlgebra.determinant(A), 10);
    }
  });
  it("(Aᵀ)ᵀ = A", () => {
    for (let i = 0; i < 5; i++) {
      const A = Array.from({ length: 3 }, () => Array.from({ length: 4 }, () => Math.random() * 10));
      expect(LinearAlgebra.transpose(LinearAlgebra.transpose(A))).toEqual(A);
    }
  });
  it("a · b = b · a", () => {
    for (let i = 0; i < 10; i++) {
      const a = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, () => Math.random() * 10);
      const b = Array.from({ length: a.length }, () => Math.random() * 10);
      expect(LinearAlgebra.dotProduct(a, b)).toBeCloseTo(LinearAlgebra.dotProduct(b, a), 10);
    }
  });
  it("a × b = -(b × a)", () => {
    for (let i = 0; i < 10; i++) {
      const a = Array.from({ length: 3 }, () => Math.random() * 10);
      const b = Array.from({ length: 3 }, () => Math.random() * 10);
      const axb = LinearAlgebra.crossProduct(a, b);
      const bxa = LinearAlgebra.crossProduct(b, a);
      expect(axb[0]).toBeCloseTo(-bxa[0], 10);
      expect(axb[1]).toBeCloseTo(-bxa[1], 10);
      expect(axb[2]).toBeCloseTo(-bxa[2], 10);
    }
  });
  it("a × b ⟂ a and ⟂ b", () => {
    for (let i = 0; i < 5; i++) {
      const a = Array.from({ length: 3 }, () => Math.random() * 10);
      const b = Array.from({ length: 3 }, () => Math.random() * 10);
      const axb = LinearAlgebra.crossProduct(a, b);
      expect(LinearAlgebra.dotProduct(a, axb)).toBeCloseTo(0, 8);
      expect(LinearAlgebra.dotProduct(b, axb)).toBeCloseTo(0, 8);
    }
  });
  it("|normalized(v)| = 1", () => {
    for (let i = 0; i < 10; i++) {
      const v = Array.from({ length: Math.floor(Math.random() * 4) + 2 }, () => Math.random() * 10 - 5);
      const n = LinearAlgebra.vectorNormalize(v);
      if (n.length > 0) expect(LinearAlgebra.vectorMagnitude(n)).toBeCloseTo(1, 10);
    }
  });
  it("zero vector normalize returns []", () => {
    expect(LinearAlgebra.vectorNormalize([0, 0])).toEqual([]);
  });
});
