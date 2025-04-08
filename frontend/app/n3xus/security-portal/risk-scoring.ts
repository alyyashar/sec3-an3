// src/lib/risk-scoring.ts

// SWC_WEIGHTS maps SWC IDs to penalty points. These weights have been reduced
// and will be applied only once per SWC type.
export const SWC_WEIGHTS: Record<string, number> = {
    "SWC-107": 20,  // Reentrancy
    "SWC-101": 15,  // Integer overflows/underflows
    "SWC-100": 10,  // Missing default visibility
    "SWC-128": 15,  // Unchecked call
    "SWC-120": 20,  // Access Control issues
    "SWC-124": 25,  // Delegatecall Injection
    "SWC-114": 15,  // Transaction Ordering Dependence / Front-running
    "SWC-111": 10,  // Unchecked Return Value
    "SWC-110": 10,  // Assert Violation
    // ... add any additional mappings as needed
  };
  
  /**
   * Maps a vulnerability’s name or description to an SWC ID.
   * Uses simple substring matching to identify the vulnerability type.
   */
  export function mapToSWCId(vulnName: string): string | null {
    const lowerName = vulnName.toLowerCase();
    if (lowerName.includes("reentrancy")) return "SWC-107";
    if (
      lowerName.includes("integer arithmetic") ||
      lowerName.includes("overflow") ||
      lowerName.includes("underflow")
    )
      return "SWC-101";
    if (lowerName.includes("default visibility") || lowerName.includes("missing visibility"))
      return "SWC-100";
    if (lowerName.includes("unchecked call")) return "SWC-128";
    if (lowerName.includes("access control")) return "SWC-120";
    if (lowerName.includes("delegatecall")) return "SWC-124";
    if (lowerName.includes("order dependence") || lowerName.includes("front-running"))
      return "SWC-114";
    if (lowerName.includes("unchecked return") || lowerName.includes("return value not checked"))
      return "SWC-111";
    if (lowerName.includes("assert violation")) return "SWC-110";
    
    return null;
  }
  
  /**
   * Computes the risk score for a project based on its scan results.
   * Starts with a score of 100 and subtracts the penalty for each unique vulnerability (SWC)
   * that is found in either the scanner results or AI verification.
   */
  export function computeRiskScoreSWC(project: { scan_results?: any }): number | null {
    if (!project?.scan_results) return null;
  
    let score = 100;
    const scannerVulns = project.scan_results.scanner_results?.vulnerabilities || [];
    const missedVulns =
      project.scan_results.ai_verification?.missed_vulnerabilities ||
      project.scan_results.ai_verification?.verification?.missed_vulnerabilities ||
      [];
    const allVulns = [...scannerVulns, ...missedVulns];
  
    // Use a Set to apply each SWC penalty only once.
    const appliedSWCs = new Set<string>();
  
    for (const vuln of allVulns) {
      const name = (vuln.issue || vuln.title || "").toLowerCase();
      const swcId = mapToSWCId(name);
      if (swcId && !appliedSWCs.has(swcId) && SWC_WEIGHTS[swcId] !== undefined) {
        score -= SWC_WEIGHTS[swcId];
        appliedSWCs.add(swcId);
      } else if (!swcId && !appliedSWCs.has("no-match")) {
        // Subtract a small default penalty if no SWC mapping is found.
        score -= 5;
        appliedSWCs.add("no-match");
      }
    }
  
    return Math.max(score, 0);
  }
  