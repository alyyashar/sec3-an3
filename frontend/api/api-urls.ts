// Auth
export const LOGIN_USER = "/api/auth/login";
export const REGISTER_USER = "/api/auth/register";
export const GET_USERS = "/api/users";
export const TEST_AUTH = "/api/test";

// Copilot
export const POST_COPILOT = "/api/copilot/";

// Scan
export const SCAN_FILE = "/api/scan/file";
export const SCAN_CODE = "/api/scan/code";
export const SCAN_CONTRACT = "/api/scan/contract";
export const SCAN_FIX = "/api/scan/fix";
export const SCAN_RESULTS = "/api/scan/results";
export const SCAN_REPORT = (auditId: string) => `/api/scan/${auditId}/report`;

// Attestation (now with prefix)
export const ATTESTATION = (auditId: string) => `/api/attestation/${auditId}`;
