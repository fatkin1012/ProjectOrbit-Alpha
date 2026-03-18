export interface SAPCase {
  id: string;
  tCode: string;          // Backward-compat primary T-code
  tCodes?: string[];      // Multiple T-codes linked to one case
  title: string;          // e.g., 'Check Delivery Status'
  requirement: string;    // What the customer asked for
  steps: string;          // Your notes on how to solve it
  screenshot?: string;    // Backward-compat single screenshot
  screenshots?: string[]; // Base64 strings for multiple screenshots
  createdAt: number;
}