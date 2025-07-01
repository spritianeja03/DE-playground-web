
export const PAYMENT_METHODS = ["Card"] as const; // Assuming Card is the primary, this might need to be more dynamic or expanded later if payment methods per connector are fetched.
export type PaymentMethod = typeof PAYMENT_METHODS[number];


// Define IDs for rule/strategy nodes
export const RULE_STRATEGY_NODES = {
  CUSTOM_RULE_APPLIED: "rule_custom_rule_applied",
  SMART_ROUTING: "strategy_smart_routing", // Kept for potential future re-introduction
  ELIMINATION_APPLIED: "strategy_elimination_applied", 
  STANDARD_ROUTING: "strategy_standard_routing",
  NO_ROUTE_FOUND: "strategy_no_route_found",
} as const;
