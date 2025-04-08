// risk-scoring.ts

// SWC_WEIGHTS maps common SWC IDs to a penalty value.
// The higher the weight, the more the risk score is reduced if that vulnerability is present.
export const SWC_WEIGHTS: Record<string, number> = {
    "SWC-107": 40, // Reentrancy
    "SWC-101": 30, // Integer overflows/underflows
    "SWC-100": 10, // Function Default Visibility (e.g., missing visibility specifiers)
    "SWC-128": 20, // Unchecked Call
    "SWC-120": 25, // Access Control issues
    "SWC-124": 35, // Delegatecall Injection
    "SWC-114": 20, // Transaction Ordering Dependence / Front-running
    "SWC-111": 15, // Unchecked Return Value
    "SWC-110": 10, // Assert Violation
    // Add more mappings as needed...
  };
  
  /**
   * Maps a vulnerability name (or description) to an SWC ID.
   * This rule-based approach uses simple substring matching.
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
    // Additional mappings based on observed patterns:
    if (lowerName.includes("delegatecall")) return "SWC-124";
    if (lowerName.includes("order dependence") || lowerName.includes("front-running"))
      return "SWC-114";
    if (lowerName.includes("unchecked return") || lowerName.includes("return value not checked"))
      return "SWC-111";
    if (lowerName.includes("assert violation")) return "SWC-110";
    // You can continue to add more mappings here based on the types of vulnerabilities you observe.
    
    return null;
  }
  
  /**
   * Computes the risk score for a project based on its scan results.
   * Starting with a score of 100, this function subtracts weighted penalty points based on the vulnerabilities found.
   * If a vulnerability maps to an SWC ID with a defined weight, that weight is subtracted.
   * Otherwise, a small default penalty is applied.
   */
  export function computeRiskScoreSWC(project: { scan_results?: any }): number | null {
    if (!project?.scan_results) return null;
  
    let score = 100;
  
    // Fetch the vulnerabilities from both scanner results and AI verification missed vulnerabilities.
    const scannerVulns = project.scan_results.scanner_results?.vulnerabilities || [];
    const missedVulns = project.scan_results.ai_verification?.missed_vulnerabilities || [];
    const allVulns = [...scannerVulns, ...missedVulns];
  
    for (const vuln of allVulns) {
      // Use the "issue" field or fallback to "title" and convert to lower case.
      const name = (vuln.issue || vuln.title || "").toLowerCase();
      const swcId = mapToSWCId(name);
      if (swcId && SWC_WEIGHTS[swcId]) {
        score -= SWC_WEIGHTS[swcId];
      } else {
        // If no SWC mapping is found, subtract a small default penalty.
        score -= 5;
      }
    }
  
    // Ensure the score does not go negative.
    return Math.max(score, 0);
  }
  