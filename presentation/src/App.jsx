import { useState, useEffect, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

// ─── Code style config ─────────────────────────────────────────

const codeStyle = {
  borderRadius: '8px',
  fontSize: '0.78rem',
  padding: '1.2rem',
  margin: 0,
  background: '#0d0d1a',
  border: '1px solid #1e1e30',
  lineHeight: 1.6,
};

const codeStyleSmall = {
  ...codeStyle,
  fontSize: '0.68rem',
  padding: '0.8rem',
};

// ─── Restate Logo ───────────────────────────────────────────────

function RestateLogo({ small }) {
  const size = small ? 24 : 56;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="20" fill="url(#restateGrad)" />
      <path d="M30 35 H55 A12 12 0 0 1 55 58 H40 L58 75" stroke="white" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <defs>
        <linearGradient id="restateGrad" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#E86C3A" />
          <stop offset="100%" stopColor="#CF4520" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── SVG Arrow Components ───────────────────────────────────────

function ArrowDown({ color = '#606078', label }) {
  return (
    <div className="svg-arrow-down">
      <svg width="24" height="32" viewBox="0 0 24 32">
        <line x1="12" y1="0" x2="12" y2="24" stroke={color} strokeWidth="2" />
        <polygon points="6,22 12,30 18,22" fill={color} />
      </svg>
      {label && <span className="arrow-label" style={{ color }}>{label}</span>}
    </div>
  );
}

function ArrowRight({ color = '#606078', label }) {
  return (
    <div className="svg-arrow-right">
      <svg width="40" height="24" viewBox="0 0 40 24">
        <line x1="0" y1="12" x2="32" y2="12" stroke={color} strokeWidth="2" />
        <polygon points="30,6 38,12 30,18" fill={color} />
      </svg>
      {label && <span className="arrow-label" style={{ color }}>{label}</span>}
    </div>
  );
}

// ─── Slide Components ───────────────────────────────────────────

function TitleSlide() {
  return (
    <div className="slide slide-title">
      <div className="title-glow" />
      <div className="restate-logo-large">
        <RestateLogo />
      </div>
      <h1><span className="gradient-text">Restate</span></h1>
      <p className="subtitle">Durable Execution for Resilient Distributed Applications</p>
      <div className="meta-info">
        <span className="tag">Concepts + Live Demo</span>
      </div>
    </div>
  );
}

function AgendaSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">01</span> Agenda</h2>
      <div className="agenda-grid">
        {[
          { num: '01', title: 'Resiliency Fundamentals', desc: 'Why distributed systems fail & why resiliency matters' },
          { num: '02', title: 'Conventional Patterns', desc: 'Retries, Circuit Breakers, Sagas, Queues & more' },
          { num: '03', title: 'The Complexity Problem', desc: 'Why conventional approaches create an infrastructure burden' },
          { num: '04', title: 'Enter Restate', desc: 'Durable Execution, architecture & all features deep-dive' },
          { num: '05', title: 'Live Demo', desc: 'E-commerce flow with Node.js, Python & Spring Boot' },
        ].map(item => (
          <div className="agenda-item" key={item.num}>
            <div className="agenda-number">{item.num}</div>
            <div className="agenda-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhatIsResiliencySlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">02</span> What is Resiliency?</h2>
      <div className="definition-box">
        <p className="definition">
          The ability of a system to <span className="highlight">gracefully handle and recover from failures</span> while
          continuing to provide an acceptable level of service.
        </p>
      </div>
      <div className="three-col">
        <div className="card">
          <div className="card-icon">&#x1F310;</div>
          <h3>Networks Fail</h3>
          <p>Packets drop, connections timeout, DNS fails, load balancers hiccup</p>
        </div>
        <div className="card">
          <div className="card-icon">&#x1F4BE;</div>
          <h3>Services Crash</h3>
          <p>OOM kills, deployments restart, dependencies go down, disks fill up</p>
        </div>
        <div className="card">
          <div className="card-icon">&#x26A1;</div>
          <h3>Partial Failures</h3>
          <p>Payment charged but order not created. Email sent but DB not updated.</p>
        </div>
      </div>
    </div>
  );
}

// NEW: Visual infographic showing where failures happen
function DistributedFailuresSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">02</span> Where Failures Happen</h2>
      <div className="failure-infographic">
        <div className="failure-flow">
          <div className="f-node f-client">
            <div className="f-icon">&#x1F4F1;</div>
            <span>Client</span>
          </div>
          <div className="f-link">
            <div className="f-link-line" />
            <div className="f-failure-badge">&#x1F4A5; Timeout</div>
          </div>
          <div className="f-node f-gateway">
            <div className="f-icon">&#x1F6AA;</div>
            <span>API Gateway</span>
          </div>
          <div className="f-link">
            <div className="f-link-line" />
            <div className="f-failure-badge">&#x1F4A5; Network Split</div>
          </div>
          <div className="f-node f-service-a">
            <div className="f-icon">&#x2699;</div>
            <span>Service A</span>
          </div>
          <div className="f-link">
            <div className="f-link-line" />
            <div className="f-failure-badge">&#x1F4A5; Service Down</div>
          </div>
          <div className="f-node f-service-b">
            <div className="f-icon">&#x2699;</div>
            <span>Service B</span>
          </div>
          <div className="f-link">
            <div className="f-link-line" />
            <div className="f-failure-badge">&#x1F4A5; Disk Full</div>
          </div>
          <div className="f-node f-db">
            <div className="f-icon">&#x1F5C3;</div>
            <span>Database</span>
          </div>
        </div>
        <div className="failure-stats">
          <div className="stat-box">
            <div className="stat-number red-text">99.9%</div>
            <div className="stat-label">uptime = 8.7 hours downtime/year</div>
          </div>
          <div className="stat-box">
            <div className="stat-number yellow-text">5 services</div>
            <div className="stat-label">@ 99.9% each = 99.5% combined</div>
          </div>
          <div className="stat-box">
            <div className="stat-number red-text">43.8 hrs</div>
            <div className="stat-label">downtime/year with 5 services</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyResiliencyMattersSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">02</span> Why Resiliency Matters</h2>
      <div className="impact-grid">
        <div className="impact-item red-bg">
          <h3>&#x274C; Without Resiliency</h3>
          <ul>
            <li>Double charges on payment retries</li>
            <li>Lost orders in e-commerce flows</li>
            <li>Inconsistent state across services</li>
            <li>Manual intervention to fix data</li>
            <li>2 AM pager alerts</li>
          </ul>
        </div>
        <div className="impact-item green-bg">
          <h3>&#x2705; With Resiliency</h3>
          <ul>
            <li>Exactly-once payment processing</li>
            <li>Automatic recovery from crashes</li>
            <li>Consistent distributed state</li>
            <li>Self-healing workflows</li>
            <li>Peaceful sleep</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function RetryPatternSlide() {
  const code = `// Traditional retry with exponential backoff
async function callWithRetry(fn, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;
      const delay = Math.pow(2, attempt) * 1000
                    + Math.random() * 1000; // jitter
      await sleep(delay);
    }
  }
}

// Every service call needs this wrapper
const result = await callWithRetry(
  () => paymentService.charge(order)
);`;

  return (
    <div className="slide">
      <h2><span className="accent num">03</span> Retry + Exponential Backoff</h2>
      <div className="two-col">
        <div className="col">
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
            {code}
          </SyntaxHighlighter>
        </div>
        <div className="col">
          <div className="problems-list">
            <h3>&#x26A0;&#xFE0F; Problems</h3>
            <ul>
              <li><span className="red-text">Non-idempotent operations</span> &#8212; retry may cause duplicates</li>
              <li><span className="red-text">State lost on crash</span> &#8212; retry counter resets</li>
              <li><span className="red-text">Boilerplate everywhere</span> &#8212; every call needs wrapping</li>
              <li><span className="red-text">No visibility</span> &#8212; hard to monitor retry state</li>
            </ul>
            <div className="lib-tags">
              <span className="lib-tag">axios-retry</span>
              <span className="lib-tag">tenacity</span>
              <span className="lib-tag">Spring Retry</span>
              <span className="lib-tag">resilience4j</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CircuitBreakerSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">03</span> Circuit Breaker Pattern</h2>
      <div className="circuit-breaker-diagram">
        <div className="cb-state cb-closed">
          <div className="cb-icon">&#x1F7E2;</div>
          <h3>CLOSED</h3>
          <p>Requests flow normally. Failures counted.</p>
        </div>
        <div className="cb-arrow-right">failure threshold &#8594;</div>
        <div className="cb-state cb-open">
          <div className="cb-icon">&#x1F534;</div>
          <h3>OPEN</h3>
          <p>Requests fail fast. No downstream calls.</p>
        </div>
        <div className="cb-arrow-right">timeout &#8594;</div>
        <div className="cb-state cb-half">
          <div className="cb-icon">&#x1F7E1;</div>
          <h3>HALF-OPEN</h3>
          <p>Test requests allowed.</p>
          <div className="cb-arrow-split">
            <span className="green-text">&#x2713; &#8594; CLOSED</span>
            <span className="red-text">&#x2717; &#8594; OPEN</span>
          </div>
        </div>
      </div>
      <div className="problems-list compact">
        <h3>&#x26A0;&#xFE0F; Problems</h3>
        <ul className="horizontal-list">
          <li>Complex state machine to implement</li>
          <li>Threshold tuning is an art</li>
          <li>Doesn't fix root cause &#8212; just prevents cascading</li>
          <li>Per-service config overhead</li>
        </ul>
      </div>
    </div>
  );
}

function SagaPatternSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">03</span> Saga Pattern</h2>
      <div className="saga-diagram">
        <div className="saga-flow">
          <div className="saga-step success">
            <div className="saga-label">Create Order</div>
            <div className="saga-comp">&#x21A9; Cancel Order</div>
          </div>
          <div className="saga-connector">&#8594;</div>
          <div className="saga-step success">
            <div className="saga-label">Reserve Stock</div>
            <div className="saga-comp">&#x21A9; Release Stock</div>
          </div>
          <div className="saga-connector">&#8594;</div>
          <div className="saga-step failure">
            <div className="saga-label">Charge Payment</div>
            <div className="saga-comp">&#x21A9; Refund</div>
          </div>
          <div className="saga-connector fail">&#x2717;</div>
          <div className="saga-rollback">Compensate!</div>
        </div>
      </div>
      <div className="two-col" style={{marginTop: '1.5rem'}}>
        <div className="card compact">
          <h3>Orchestration</h3>
          <p>Central coordinator. Single point of failure. Easier to trace.</p>
        </div>
        <div className="card compact">
          <h3>Choreography</h3>
          <p>Event-driven. No single point of failure. Harder to debug.</p>
        </div>
      </div>
      <p className="red-text center-text" style={{marginTop: '1rem', fontSize: '0.9rem'}}>
        Compensating transactions are error-prone and double your code.
      </p>
    </div>
  );
}

function MorePatternsSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">03</span> More Conventional Patterns</h2>
      <div className="pattern-grid">
        <div className="pattern-card">
          <h3>&#x1F4E8; Message Queues + Idempotency</h3>
          <p>Kafka/RabbitMQ for reliable delivery. Idempotency keys in DB. Deduplication for at-least-once delivery.</p>
          <div className="infra-tag">Needs: Kafka + Redis + DB</div>
        </div>
        <div className="pattern-card">
          <h3>&#x1F4E4; Outbox Pattern</h3>
          <p>Write to DB + outbox table atomically. Separate process polls and publishes. Solves dual-write problem.</p>
          <div className="infra-tag">Needs: DB + CDC / Poller</div>
        </div>
        <div className="pattern-card">
          <h3>&#x1F6E1; Bulkhead Pattern</h3>
          <p>Isolate resources per service/tenant. Thread pools, connection pools, rate limits prevent cascading.</p>
          <div className="infra-tag">Needs: Pool config per service</div>
        </div>
        <div className="pattern-card">
          <h3>&#x23F0; Timeouts + Dead Letter Queues</h3>
          <p>Cascading timeouts. DLQs for repeatedly failing messages. Manual inspection required.</p>
          <div className="infra-tag">Needs: Queue + Monitoring</div>
        </div>
      </div>
    </div>
  );
}

function ComplexityProblemSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">04</span> The Complexity Problem</h2>
      <div className="complexity-diagram">
        <div className="business-logic-box">
          <h3>Your Business Logic</h3>
          <code>processOrder() &#8594; chargePayment() &#8594; shipItems()</code>
          <p className="green-text">~50 lines of code</p>
        </div>
        <div className="plus-sign">+</div>
        <div className="infra-box">
          <h3>Infrastructure You Need</h3>
          <div className="infra-list">
            <span>Kafka / RabbitMQ</span>
            <span>Redis</span>
            <span>PostgreSQL (state)</span>
            <span>Retry libraries</span>
            <span>Circuit breakers</span>
            <span>Saga orchestrator</span>
            <span>Outbox + poller</span>
            <span>Idempotency store</span>
            <span>DLQ consumer</span>
            <span>Monitoring stack</span>
          </div>
          <p className="red-text">~2000+ lines of glue code + ops burden</p>
        </div>
      </div>
      <p className="tagline">You write more infrastructure code than business logic.</p>
    </div>
  );
}

function EnterRestateSlide() {
  return (
    <div className="slide slide-highlight">
      <div className="title-glow" />
      <div className="big-reveal">
        <p className="pre-text">What if you could write just the business logic...</p>
        <h1><span className="gradient-text">and get all of that for free?</span></h1>
        <div className="restate-logo-medium" style={{marginTop: '2rem'}}>
          <RestateLogo />
        </div>
      </div>
    </div>
  );
}

function WhatIsRestateSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">05</span> What is Restate?</h2>
      <div className="definition-box">
        <p className="definition">
          Restate is a <span className="highlight">durable execution engine</span> that sits between your services,
          automatically providing reliability, consistency, and fault tolerance &#8212;{' '}
          <span className="highlight">without changing how you write code</span>.
        </p>
      </div>
      <div className="three-col">
        <div className="card">
          <div className="card-icon">&#x1F4DD;</div>
          <h3>Write Normal Code</h3>
          <p>Plain functions. No DSL. No YAML workflows. Just your language.</p>
        </div>
        <div className="card">
          <div className="card-icon">&#x1F504;</div>
          <h3>Automatic Recovery</h3>
          <p>Restate journals every step. On failure, replays from journal.</p>
        </div>
        <div className="card">
          <div className="card-icon">&#x1F3D7;</div>
          <h3>No Extra Infra</h3>
          <p>Replace Kafka, Redis, saga orchestrators with one Restate server.</p>
        </div>
      </div>
    </div>
  );
}

function ArchitectureSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">05</span> How Restate Works</h2>
      <div className="architecture-diagram">
        <div className="arch-layer">
          <div className="arch-box client-box">
            <h4>Client / API Gateway</h4>
            <p>HTTP or gRPC request</p>
          </div>
        </div>
        <ArrowDown color="#606078" />
        <div className="arch-layer">
          <div className="arch-box restate-box">
            <h4><RestateLogo small /> Restate Server</h4>
            <div className="arch-features">
              <span>Journal</span>
              <span>State Store</span>
              <span>Timer Queue</span>
              <span>Invocation Queue</span>
            </div>
          </div>
        </div>
        <ArrowDown color="#E86C3A" label="proxies calls" />
        <div className="arch-layer services-layer">
          <div className="arch-box service-box node-color">
            <h4>Order Service</h4>
            <p>Node.js / TypeScript</p>
          </div>
          <div className="arch-box service-box python-color">
            <h4>Payment Service</h4>
            <p>Python</p>
          </div>
          <div className="arch-box service-box java-color">
            <h4>Shipping Service</h4>
            <p>Java / Spring Boot</p>
          </div>
        </div>
      </div>
      <p className="center-text muted">Restate acts as a proxy &#8212; your services register handlers, Restate manages durability.</p>
    </div>
  );
}

