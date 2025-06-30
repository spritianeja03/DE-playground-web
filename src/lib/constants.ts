
export const PAYMENT_METHODS = ["Card"] as const; // Assuming Card is the primary, this might need to be more dynamic or expanded later if payment methods per connector are fetched.
export type PaymentMethod = typeof PAYMENT_METHODS[number];

// PROCESSORS constant is removed. Processor information will now come from the fetched merchantConnectors.
// The 'Processor' type, previously derived from PROCESSORS, will effectively be replaced by 'MerchantConnector' from types.ts for identifying processors.

// DEFAULT_PROCESSOR_AVAILABILITY is removed as it was based on the static PROCESSORS list.
// The logic for processor availability and their supported payment methods will need to be handled dynamically,
// potentially based on data fetched with merchantConnectors or a new configuration UI based on them.

// Define IDs for rule/strategy nodes
export const RULE_STRATEGY_NODES = {
  CUSTOM_RULE_APPLIED: "rule_custom_rule_applied",
  SMART_ROUTING: "strategy_smart_routing", // Kept for potential future re-introduction
  ELIMINATION_APPLIED: "strategy_elimination_applied", 
  STANDARD_ROUTING: "strategy_standard_routing",
  NO_ROUTE_FOUND: "strategy_no_route_found",
} as const;
