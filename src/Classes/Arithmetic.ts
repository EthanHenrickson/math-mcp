export class Arithmetic {
    static add(firstNumber: number, secondNumber: number): number {
        return firstNumber + secondNumber;
    }

    static subtract(minuend: number, subtrahend: number): number {
        return minuend - subtrahend;
    }

    static multiply(firstNumber: number, secondNumber: number): number {
        return firstNumber * secondNumber;
    }

    static division(numerator: number, denominator: number): number {
        return numerator / denominator;
    }

    static sum(numbers: number[]): number {
        return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    }

    static floor(number: number): number {
        return Math.floor(number);
    }

    static ceil(number: number): number {
        return Math.ceil(number);
    }

    static round(number: number): number {
        return Math.round(number);
    }

    // js % is remainder not modulo, true modulo for negatives
    static modulo(numerator: number, denominator: number): number {
        return ((numerator % denominator) + denominator) % denominator;
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

    // js ** cant do negative base + fractional exponent, so negate, root, negate back for odd roots
    // n=0 causes division by zero (1/0 = Infinity) which returns NaN anyway
    static root(number: number, n: number): number {
        if (n === 0) return NaN;
        if (number < 0 && n % 2 !== 0) {
            return -((-number) ** (1 / n));
        }
        return number ** (1 / n);
    }

    static abs(number: number): number {
        return Math.abs(number);
    }

    // 170! is the last factorial before double precision overflows
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
