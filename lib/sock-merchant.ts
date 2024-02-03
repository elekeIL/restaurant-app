function sockMerchant(n: number, ar: number[]): number {
    if (n < 1 || n > 100) {
        throw new Error("Number of socks must be between 1 and 100 (inclusive).");
    }

    if (ar.some(color => color < 1 || color > 100)) {
        throw new Error("Sock colors must be between 1 and 100 (inclusive).");
    }

    const sockCount: { [key: number]: number } = {};

    for (const sock of ar) {
        if (sockCount[sock]) {
            sockCount[sock]++;
        } else {
            sockCount[sock] = 1;
        }
    }

    let pairCount = 0;
    for (const count of Object.values(sockCount)) {
        pairCount += Math.floor(count / 2);
    }

    return pairCount;
}

const n: number = 9;
const ar: number[] = [10, 20, 20, 10, 10, 30, 50, 10, 20];
const result: number = sockMerchant(n, ar);
console.log(result);
