import { calcSWP } from "./lib/calculations";

console.log("--- BUG FIX VERIFICATION ---");

// Test 1: Break-even is perpetual
const res1 = calcSWP({ corpus: 1200000, monthlyWithdrawal: 12000, annualRate: 12, annualStepUp: 0 });
console.log("Test 1 (Perpetual): corpusLasts =", res1.corpusLasts, " (Expected: null)");
console.log("Test 1 (Perpetual): final corpus =", res1.remainingCorpus, " (Expected: ~1200000)");

// Test 2: Zero-rate exact accounting
const res2 = calcSWP({ corpus: 300000, monthlyWithdrawal: 100000, annualRate: 0, annualStepUp: 0 });
console.log("Test 2 (Zero-rate): totalWithdrawn =", res2.totalWithdrawn, " (Expected: 300000)");
console.log("Test 2 (Zero-rate): corpusLasts =", res2.corpusLasts, " (Expected: 1)");

// Test 3: Near-break-even verdict
const res3 = calcSWP({ corpus: 5000000, monthlyWithdrawal: 41500, annualRate: 10, annualStepUp: 0 });
console.log("Test 3 (Sustainable): corpusLasts =", res3.corpusLasts, " (Expected: null)");

// Test 4: Depletion
const res4 = calcSWP({ corpus: 500000, monthlyWithdrawal: 60000, annualRate: 6, annualStepUp: 0 });
console.log("Test 4 (Depletion): corpusLasts =", res4.corpusLasts, " (Expected: a number)");
