import { del, get, post, put, apiWrapper } from "./api-methods";
import * as url from "./api-urls";

// Auth
export const loginUser = (data: {} | undefined) => apiWrapper(post, url.LOGIN_USER, data);
export const registerUser = (data: {}) => apiWrapper(post, url.REGISTER_USER, data);
export const getUsers = () => apiWrapper(get, url.GET_USERS);
export const testAuth = () => apiWrapper(get, url.TEST_AUTH);

// Copilot
export const postCopilot = (data: {} | undefined) => apiWrapper(post, url.POST_COPILOT, data);

// Scan
export const scanFile = (data: {} | undefined) => apiWrapper(post, url.SCAN_FILE, data);
export const scanCode = (data: {} | undefined) => apiWrapper(post, url.SCAN_CODE, data);
export const scanContract = (data: {} | undefined) => apiWrapper(post, url.SCAN_CONTRACT, data);
export const scanFix = (data: {} | undefined) => apiWrapper(post, url.SCAN_FIX, data);
export const getScanResults = () => apiWrapper(get, url.SCAN_RESULTS);
export const getScanReport = (auditId: string) => apiWrapper(get, url.SCAN_REPORT(auditId));

// Attestation
export const postAttestation = (auditId: string, data: {} | undefined) =>
  apiWrapper(post, url.ATTESTATION(auditId), data);
export const getAttestation = (auditId: string) =>
  apiWrapper(get, url.ATTESTATION(auditId));
