export class LinearAlgebra {
    static matrixMultiply(a: number[][], b: number[][]): number[][] {
        if (a.length === 0 || b.length === 0) return [];
        if (a[0].length !== b.length) return [];
        const result: number[][] = [];
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < b[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < a[0].length; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    static determinant(matrix: number[][]): number {
        const n = matrix.length;
        if (n === 0) return NaN;
        if (matrix.some(row => row.length !== n)) return NaN;
        if (n === 1) return matrix[0][0];
        if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        let det = 0;
        for (let j = 0; j < n; j++) {
            const submatrix = matrix.slice(1).map(row => [...row.slice(0, j), ...row.slice(j + 1)]);
            det += (j % 2 === 0 ? 1 : -1) * matrix[0][j] * LinearAlgebra.determinant(submatrix);
        }
        return det;
    }

    static transpose(matrix: number[][]): number[][] {
        if (matrix.length === 0) return [];
        return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    }

    static dotProduct(a: number[], b: number[]): number {
        if (a.length !== b.length) return NaN;
        return a.reduce((sum, val, i) => sum + val * b[i], 0);
    }

    static crossProduct(a: number[], b: number[]): number[] {
        if (a.length !== 3 || b.length !== 3) return [];
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]
        ];
    }

    static vectorMagnitude(v: number[]): number {
        if (v.length === 0) return NaN;
        return Math.sqrt(v.reduce((sum, val) => sum + val * val, 0));
    }

    static vectorNormalize(v: number[]): number[] {
        const mag = LinearAlgebra.vectorMagnitude(v);
        if (mag === 0 || Number.isNaN(mag)) return [];
        return v.map(val => val / mag);
    }
}