// NEW: Step-by-step journaling infographic
function HowJournalingWorksSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">06</span> How Journaling Works</h2>
      <div className="timeline-infographic">
        <div className="timeline-row">
          <div className="timeline-step">
            <div className="timeline-number">1</div>
            <div className="timeline-content">
              <h4>Receive Request</h4>
              <p>Restate receives HTTP call, creates invocation ID, starts journal</p>
            </div>
            <div className="timeline-visual">
              <code>INV-abc123 created</code>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">2</div>
            <div className="timeline-content">
              <h4>Execute Side Effect</h4>
              <p>Your code calls <code>ctx.run()</code> &#8212; Restate intercepts and logs the call</p>
            </div>
            <div className="timeline-visual">
              <code>Journal[0] = chargePayment()</code>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">3</div>
            <div className="timeline-content">
              <h4>Store Result</h4>
              <p>Result is persisted to journal before returning to your code</p>
            </div>
            <div className="timeline-visual done-bg">
              <code>Journal[0] &#x2713; result: pay_123</code>
            </div>
          </div>
        </div>
        <div className="timeline-row">
          <div className="timeline-step crash-step">
            <div className="timeline-number crash-num">&#x1F4A5;</div>
            <div className="timeline-content">
              <h4>Crash / Restart</h4>
              <p>Process dies. Restate detects the failure and retries the invocation.</p>
            </div>
            <div className="timeline-visual crash-bg">
              <code>INV-abc123 retrying...</code>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-number replay-num">&#x23E9;</div>
            <div className="timeline-content">
              <h4>Replay from Journal</h4>
              <p>Completed steps return cached results. No re-execution of side effects!</p>
            </div>
            <div className="timeline-visual replay-bg">
              <code>Journal[0] &#8594; cached: pay_123</code>
            </div>
          </div>
          <div className="timeline-step">
            <div className="timeline-number">5</div>
            <div className="timeline-content">
              <h4>Resume Execution</h4>
              <p>Execution continues from where it left off. No duplicate charges!</p>
            </div>
            <div className="timeline-visual done-bg">
              <code>Continuing step 2...</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DurableExecutionSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">06</span> Durable Execution &#8212; Code + Journal</h2>
      <div className="journal-demo">
        <div className="journal-code">
          <h4>Your Handler Code</h4>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
{`async function processOrder(ctx, order) {
  // Step 1: Recorded in journal
  const payment = await ctx.run(
    () => chargePayment(order)
  );

  // Step 2: Recorded in journal
  await ctx.run(
    () => updateInventory(order)
  );

  // Step 3: Recorded in journal
  await ctx.run(
    () => sendConfirmation(order)
  );
}`}
          </SyntaxHighlighter>
        </div>
        <div className="journal-log">
          <h4>Restate Journal</h4>
          <div className="journal-entries">
            <div className="journal-entry done">
              <span className="j-status">&#x2713;</span>
              <span className="j-step">Step 1: chargePayment</span>
              <span className="j-result">&#x2192; pay_123</span>
            </div>
            <div className="journal-entry done">
              <span className="j-status">&#x2713;</span>
              <span className="j-step">Step 2: updateInventory</span>
              <span className="j-result">&#x2192; ok</span>
            </div>
            <div className="journal-entry crash">
              <span className="j-status">&#x1F4A5;</span>
              <span className="j-step">CRASH!</span>
              <span className="j-result">service restarts...</span>
            </div>
            <div className="journal-entry replay">
              <span className="j-status">&#x23E9;</span>
              <span className="j-step">Step 1: replay</span>
              <span className="j-result">cached &#8212; skipped</span>
            </div>
            <div className="journal-entry replay">
              <span className="j-status">&#x23E9;</span>
              <span className="j-step">Step 2: replay</span>
              <span className="j-result">cached &#8212; skipped</span>
            </div>
            <div className="journal-entry active">
              <span className="j-status">&#x25B6;</span>
              <span className="j-step">Step 3: sendConfirmation</span>
              <span className="j-result">executing...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// NEW: Before/After code comparison
function BeforeAfterSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">06</span> Before vs After Restate</h2>
      <div className="two-col">
        <div className="col">
          <div className="before-after-header red-border">&#x274C; Without Restate (40+ lines)</div>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{...codeStyleSmall, fontSize: '0.62rem'}}>
{`async function processOrder(order) {
  const idempotencyKey = uuid();

  // Manual retry with backoff
  let payment;
  for (let i = 0; i < 3; i++) {
    try {
      payment = await axios.post(
        '/payments/charge',
        { ...order, idempotencyKey },
        { timeout: 5000 }
      );
      break;
    } catch (e) {
      if (i === 2) throw e;
      await sleep(Math.pow(2, i) * 1000);
    }
  }

  // Save state for saga compensation
  await db.insert('saga_state', {
    orderId: order.id,
    paymentId: payment.id,
    status: 'PAYMENT_DONE'
  });

  try {
    await callWithRetry(
      () => inventoryService.reserve(order)
    );
  } catch (e) {
    // Compensate: refund payment
    await paymentService.refund(payment.id);
    await db.update('saga_state', {
      status: 'ROLLED_BACK'
    });
    throw e;
  }
}`}
          </SyntaxHighlighter>
        </div>
        <div className="col">
          <div className="before-after-header green-border">&#x2705; With Restate (12 lines)</div>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{...codeStyleSmall, fontSize: '0.62rem'}}>
{`async function processOrder(ctx, order) {
  // Durable, exactly-once, auto-retry
  const payment = await ctx.run(
    () => chargePayment(order)
  );

  // Durable — no compensation needed
  await ctx.run(
    () => reserveInventory(order)
  );

  // If anything crashes, Restate
  // replays from the journal.
  // No idempotency keys.
  // No saga state table.
  // No retry wrappers.
  // No compensating transactions.
  // Just your business logic.

  return { orderId: order.id, payment };
}`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

function Feature_DurableExecution() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Durable Execution</h2>
      <div className="feature-showcase">
        <div className="feature-desc">
          <p>Every side effect is <span className="highlight">journaled</span>. On failure, Restate replays &#8212;
          completed steps return cached results, execution resumes exactly where it left off.</p>
          <ul className="feature-benefits">
            <li><span className="green-text">&#x2713;</span> No more retry logic boilerplate</li>
            <li><span className="green-text">&#x2713;</span> No more idempotency keys</li>
            <li><span className="green-text">&#x2713;</span> No more outbox pattern</li>
            <li><span className="green-text">&#x2713;</span> Survives process crashes & restarts</li>
            <li><span className="green-text">&#x2713;</span> Automatic deduplication of side effects</li>
          </ul>
        </div>
        <div className="feature-code">
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
{`// Every ctx.run() is durable
const paymentId = await ctx.run(() =>
  stripe.charges.create({
    amount: 9900, currency: 'usd'
  })
);

// ctx.run() for any side effect
const trackingNum = await ctx.run(() =>
  shippingApi.createLabel({
    orderId, address
  })
);

// If crash happens anywhere above,
// Restate replays cached results.
// Stripe is NOT charged again.
// Label is NOT created again.`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

// NEW: Virtual Objects visual diagram
function Feature_VirtualObjectsDiagram() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Virtual Objects &#8212; Concept</h2>
      <div className="vo-infographic">
        <div className="vo-description">
          <p>Virtual Objects are <span className="highlight">durable entities keyed by ID</span>. Only one handler executes per key at a time &#8212; like an actor with built-in state.</p>
        </div>
        <div className="vo-diagram">
          <div className="vo-requests">
            <div className="vo-req">addItem("cart-A", item1)</div>
            <div className="vo-req">addItem("cart-A", item2)</div>
            <div className="vo-req">addItem("cart-B", item3)</div>
          </div>
          <ArrowDown color="#E86C3A" label="Restate routes by key" />
          <div className="vo-objects">
            <div className="vo-object">
              <div className="vo-key">cart-A</div>
              <div className="vo-lock">&#x1F512; exclusive access</div>
              <div className="vo-state">
                <div className="vo-state-label">K/V State</div>
                <code>items: [item1]</code>
              </div>
              <div className="vo-queue">
                <span className="vo-queue-label">Queue:</span>
                <span className="vo-queued">addItem(item2) waiting...</span>
              </div>
            </div>
            <div className="vo-object">
              <div className="vo-key">cart-B</div>
              <div className="vo-lock green-text">&#x1F513; executing</div>
              <div className="vo-state">
                <div className="vo-state-label">K/V State</div>
                <code>items: [item3]</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature_VirtualObjects() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Virtual Objects &#8212; Code</h2>
      <div className="feature-showcase">
        <div className="feature-desc">
          <ul className="feature-benefits">
            <li><span className="green-text">&#x2713;</span> Built-in K/V state (no external DB)</li>
            <li><span className="green-text">&#x2713;</span> Single-writer per key &#8212; no race conditions</li>
            <li><span className="green-text">&#x2713;</span> Addressable by key (like actors)</li>
            <li><span className="green-text">&#x2713;</span> State persisted by Restate, survives crashes</li>
            <li><span className="green-text">&#x2713;</span> Automatic inbox queuing per key</li>
          </ul>
          <div className="feature-callout">
            <strong>Use cases:</strong> Shopping carts, user sessions, IoT device twins, game entities, counters, rate limiters
          </div>
        </div>
        <div className="feature-code">
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
{`const cartObject = restate.object({
  name: "ShoppingCart",
  handlers: {
    addItem: async (ctx, item) => {
      // K/V state — no database needed
      const items = await ctx.get("items") || [];
      items.push(item);
      ctx.set("items", items);

      const total = items.reduce(
        (sum, i) => sum + i.price, 0
      );
      ctx.set("total", total);
      return { items, total };
    },

    checkout: async (ctx) => {
      const items = await ctx.get("items");
      const total = await ctx.get("total");

      // Durable call to payment service
      await ctx.run(() =>
        chargePayment({ items, total })
      );

      ctx.clearAll(); // Empty the cart
      return { status: "completed", total };
    },

    getCart: async (ctx) => ({
      items: await ctx.get("items") || [],
      total: await ctx.get("total") || 0,
    })
  }
});`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

// NEW: Workflow lifecycle diagram
function Feature_WorkflowDiagram() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Workflows &#8212; Lifecycle</h2>
      <div className="workflow-infographic">
        <div className="wf-lifecycle">
          <div className="wf-stage">
            <div className="wf-stage-icon wf-start">&#x25B6;</div>
            <h4>Start</h4>
            <p>POST /UserSignup/run</p>
            <code className="wf-code">ID: signup-user-42</code>
          </div>
          <ArrowRight color="#4ADE80" />
          <div className="wf-stage">
            <div className="wf-stage-icon wf-run">&#x2699;</div>
            <h4>Execute Steps</h4>
            <p>createUser &#x2192; sendEmail</p>
            <code className="wf-code">Journaled to disk</code>
          </div>
          <ArrowRight color="#FBBF24" />
          <div className="wf-stage">
            <div className="wf-stage-icon wf-wait">&#x23F3;</div>
            <h4>Wait for Signal</h4>
            <p>ctx.promise("verified")</p>
            <code className="wf-code">Can wait for days!</code>
          </div>
          <ArrowRight color="#4ADE80" />
          <div className="wf-stage">
            <div className="wf-stage-icon wf-complete">&#x2713;</div>
            <h4>Complete</h4>
            <p>activateAccount()</p>
            <code className="wf-code">Exactly once</code>
          </div>
        </div>
        <div className="wf-features-row">
          <div className="wf-feature-box">
            <strong>Signal In:</strong> External events resolve promises via HTTP
          </div>
          <div className="wf-feature-box">
            <strong>Query State:</strong> GET /UserSignup/status/signup-user-42
          </div>
          <div className="wf-feature-box">
            <strong>Guarantee:</strong> Runs exactly once, survives any crash
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature_Workflows() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Workflows &#8212; Code</h2>
      <div className="feature-showcase">
        <div className="feature-desc">
          <ul className="feature-benefits">
            <li><span className="green-text">&#x2713;</span> Run-to-completion guarantee</li>
            <li><span className="green-text">&#x2713;</span> External signals via durable promises</li>
            <li><span className="green-text">&#x2713;</span> Long-running (days, weeks, months)</li>
            <li><span className="green-text">&#x2713;</span> Queryable state while running</li>
            <li><span className="green-text">&#x2713;</span> Exactly-once execution per workflow ID</li>
          </ul>
          <div className="feature-callout">
            <strong>Use cases:</strong> User onboarding, order fulfillment, approval flows, subscription lifecycle, CI/CD pipelines
          </div>
        </div>
        <div className="feature-code">
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
{`const signup = restate.workflow({
  name: "UserSignup",
  handlers: {
    run: async (ctx, user) => {
      // Step 1: durable
      const userId = await ctx.run(
        () => createUser(user)
      );
      ctx.set("status", "awaiting_verification");

      // Step 2: send verification email
      await ctx.run(() => sendEmail(user));

      // Wait for user to click link
      // Survives restarts, can wait days
      const verified = await ctx
        .promise("email-verified");

      if (verified) {
        await ctx.run(() => activate(userId));
        ctx.set("status", "active");
      }
      return { userId, status: "complete" };
    },

    // External signal handler
    verifyEmail: async (ctx, payload) => {
      ctx.promise("email-verified")
        .resolve(true);
    },

    // Query handler — check status anytime
    status: async (ctx) => {
      return await ctx.get("status");
    }
  }
});`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

// NEW: Service Communication visual flow
function Feature_ServiceCommDiagram() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Service Communication &#8212; Modes</h2>
      <div className="comm-infographic">
        <div className="comm-mode">
          <div className="comm-mode-header">
            <h3>&#x1F4DE; Request-Response (Durable RPC)</h3>
          </div>
          <div className="comm-flow">
            <div className="comm-node">Order Service</div>
            <div className="comm-link">
              <span className="comm-link-label">await ctx.serviceClient(payment).charge()</span>
              <div className="comm-link-line bidir" />
            </div>
            <div className="comm-node">Payment Service</div>
          </div>
          <p className="comm-note">Caller waits for response. Survives crashes on both sides.</p>
        </div>
        <div className="comm-mode">
          <div className="comm-mode-header">
            <h3>&#x1F4E8; One-Way Send (Fire & Forget)</h3>
          </div>
          <div className="comm-flow">
            <div className="comm-node">Order Service</div>
            <div className="comm-link">
              <span className="comm-link-label">ctx.serviceSendClient(email).send()</span>
              <div className="comm-link-line unidir" />
            </div>
            <div className="comm-node">Email Service</div>
          </div>
          <p className="comm-note">Non-blocking. Guaranteed delivery. Perfect for notifications.</p>
        </div>
        <div className="comm-mode">
          <div className="comm-mode-header">
            <h3>&#x23F0; Delayed Call (Schedule)</h3>
          </div>
          <div className="comm-flow">
            <div className="comm-node">Order Service</div>
            <div className="comm-link">
              <span className="comm-link-label">ctx.serviceSendClient(reminder).send(data, {"{ delay: '24h' }"})</span>
              <div className="comm-link-line delayed" />
            </div>
            <div className="comm-node">Reminder Service</div>
          </div>
          <p className="comm-note">Executes after delay. Durable timer &#8212; survives restarts.</p>
        </div>
      </div>
    </div>
  );
}

function Feature_ServiceComm() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Service Communication &#8212; Code</h2>
      <div className="feature-showcase">
        <div className="feature-desc">
          <p>Restate provides <span className="highlight">reliable RPC and messaging</span> between services.
          Durably logged &#8212; no lost messages, no message brokers needed.</p>
          <ul className="feature-benefits">
            <li><span className="green-text">&#x2713;</span> Durable request-response RPC</li>
            <li><span className="green-text">&#x2713;</span> Fire-and-forget (but guaranteed)</li>
            <li><span className="green-text">&#x2713;</span> Delayed calls (durable scheduling)</li>
            <li><span className="green-text">&#x2713;</span> Cross-language (TS &#8594; Python &#8594; Java)</li>
            <li><span className="green-text">&#x2713;</span> Replaces Kafka/RabbitMQ for service comms</li>
          </ul>
        </div>
        <div className="feature-code">
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyle}>
{`// 1. Durable RPC — survives crashes
const result = await ctx
  .serviceClient(paymentService)
  .charge({ amount: 99.99, orderId });

// 2. One-way — guaranteed delivery
ctx.serviceSendClient(emailService)
  .sendReceipt({
    to: "user@mail.com",
    orderId, amount: 99.99
  });

// 3. Delayed call — 24 hours later
ctx.serviceSendClient(reminderService)
  .sendReviewReminder(
    { userId, orderId },
    { delay: "24h" }
  );

// 4. Call virtual object by key
const cart = await ctx
  .objectClient(ShoppingCart, "cart-123")
  .getCart();`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

function Feature_StateTimers() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Features: Durable State & Timers</h2>
      <div className="two-col">
        <div className="col">
          <h3 className="feature-title">&#x1F4BE; Durable K/V State</h3>
          <p className="muted compact-p">Managed by Restate. No external DB needed. Scoped to Virtual Objects.</p>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyleSmall}>
{`// Get state (typed, per-key)
const count = await ctx.get("counter") || 0;

// Set state (persisted by Restate)
ctx.set("counter", count + 1);

// Clear a single key
ctx.clear("counter");

// Clear all state for this object
ctx.clearAll();

// List all state keys
const keys = ctx.stateKeys();`}
          </SyntaxHighlighter>
        </div>
        <div className="col">
          <h3 className="feature-title">&#x23F0; Durable Timers</h3>
          <p className="muted compact-p">Sleep for days. Restate wakes your service. Survives any restart.</p>
          <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={codeStyleSmall}>
{`// Sleep 7 days — durable!
await ctx.sleep(7 * 24 * 3600 * 1000);

// This runs after 7 days, even if
// the service restarts 100 times
await ctx.run(() =>
  sendReminder(userId)
);

// Delayed calls to services
ctx.serviceSendClient(analytics)
  .aggregate({ delay: "1h" });

// Delayed call to virtual object
ctx.objectSendClient(Cart, cartId)
  .expire({ delay: "30m" });`}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

function Feature_ExactlyOnce() {
  return (
    <div className="slide">
      <h2><span className="accent num">07</span> Feature: Exactly-Once Semantics</h2>
      <div className="exactly-once-demo">
        <div className="eo-scenario">
          <h3>The Double-Charge Problem</h3>
          <div className="eo-flow">
            <div className="eo-step">1. Client sends request</div>
            <div className="eo-step">2. Payment charged &#x2713;</div>
            <div className="eo-step crash">3. Network timeout &#x1F4A5;</div>
            <div className="eo-step">4. Client retries...</div>
          </div>
        </div>
        <div className="eo-comparison">
          <div className="eo-box red-border">
            <h4>&#x274C; Without Restate</h4>
            <p>Customer charged <strong>twice</strong>. Need idempotency keys, dedup stores, careful retry handling.</p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{...codeStyleSmall, fontSize: '0.6rem'}}>
{`// You must track this yourself
const key = \`charge-\${orderId}\`;
const existing = await redis.get(key);
if (existing) return existing;
const result = await stripe.charge(amount);
await redis.set(key, result, 'EX', 86400);`}
            </SyntaxHighlighter>
          </div>
          <div className="eo-box green-border">
            <h4>&#x2705; With Restate</h4>
            <p>Automatic deduplication. Journal knows step completed. <strong>Charged once.</strong></p>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus} customStyle={{...codeStyleSmall, fontSize: '0.6rem'}}>
{`// That's it. Restate handles it.
const result = await ctx.run(() =>
  stripe.charge(amount)
);
// No redis. No idempotency key.
// No dedup logic. Just works.`}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </div>
  );
}

function PolyglotSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">08</span> Polyglot SDKs</h2>
      <div className="sdk-grid">
        <div className="sdk-card">
          <div className="sdk-header">
            <span className="lang-icon ts">TS</span>
            <h3>TypeScript / Node.js</h3>
          </div>
          <SyntaxHighlighter language="typescript" style={vscDarkPlus} customStyle={codeStyleSmall}>
{`import * as restate from
  "@restatedev/restate-sdk";

const svc = restate.service({
  name: "Greeter",
  handlers: {
    greet: async (ctx, name) => {
      const count = await ctx.run(
        () => incrementCounter(name)
      );
      return \`Hello \${name}! (#\${count})\`;
    }
  }
});

restate.endpoint()
  .bind(svc).listen(9080);`}
          </SyntaxHighlighter>
        </div>
        <div className="sdk-card">
          <div className="sdk-header">
            <span className="lang-icon py">PY</span>
            <h3>Python</h3>
          </div>
          <SyntaxHighlighter language="python" style={vscDarkPlus} customStyle={codeStyleSmall}>
{`import restate
from restate import Context

greeter = restate.Service("Greeter")

@greeter.handler()
async def greet(
    ctx: Context, name: str
) -> str:
    count = await ctx.run(
        "increment",
        lambda: increment_counter(name)
    )
    return f"Hello {name}! (#{count})"

app = restate.app(services=[greeter])`}
          </SyntaxHighlighter>
        </div>
        <div className="sdk-card">
          <div className="sdk-header">
            <span className="lang-icon java">JV</span>
            <h3>Java / Spring Boot</h3>
          </div>
          <SyntaxHighlighter language="java" style={vscDarkPlus} customStyle={codeStyleSmall}>
{`@Service
public class Greeter {

  @Handler
  public String greet(
      Context ctx, String name) {

    int count = ctx.run(
      JsonSerdes.INT,
      () -> incrementCounter(name)
    );

    return "Hello " + name
      + "! (#" + count + ")";
  }
}`}
          </SyntaxHighlighter>
        </div>
      </div>
      <p className="center-text muted" style={{marginTop: '0.8rem', fontSize: '0.85rem'}}>
        Also: Go, Rust &#x2022; All SDKs interoperate &#8212; call Python from TypeScript, Java from Python
      </p>
    </div>
  );
}

function ComparisonSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">09</span> Restate vs Conventional</h2>
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Concern</th>
              <th>Conventional</th>
              <th>With Restate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Retries', 'Manual retry + idempotency keys', 'Automatic &#8212; journaled & deduped'],
              ['State', 'External DB (Redis, Postgres)', 'Built-in K/V state'],
              ['Messaging', 'Kafka/RabbitMQ + DLQs', 'Durable RPC & messaging'],
              ['Sagas', 'Manual compensating txns', 'Durable execution = no partials'],
              ['Scheduling', 'Cron + timer service', 'Durable timers & delayed calls'],
              ['Concurrency', 'Distributed locks (Redis/ZK)', 'Virtual Object single-writer'],
              ['Observability', 'Custom logging + tracing', 'Built-in invocation tracking'],
            ].map(([concern, conv, rest], i) => (
              <tr key={i}>
                <td>{concern}</td>
                <td className="red-text" dangerouslySetInnerHTML={{__html: conv}} />
                <td className="green-text" dangerouslySetInnerHTML={{__html: rest}} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function VsAlternativesSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">09</span> Restate vs Alternatives</h2>
      <div className="comparison-table">
        <table>
          <thead>
            <tr>
              <th></th>
              <th className="highlight-col">Restate</th>
              <th>Temporal</th>
              <th>AWS Step Functions</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Model</td><td className="highlight-col">Regular code</td><td>Workflow + Activity split</td><td>JSON/YAML state machine</td></tr>
            <tr><td>Learning Curve</td><td className="highlight-col green-text">Low</td><td className="yellow-text">Medium</td><td className="red-text">High</td></tr>
            <tr><td>Latency</td><td className="highlight-col green-text">~1ms overhead</td><td className="yellow-text">~50ms overhead</td><td className="red-text">~100ms+ overhead</td></tr>
            <tr><td>Deployment</td><td className="highlight-col">Single binary</td><td>Server + DB cluster</td><td>AWS only</td></tr>
            <tr><td>K/V State</td><td className="highlight-col green-text">Built-in</td><td className="red-text">No</td><td className="red-text">No</td></tr>
            <tr><td>Virtual Objects</td><td className="highlight-col green-text">Yes</td><td className="red-text">No</td><td className="red-text">No</td></tr>
            <tr><td>Vendor Lock-in</td><td className="highlight-col green-text">None</td><td className="yellow-text">Low</td><td className="red-text">AWS only</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DemoArchSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">10</span> Demo: E-Commerce Architecture</h2>
      <div className="demo-arch">
        <div className="demo-flow">
          <div className="demo-service node-color">
            <div className="demo-lang">Node.js / TypeScript</div>
            <h3>Order Service</h3>
            <ul>
              <li>Create order</li>
              <li>Orchestrate workflow</li>
              <li>Order status tracking</li>
            </ul>
          </div>
          <div className="demo-arrow"><span>ctx.serviceClient()</span></div>
          <div className="demo-service python-color">
            <div className="demo-lang">Python</div>
            <h3>Payment Service</h3>
            <ul>
              <li>Charge customer</li>
              <li>Process refunds</li>
              <li>Payment status</li>
            </ul>
          </div>
          <div className="demo-arrow"><span>ctx.serviceClient()</span></div>
          <div className="demo-service java-color">
            <div className="demo-lang">Spring Boot / Java</div>
            <h3>Shipping Service</h3>
            <ul>
              <li>Create shipment</li>
              <li>Track delivery</li>
              <li>Update status</li>
            </ul>
          </div>
        </div>
        <div className="demo-restate-bar">
          <RestateLogo small />
          <span>Restate Server &#8212; managing durability, state & communication</span>
        </div>
      </div>
    </div>
  );
}

function DeploymentSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">11</span> Getting Started</h2>
      <div className="three-col">
        <div className="card">
          <div className="card-icon">&#x1F5A5;</div>
          <h3>Self-Hosted</h3>
          <p>Single binary. Docker or direct.</p>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={codeStyleSmall}>
{`# Download & run
brew install restatedev/tap/restate-server
restate-server`}
          </SyntaxHighlighter>
        </div>
        <div className="card accent-border">
          <div className="card-icon">&#x2601;</div>
          <h3>Restate Cloud</h3>
          <p>Fully managed. No infra to maintain.</p>
          <div className="tag" style={{marginTop: '0.8rem'}}>Recommended for prod</div>
        </div>
        <div className="card">
          <div className="card-icon">&#x1F433;</div>
          <h3>Kubernetes</h3>
          <p>Helm charts available.</p>
          <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={codeStyleSmall}>
{`helm install restate \\
  oci://ghcr.io/restatedev/restate`}
          </SyntaxHighlighter>
        </div>
      </div>
      <div className="register-box">
        <h4>Register services & invoke</h4>
        <SyntaxHighlighter language="bash" style={vscDarkPlus} customStyle={{...codeStyleSmall, fontSize: '0.8rem'}}>
{`# Register your service endpoint
restate deployments register http://localhost:9080

# Invoke a handler via HTTP
curl -X POST http://localhost:8080/Greeter/greet -d '"World"'`}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

function RecapSlide() {
  return (
    <div className="slide">
      <h2><span className="accent num">12</span> What Restate Gives You</h2>
      <div className="recap-grid">
        {[
          ['&#x1F504;', 'Durable Execution', 'Code runs to completion, always'],
          ['&#x1F3AF;', 'Exactly-Once', 'No double charges, no lost events'],
          ['&#x1F4E6;', 'Virtual Objects', 'Stateful entities with K/V state'],
          ['&#x23F1;', 'Durable Timers', 'Sleep for days, survive restarts'],
          ['&#x1F4E1;', 'Service Comms', 'Reliable RPC + async messaging'],
          ['&#x1F500;', 'Workflows', 'Long-running, with external signals'],
          ['&#x1F310;', 'Polyglot', 'TS, Python, Java, Go, Rust'],
          ['&#x1F680;', 'Low Overhead', 'Single binary, ~1ms latency'],
        ].map(([icon, title, desc], i) => (
          <div className="recap-item" key={i}>
            <span className="recap-icon" dangerouslySetInnerHTML={{__html: icon}} />
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function QASlide() {
  return (
    <div className="slide slide-title">
      <div className="title-glow" />
      <h1><span className="gradient-text">Questions?</span></h1>
      <p className="subtitle">Let's discuss!</p>
      <div className="qa-links">
        {[
          ['Website', 'restate.dev'],
          ['Docs', 'docs.restate.dev'],
          ['GitHub', 'github.com/restatedev'],
          ['Discord', 'discord.gg/restate'],
        ].map(([label, url]) => (
          <div className="qa-link" key={label}>
            <span className="qa-label">{label}</span>
            <span className="qa-url">{url}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── All Slides ─────────────────────────────────────────────────

const slides = [
  TitleSlide,
  AgendaSlide,
  WhatIsResiliencySlide,
  DistributedFailuresSlide,
  WhyResiliencyMattersSlide,
  RetryPatternSlide,
  CircuitBreakerSlide,
  SagaPatternSlide,
  MorePatternsSlide,
  ComplexityProblemSlide,
  EnterRestateSlide,
  WhatIsRestateSlide,
  ArchitectureSlide,
  HowJournalingWorksSlide,
  DurableExecutionSlide,
  BeforeAfterSlide,
  Feature_DurableExecution,
  Feature_VirtualObjectsDiagram,
  Feature_VirtualObjects,
  Feature_WorkflowDiagram,
  Feature_Workflows,
  Feature_ServiceCommDiagram,
  Feature_ServiceComm,
  Feature_StateTimers,
  Feature_ExactlyOnce,
  PolyglotSlide,
  ComparisonSlide,
  VsAlternativesSlide,
  DemoArchSlide,
  DeploymentSlide,
  RecapSlide,
  QASlide,
];

// ─── App ────────────────────────────────────────────────────────

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  }, []);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const goNext = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(slides.length - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && !document.fullscreenElement) {
        // Escape is handled by browser for fullscreen exit
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, toggleFullscreen]);

  const SlideComponent = slides[currentSlide];

  return (
    <div className="presentation">
      <div className="slide-container" key={currentSlide}>
        <SlideComponent />
      </div>
      <div className="controls">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
          />
        </div>
        <div className="controls-inner">
          <button onClick={goPrev} disabled={currentSlide === 0} className="nav-btn">&#x2190;</button>
          <span className="slide-counter">{currentSlide + 1} / {slides.length}</span>
          <button onClick={goNext} disabled={currentSlide === slides.length - 1} className="nav-btn">&#x2192;</button>
          <button onClick={toggleFullscreen} className="nav-btn fullscreen-btn" title="Toggle fullscreen (F)">
            {isFullscreen ? '\u2715 Exit' : '\u26F6 Fullscreen'}
          </button>
          <span className="nav-hint">Arrow keys to navigate &#x2022; F for fullscreen</span>
        </div>
      </div>
    </div>
  );
}

export default App;
