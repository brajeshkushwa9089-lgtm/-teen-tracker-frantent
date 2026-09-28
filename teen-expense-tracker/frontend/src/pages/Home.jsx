import React from 'react';

export default function Home() {
  return (
    <main className="welcome-shell">
      <section className="welcome-card" aria-labelledby="app-title">
        <span className="eyebrow">TeenSpend</span>
        <h1 id="app-title">Track it. Understand it. Spend smarter.</h1>
        <p>Your friendly money tracker is ready. Authentication, transactions, and insights will be added in the next phases.</p>
        <span className="status">Project setup complete</span>
      </section>
    </main>
  );
}
