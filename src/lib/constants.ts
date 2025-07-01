
export const PAYMENT_METHODS = ["Card"] as const; // Assuming Card is the primary, this might need to be more dynamic or expanded later if payment methods per connector are fetched.
export type PaymentMethod = typeof PAYMENT_METHODS[number];
