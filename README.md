# Restate Durable Execution Demo

A minimal example showing **durable execution** in action with [Restate](https://restate.dev).

## What's Durable Execution?

When a service crashes mid-workflow, normal code loses all progress and may cause problems like **duplicate payments**. With Restate's durable execution, each step is journaled — on retry, completed steps are **skipped automatically** and execution resumes from the exact point of failure.

```
Order Processing Workflow
─────────────────────────
  1. ✅ Validate Order    ← journaled, skipped on retry
  2. ✅ Process Payment   ← journaled, skipped on retry  (no double charge!)
  3. 💥 crash happens here
  4. ▶  Ship Order        ← resumes from here
  5. ▶  Send Email        ← runs normally
```

## Quick Start

```bash
# Start everything (restate-server + order-service + auto-registration)
docker compose up --build

# In another terminal, send an order:
curl localhost:8080/OrderProcessor/process \
  --json '{"orderId": "order-123", "item": "Laptop", "amount": 999.99}'
```

## Project Structure

```
.
├── docker-compose.yml          # Orchestrates restate-server + order-service
├── order-service/
│   ├── Dockerfile              # Multi-stage build
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       └── app.ts              # Order workflow with durable execution
└── README.md
```

## How It Works

The order service defines 5 **durable steps** using `ctx.run()`:

```typescript
await ctx.run("Validate Order",    () => validateOrder(order));
await ctx.run("Process Payment",   () => processPayment(order.orderId, order.amount));
await ctx.sleep(2000);  // durable timer
await ctx.run("Ship Order",        () => shipOrder(order.orderId, order.item));
await ctx.run("Send Notification", () => sendConfirmationEmail(order.orderId, trackingId));
```

Each `ctx.run()` is recorded in Restate's journal. If the service crashes and restarts, Restate **replays** the journal — completed steps return their stored results instantly, and execution continues from the first incomplete step.

## Ports

| Service        | Port | Purpose                  |
|---------------|------|--------------------------|
| Restate Ingress | 8080 | Send requests here       |
| Restate Admin   | 9070 | Admin API & registration |
| Order Service   | 9080 | Service endpoint         |

## Teardown

```bash
docker compose down
```
