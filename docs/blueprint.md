# **App Name**: Hyperswitch Vision

## Core Features:

- Live Sankey Diagram: Display a live, updating Sankey diagram visualizing transaction flow through processors, payment methods, and fallback paths. The diagram updates dynamically.
- Interactive Controls: Provide an interactive controls panel to manipulate the Sankey diagram in real-time. Users can adjust parameters like volume sliders, payment method selectors, and routing rules.
- Detailed Tooltips: Offer tooltips on diagram elements to show transaction volume, percentage split, fallback status, latency, and cost per path. Users can hover or click to reveal detailed information.
- Analytical Dashboard: Display metric trends, summaries, and charts for in-depth data analysis within the Analytics tab. Include session summaries, routing performance, and cost metrics.
- AI Insights: Generate insights from displayed Sankey Diagram by using AI. For example, detect possible transaction anomalies or make suggestions on parameter adjustments for optimized transaction processing. AI is used as a tool and runs based on displayed information, and without use of persistent or historic data.
- Total Payments: Numeric input for total payments (e.g., 10,000)
- TPS (Transactions Per Second): Slider for transactions per second (1–5000)
- Payment Methods: Multi-select for payment methods (Card, UPI, Wallet, Netbanking)
- Amount/Currency: Amount input + currency dropdown (INR, USD, EUR, etc.)
- Processor ↔ Payment Method Matrix: Toggle switches to enable/disable compatibility (e.g., Razorpay supports Card + UPI)
- Routing Rules Setup: Rule builder interface (e.g., if Payment Method = Card and Amount > 5000, then Route to Stripe)
- Enable Smart Routing (SR): Checkbox to enable Smart Routing (SR)
- Enable Elimination Routing: Checkbox to enable Elimination Routing (default enabled)
- Enable Debit Routing: Checkbox to enable Debit Routing
- Simulate Sale Event: Toggle to simulate sale event (boost traffic load + change payment method mix)
- SR Fluctuation Sliders: Sliders for each processor to simulate SR increase/decrease (0%–100%)
- Trigger Processor Incidents/Downtime: Toggle for temporary outage to trigger processor incidents/downtime
- Transaction Distribution Chart: Bar or Pie chart showing processor-wise distribution of transactions
- Overall Success Rate (SR): Visual metric for overall success rate (e.g., 92.3%)
- Processor-wise SRs: Table format with SR%, failure %, volume share for processor-wise SRs

## Style Guidelines:

- The color palette is based on themes evoked by Sci-Fi interfaces: advanced technology and data flow. Dark background (#121212) provides contrast, reduces eye strain, and establishes a futuristic atmosphere.
- Primary color: Neon blue (#42A5F5) will highlight interactive elements and key data points. It conveys a sense of technology and activity and contrasts with the dark background.
- Accent color: Electric purple (#BB86FC) is used for secondary highlights and accents, complementing the neon blue and enhancing the sci-fi aesthetic.
- Monospace or modern tech-style sans-serif fonts for clear, code-like text.
- Minimalist, glowing icons to represent data types and functions.
- Smooth transitions and glowing node highlights to enhance interactivity.
- Full-width canvas for Sankey diagram, with controls fixed at the bottom and tabs at the top.