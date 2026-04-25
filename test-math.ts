import { calcSIP, calcSWP } from "./lib/calculations";

console.log("--- MATH AUDIT START ---");

// Test SIP
const sip = calcSIP({ monthlyAmount: 10000, annualRate: 12, years: 1, annualStepUp: 0 });
console.log("SIP Year 1 Maturity (₹10k/mo @ 12%):", sip.maturityCorpus);
// Expected: (10k * 1.01) + (10k * 1.01^2) ... 
// Should be ~1.28L (Industry standard)

// Test SWP (Conservative)
const swp = calcSWP({ corpus: 100000, monthlyWithdrawal: 10000, annualRate: 12, annualStepUp: 0 });
console.log("SWP Year 1 Result (Start ₹1L, Withdraw ₹10k/mo @ 12%):");
console.log("Total Withdrawn:", swp.totalWithdrawn);
console.log("Remaining Corpus:", swp.remainingCorpus);
// Month 1: (100k - 10k) * 1.01 = 90,900
// Month 2: (90,900 - 10k) * 1.01 = 81,709
// If it was optimistic: 91,000, 81,910 etc.

console.log("--- MATH AUDIT END ---");
