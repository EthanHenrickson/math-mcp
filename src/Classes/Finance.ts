export class Finance {
    // a = p(1 + r/n)^(nt), n->inf gives continuous: a = p * e^(rt)
    static compoundInterest(principal: number, rate: number, time: number, n: number = 1): number {
        return principal * (1 + rate / n) ** (n * time);
    }

    // reverse of compound interest, discounts future value to today
    static presentValue(futureValue: number, rate: number, time: number, n: number = 1): number {
        return futureValue / (1 + rate / n) ** (n * time);
    }
}
