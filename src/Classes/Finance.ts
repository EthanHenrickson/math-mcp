export class Finance {
    static compoundInterest(principal: number, rate: number, time: number, n: number = 1): number {
        return principal * (1 + rate / n) ** (n * time);
    }

    static presentValue(futureValue: number, rate: number, time: number, n: number = 1): number {
        return futureValue / (1 + rate / n) ** (n * time);
    }
}
