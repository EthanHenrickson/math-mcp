import type { ModeResult, QuartileResult } from '../types.js';

export class Statistics {
    static mean(numbers: number[]): number {
        const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return sum / numbers.length;
    }

    static median(numbers: number[]): number {
        if (numbers.length === 0) return NaN;
        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = sorted.length / 2;
        if (sorted.length % 2 !== 0) {
            return sorted[Math.floor(mid)];
        } else {
            return (sorted[mid] + sorted[mid - 1]) / 2;
        }
    }

    static mode(numbers: number[]): ModeResult {
        const modeMap = new Map<number, number>();

        numbers.forEach((value) => {
            if (modeMap.has(value)) {
                modeMap.set(value, modeMap.get(value)! + 1);
            } else {
                modeMap.set(value, 1);
            }
        });

        let maxFrequency = 0;
        for (const numberFrequency of modeMap.values()) {
            if (numberFrequency > maxFrequency) {
                maxFrequency = numberFrequency;
            }
        }

        const modes: number[] = [];
        for (const [key, value] of modeMap.entries()) {
            if (value === maxFrequency) {
                modes.push(key);
            }
        }

        return {
            modes,
            maxFrequency
        };
    }

    static min(numbers: number[]): number {
        return Math.min(...numbers);
    }

    static max(numbers: number[]): number {
        return Math.max(...numbers);
    }

    static varianceSample(numbers: number[]): number {
        if (numbers.length < 2) return NaN;
        const mean = Statistics.mean(numbers);
        const sumSquaredDiffs = numbers.reduce((acc, val) => acc + (val - mean) ** 2, 0);
        return sumSquaredDiffs / (numbers.length - 1);
    }

    static variancePopulation(numbers: number[]): number {
        if (numbers.length < 1) return NaN;
        const mean = Statistics.mean(numbers);
        const sumSquaredDiffs = numbers.reduce((acc, val) => acc + (val - mean) ** 2, 0);
        return sumSquaredDiffs / numbers.length;
    }

    static standardDeviationSample(numbers: number[]): number {
        return Math.sqrt(Statistics.varianceSample(numbers));
    }

    static standardDeviationPopulation(numbers: number[]): number {
        return Math.sqrt(Statistics.variancePopulation(numbers));
    }

    static quartiles(numbers: number[]): QuartileResult {
        if (numbers.length === 0) return { q1: NaN, q2: NaN, q3: NaN };
        if (numbers.length === 1) {
            const v = numbers[0];
            return { q1: v, q2: v, q3: v };
        }
        const sorted = [...numbers].sort((a, b) => a - b);
        const n = sorted.length;

        const lowerHalf = sorted.slice(0, Math.floor(n / 2));
        const upperHalf = sorted.slice(Math.ceil(n / 2));

        return {
            q1: Statistics.median(lowerHalf),
            q2: Statistics.median(sorted),
            q3: Statistics.median(upperHalf)
        };
    }

    static percentile(numbers: number[], percentile: number): number {
        const sorted = [...numbers].sort((a, b) => a - b);
        const index = (percentile / 100) * (sorted.length - 1);
        const lower = Math.floor(index);
        const upper = Math.ceil(index);
        if (lower === upper) return sorted[lower];
        return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
    }

    static range(numbers: number[]): number {
        if (numbers.length === 0) return NaN;
        return Math.max(...numbers) - Math.min(...numbers);
    }

    static interquartileRange(numbers: number[]): number {
        const { q1, q3 } = Statistics.quartiles(numbers);
        return q3 - q1;
    }

    static geometricMean(numbers: number[]): number {
        if (numbers.length === 0) return NaN;
        if (numbers.some(v => v < 0)) return NaN;
        if (numbers.some(v => v === 0)) return 0;
        const product = numbers.reduce((acc, val) => acc * val, 1);
        return product ** (1 / numbers.length);
    }

    static harmonicMean(numbers: number[]): number {
        if (numbers.length === 0) return NaN;
        if (numbers.some(v => v === 0)) return NaN;
        const reciprocalSum = numbers.reduce((acc, val) => acc + 1 / val, 0);
        return numbers.length / reciprocalSum;
    }

    static covariance(x: number[], y: number[]): number {
        if (x.length !== y.length || x.length < 2) return NaN;
        const meanX = Statistics.mean(x);
        const meanY = Statistics.mean(y);
        const sum = x.reduce((acc, xi, i) => acc + (xi - meanX) * (y[i] - meanY), 0);
        return sum / (x.length - 1);
    }

    static correlation(x: number[], y: number[]): number {
        const cov = Statistics.covariance(x, y);
        if (Number.isNaN(cov)) return NaN;
        const stdX = Statistics.standardDeviationSample(x);
        const stdY = Statistics.standardDeviationSample(y);
        if (stdX === 0 || stdY === 0) return NaN;
        return cov / (stdX * stdY);
    }

    static skewness(numbers: number[]): number {
        if (numbers.length < 3) return NaN;
        const mean = Statistics.mean(numbers);
        const n = numbers.length;
        const variance = numbers.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
        if (variance === 0) return NaN;
        const m3 = numbers.reduce((acc, val) => acc + (val - mean) ** 3, 0) / n;
        return m3 / (variance ** 1.5);
    }

    static kurtosis(numbers: number[]): number {
        if (numbers.length < 4) return NaN;
        const mean = Statistics.mean(numbers);
        const n = numbers.length;
        const variance = numbers.reduce((acc, val) => acc + (val - mean) ** 2, 0) / n;
        if (variance === 0) return NaN;
        const m4 = numbers.reduce((acc, val) => acc + (val - mean) ** 4, 0) / n;
        return m4 / (variance ** 2) - 3;
    }

    static weightedMean(values: number[], weights: number[]): number {
        if (values.length !== weights.length || values.length === 0) return NaN;
        const weightSum = weights.reduce((a, b) => a + b, 0);
        if (weightSum === 0) return NaN;
        return values.reduce((acc, val, i) => acc + val * weights[i], 0) / weightSum;
    }

    static zScore(value: number, numbers: number[]): number {
        if (numbers.length < 2) return NaN;
        const mean = Statistics.mean(numbers);
        const std = Statistics.standardDeviationSample(numbers);
        if (std === 0) return NaN;
        return (value - mean) / std;
    }

    static movingAverage(numbers: number[], window: number): number[] {
        if (numbers.length === 0 || window <= 0 || !Number.isInteger(window)) return [];
        if (window > numbers.length) return [];
        const result: number[] = [];
        for (let i = 0; i <= numbers.length - window; i++) {
            const sum = numbers.slice(i, i + window).reduce((a, b) => a + b, 0);
            result.push(sum / window);
        }
        return result;
    }

    static standardError(numbers: number[]): number {
        if (numbers.length < 2) return NaN;
        return Statistics.standardDeviationSample(numbers) / Math.sqrt(numbers.length);
    }
}
