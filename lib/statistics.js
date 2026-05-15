/**
 * Binomial coefficient C(n, k)
 */
function binomialCoeff(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result = result * (n - i) / (i + 1);
  }
  return Math.round(result);
}

/**
 * Binomial PMF: P(X = k) for X ~ Binomial(n, p)
 */
function binomialPMF(k, n, p) {
  return binomialCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

/**
 * One-sided p-value: P(X >= hits) under H0: p = 0.25
 * Tests whether hit rate is significantly BETTER than chance.
 * 
 * @param {number} trials - Total sessions completed
 * @param {number} hits - Number of correct selections
 * @returns {number} p-value (< 0.05 = statistically significant)
 */
export function calculatePValue(trials, hits) {
  if (trials === 0) return 1;
  const chanceRate = 0.25; // 1 in 4 chance
  
  // P(X >= hits) = 1 - P(X <= hits - 1)
  // Which is equivalent to sum_{k=hits}^{trials} P(X = k)
  let cumulativeProb = 0;
  for (let k = hits; k <= trials; k++) {
    cumulativeProb += binomialPMF(k, trials, chanceRate);
  }
  
  return cumulativeProb;
}
