import * as restate from "@restatedev/restate-sdk";

// ============================================================
//  Order Processor — Durable Execution Demo
// ============================================================
//  Each ctx.run() step is journaled by Restate. If this service
//  crashes after "Process Payment" but before "Ship Order",
//  Restate will replay the journal on retry:
//    ✅ Validate Order  → skipped (already completed)
//    ✅ Process Payment → skipped (already completed)
//    ▶  Ship Order      → resumes from here
//    ▶  Send Email      → runs normally
//
//  Result: no duplicate payments, no lost orders.
// ============================================================

type Order = {
    orderId: string;
    item: string;
    amount: number;
};

// --- Simulated side-effect functions (imagine these call external APIs) ---

function validateOrder(order: Order): boolean {
    console.log(`  🔍 Validating order ${order.orderId} for "${order.item}"...`);
    if (order.amount <= 0) throw new Error("Invalid order amount");
    console.log(`  ✅ Order ${order.orderId} is valid`);
    return true;
}

function processPayment(orderId: string, amount: number): string {
    console.log(`  💳 Charging $${amount.toFixed(2)} for order ${orderId}...`);
    // Simulate occasional failures to show retry behavior
    const txnId = `txn_${Date.now()}`;
    console.log(`  ✅ Payment successful — transaction: ${txnId}`);
    return txnId;
}

function shipOrder(orderId: string, item: string): string {
    console.log(`  📦 Shipping "${item}" for order ${orderId}...`);
    const trackingId = `TRACK-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    console.log(`  ✅ Shipped — tracking: ${trackingId}`);
    return trackingId;
}

function sendConfirmationEmail(orderId: string, trackingId: string): void {
    console.log(`  📧 Sending confirmation email for order ${orderId}...`);
    console.log(`  ✅ Email sent — tracking link included (${trackingId})`);
}

// --- Restate Service Definition ---

const orderProcessor = restate.service({
    name: "OrderProcessor",
    handlers: {
        process: async (ctx: restate.Context, order: Order) => {
            console.log(`\n🛒 Processing order ${order.orderId}...\n`);

            // Step 1: Validate the order (durably executed)
            await ctx.run("Validate Order", () => validateOrder(order));

            // Step 2: Process payment (durably executed — will NOT run twice on retry)
            const txnId = await ctx.run("Process Payment", () =>
                processPayment(order.orderId, order.amount)
            );

            // Step 3: Wait for warehouse preparation (durable sleep)
            console.log(`\n  ⏳ Waiting for warehouse preparation...\n`);
            await ctx.sleep(15000); // 5 seconds

            // Step 4: Ship the order (durably executed)
            const trackingId = await ctx.run("Ship Order", () =>
                shipOrder(order.orderId, order.item)
            );

            // Step 5: Send confirmation email (durably executed)
            await ctx.run("Send Notification", () =>
                sendConfirmationEmail(order.orderId, trackingId)
            );

            const result = {
                status: "completed",
                orderId: order.orderId,
                transactionId: txnId,
                trackingId: trackingId,
                message: `Order ${order.orderId} processed successfully! 🎉`,
            };

            console.log(`\n✅ Order ${order.orderId} fully processed!\n`);
            return result;
        },
    },
});

// --- Start the HTTP server ---

restate.serve({ services: [orderProcessor], port: 9080 });
console.log("🚀 Order service listening on port 9080");
