export class Arithmetic {
    static add(firstNumber: number, secondNumber: number): number {
        return firstNumber + secondNumber;
    }

    static subtract(minuend: number, subtrahend: number) {
        return minuend - subtrahend;
    }

    static multiply(firstNumber: number, secondNumber: number) {
        return firstNumber * secondNumber;
    }

    static division(numerator: number, denominator: number) {
        return numerator / denominator;
    }

    static sum(numbers: number[]) {
        return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    static floor(number: number) {
        return Math.floor(number);
    }

    static ceil(number: number) {
        return Math.ceil(number);
    }

    static round(number: number) {
        return Math.round(number);
    }

    static modulo(numerator: number, denominator: number) {
        return numerator % denominator;
    }

    static power(base: number, exponent: number): number {
        return base ** exponent;
    }

    static sqrt(number: number): number {
        return Math.sqrt(number);
    }

    static cbrt(number: number): number {
        return Math.cbrt(number);
    }

    static root(number: number, n: number): number {
        if (number < 0 && n % 2 === 1) {
            return -((-number) ** (1 / n));
        }
        return number ** (1 / n);
    }

    static abs(number: number): number {
        return Math.abs(number);
    }

    static factorial(number: number): number {
        if (number < 0 || !Number.isInteger(number)) return NaN;
        if (number === 0 || number === 1) return 1;
        if (number > 170) return Infinity;
        let result = 1;
        for (let i = 2; i <= number; i++) {
            result *= i;
        }
        return result;
    }
}
