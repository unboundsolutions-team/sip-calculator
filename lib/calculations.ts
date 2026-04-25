// ──────────────── Types ───────────────────────────────────────────────────

export interface SIPParams {
  monthlyAmount: number;
  annualRate: number;
  years: number;
  annualStepUp: number; // percent
  initialLumpsum?: number; // New
  inflationRate?: number; // New (percent)
}

export interface SWPParams {
  corpus: number;
  monthlyWithdrawal: number;
  annualRate: number;
  annualStepUp: number; // percent
  inflationRate?: number; // New (percent)
}

export interface SIPResult {
  totalInvested: number;
  totalReturns: number;
  maturityCorpus: number;
  maturityCorpusInflationAdjusted: number; // New
  postTaxCorpus: number; // New
  wealthMultiple: number;
  yearlyData: YearlyDataPoint[];
}

export interface SWPResult {
  totalWithdrawn: number;
  corpusLasts: number | null; // null = sustainable (did not deplete within 100 years)
  remainingCorpus: number;
  remainingCorpusInflationAdjusted: number; // New
  yearlyData: SWPYearlyPoint[];
}

export interface YearlyDataPoint {
  year: number;
  invested: number;
  returns: number;
  corpus: number;
}

export interface SWPYearlyPoint {
  year: number;
  withdrawn: number;
  totalWithdrawn: number;
  corpus: number;
}

export interface PlanResult {
  builtCorpus: number;
  swpResult: SWPResult;
  sipYearlyData: YearlyDataPoint[];
}

// ──────────────── Formatters ───────────────────────────────────────────────────

export function formatINR(n: number): string {
  const abs = Math.round(Math.abs(n));
  const sign = n < 0 ? "-" : "";
  if (abs >= 10_000_000) return sign + "₹" + (abs / 10_000_000).toFixed(2) + " Cr";
  if (abs >= 100_000) return sign + "₹" + (abs / 100_000).toFixed(2) + " L";
  if (abs >= 1_000) return sign + "₹" + (abs / 1_000).toFixed(1) + "K";
  return sign + "₹" + abs.toLocaleString("en-IN");
}

export function formatINRShort(n: number): string {
  const abs = Math.round(Math.abs(n));
  const sign = n < 0 ? "-" : "";
  if (abs >= 10_000_000) return sign + "₹" + (abs / 10_000_000).toFixed(1) + "Cr";
  if (abs >= 100_000) return sign + "₹" + (abs / 100_000).toFixed(1) + "L";
  if (abs >= 1_000) return sign + "₹" + (abs / 1_000).toFixed(1) + "K";
  return sign + "₹" + abs;
}

export function formatPct(n: number, decimals = 1): string {
  return n.toFixed(decimals) + "%";
}

// ──────────────── SIP Calculator ───────────────────────────────────────────

export function calcSIP(params: SIPParams): SIPResult {
  const { annualRate, years, annualStepUp, initialLumpsum = 0, inflationRate = 0 } = params;
  const r = annualRate / 100 / 12;
  const yearlyData: YearlyDataPoint[] = [];

  let corpus = initialLumpsum;
  let totalInvested = initialLumpsum;
  let monthlyAmount = params.monthlyAmount;

  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      // Compounding the current corpus and adding the new monthly investment
      corpus = (corpus + monthlyAmount) * (1 + r);
      totalInvested += monthlyAmount;
    }
    if (annualStepUp > 0) monthlyAmount *= 1 + annualStepUp / 100;

    yearlyData.push({
      year: y,
      invested: Math.round(totalInvested),
      returns: Math.round(corpus - totalInvested),
      corpus: Math.round(corpus),
    });
  }

  const totalReturns = corpus - totalInvested;
  const wealthMultiple = totalInvested > 0 ? corpus / totalInvested : 0;
  
  // Inflation adjustment: FV / (1 + i)^n
  const maturityCorpusInflationAdjusted = corpus / Math.pow(1 + inflationRate / 100, years);
  
  // Tax estimation (India LTCG: 12.5% on gains above 1.25L - simplified here for tool)
  const taxableGains = Math.max(0, totalReturns - 125000);
  const estimatedTax = taxableGains * 0.125;
  const postTaxCorpus = corpus - estimatedTax;

  return {
    totalInvested: Math.round(totalInvested),
    totalReturns: Math.round(totalReturns),
    maturityCorpus: Math.round(corpus),
    maturityCorpusInflationAdjusted: Math.round(maturityCorpusInflationAdjusted),
    postTaxCorpus: Math.round(postTaxCorpus),
    wealthMultiple,
    yearlyData,
  };
}

// ──────────────── SWP Calculator ───────────────────────────────────────────

export function calcSWP(params: SWPParams): SWPResult {
  const { corpus: initialCorpus, annualRate, annualStepUp, inflationRate = 0 } = params;
  const r = annualRate / 100 / 12;
  const MAX_YEARS = 100;
  const yearlyData: SWPYearlyPoint[] = [];

  let corpus = initialCorpus;
  let totalWithdrawn = 0;
  let monthlyWithdrawal = params.monthlyWithdrawal;
  let corpusLasts: number | null = null;

  for (let y = 1; y <= MAX_YEARS; y++) {
    let yearWithdrawn = 0;
    let depleted = false;

    for (let m = 0; m < 12; m++) {
      const actualWithdrawal = Math.min(monthlyWithdrawal, Math.max(0, corpus * (1 + r)));
      corpus = corpus * (1 + r) - actualWithdrawal;
      totalWithdrawn += actualWithdrawal;
      yearWithdrawn += actualWithdrawal;
      if (corpus <= 0 && corpusLasts === null) {
        corpusLasts = y;
        corpus = 0;
        depleted = true;
        break;
      }
    }

    if (annualStepUp > 0) monthlyWithdrawal *= 1 + annualStepUp / 100;

    yearlyData.push({
      year: y,
      withdrawn: Math.round(yearWithdrawn),
      totalWithdrawn: Math.round(totalWithdrawn),
      corpus: Math.round(Math.max(0, corpus)),
    });

    if (depleted) break;
  }

  const remainingCorpusInflationAdjusted = corpus / Math.pow(1 + inflationRate / 100, yearlyData.length);

  return {
    totalWithdrawn: Math.round(totalWithdrawn),
    corpusLasts,
    remainingCorpus: Math.round(Math.max(0, corpus)),
    remainingCorpusInflationAdjusted: Math.round(remainingCorpusInflationAdjusted),
    yearlyData,
  };
}

// ──────────────── Combined Plan ────────────────────────────────────────────

export function calcPlan(
  sipParams: SIPParams,
  swpParams: Omit<SWPParams, "corpus">
): PlanResult {
  const sipResult = calcSIP(sipParams);
  const swpResult = calcSWP({
    ...swpParams,
    corpus: sipResult.maturityCorpus,
  });

  return {
    builtCorpus: sipResult.maturityCorpus,
    swpResult,
    sipYearlyData: sipResult.yearlyData,
  };
}
