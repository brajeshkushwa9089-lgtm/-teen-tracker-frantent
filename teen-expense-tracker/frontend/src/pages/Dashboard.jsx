import React, { useState } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const navigation = [
  ['⌂', 'Dashboard'], ['↗', 'Expenses'], ['↓', 'Income'],
  ['◎', 'Budgets'], ['⌁', 'Analytics']
];

const demoActivity = [
  { day: 'Mon', amount: 120 }, { day: 'Tue', amount: 80 }, { day: 'Wed', amount: 260 },
  { day: 'Thu', amount: 150 }, { day: 'Fri', amount: 420 }, { day: 'Sat', amount: 195 }, { day: 'Sun', amount: 90 }
];

const demoTransactions = [
  ['🍕', 'Food', 'Pizza with friends', 'Today', '₹250'],
  ['🚌', 'Transport', 'Metro recharge', 'Yesterday', '₹120'],
  ['📚', 'Education', 'Notebook set', '24 Sep', '₹180']
];

function StatCard({ label, value, detail, tone }) {
  return (
    <article className={`stat-card ${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}

function EmptyWorkspace({ title, description, icon }) {
  return <div className="workspace-empty"><span>{icon}</span><h2>{title}</h2><p>{description}</p><button type="button">Create account to get started →</button></div>;
}

function WorkspacePage({ page, isDemo }) {
  if (!isDemo) {
    const emptyCopy = {
      Expenses: ['No expenses yet', 'Your purchases will appear here once you add your first expense.', '↗'],
      Income: ['No income records yet', 'Add allowance, gifts, or part-time earnings to see your full balance.', '↓'],
      Budgets: ['Set your first budget', 'Create category limits to keep an eye on monthly spending.', '◎'],
      Analytics: ['Your insights will grow here', 'Add a few transactions to unlock your personal spending trends.', '⌁']
    };
    const [title, description, icon] = emptyCopy[page];
    return <section className="workspace-panel"><div className="workspace-title"><div><p className="eyebrow">{page}</p><h2>{page === 'Analytics' ? 'Understand your money' : `Your ${page.toLowerCase()}`}</h2></div><span className="live-pill">Your data</span></div><EmptyWorkspace title={title} description={description} icon={icon} /></section>;
  }

  if (page === 'Expenses') return <section className="workspace-panel"><div className="workspace-title"><div><p className="eyebrow">Demo data</p><h2>Expenses that add up</h2></div><button className="primary-action" type="button">+ Add expense</button></div><div className="filter-row"><span>September 2026</span><span>All categories</span><span>All payments</span><label>⌕ <input aria-label="Search expenses" placeholder="Search expenses" /></label></div><div className="premium-table">{demoTransactions.concat([['🎮', 'Gaming', 'Game pass', '22 Sep', '₹299'], ['🧃', 'Food', 'After-school snack', '20 Sep', '₹86']]).map(([icon, category, description, date, amount]) => <div className="table-row" key={description}><span className="transaction-icon">{icon}</span><div><b>{description}</b><small>{category} · {date}</small></div><strong>- {amount}</strong><button type="button" aria-label={`More options for ${description}`}>•••</button></div>)}</div></section>;
  if (page === 'Income') return <section className="workspace-panel"><div className="workspace-title"><div><p className="eyebrow">Demo data</p><h2>Your incoming money</h2></div><button className="primary-action" type="button">+ Add income</button></div><div className="income-hero"><div><span>Monthly income</span><strong>₹5,000</strong><small>100% from your monthly allowance</small></div><i>₹</i></div><div className="income-source"><span className="transaction-icon">🎁</span><div><b>Monthly allowance</b><small>1 September 2026</small></div><strong>+ ₹5,000</strong></div></section>;
  if (page === 'Budgets') return <section className="workspace-panel"><div className="workspace-title"><div><p className="eyebrow">Demo data</p><h2>Budgets with breathing room</h2></div><button className="primary-action" type="button">+ Create budget</button></div><div className="budget-cards"><article><span>🍔 Food</span><b>₹680 <em>of ₹1,200</em></b><i><u className="food-progress" /></i><small>₹520 remaining · On track</small></article><article><span>🎮 Fun</span><b>₹420 <em>of ₹700</em></b><i><u className="fun-progress" /></i><small>₹280 remaining · Watch spending</small></article><article><span>🛍️ Shopping</span><b>₹310 <em>of ₹800</em></b><i><u className="shop-progress" /></i><small>₹490 remaining · On track</small></article></div></section>;
  return <section className="workspace-panel"><div className="workspace-title"><div><p className="eyebrow">Demo data</p><h2>Your spending patterns</h2></div><span className="live-pill">September</span></div><div className="analytics-grid"><article><h3>Spending this week</h3><ResponsiveContainer width="100%" height={220}><AreaChart data={demoActivity} margin={{ top: 18, right: 4, left: -24, bottom: 0 }}><defs><linearGradient id="analyticsGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8f7aec" stopOpacity={.38}/><stop offset="100%" stopColor="#8f7aec" stopOpacity={.02}/></linearGradient></defs><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#898696', fontSize: 12 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: '#898696', fontSize: 12 }}/><Tooltip formatter={(value) => [`₹${value}`, 'Spent']} /><Area type="monotone" dataKey="amount" stroke="#7d68dd" strokeWidth={3} fill="url(#analyticsGradient)" /></AreaChart></ResponsiveContainer></article><article className="category-breakdown"><h3>Top categories</h3><div><span>🍔 Food <b>39%</b></span><i><u className="food-progress" /></i></div><div><span>🎮 Fun <b>24%</b></span><i><u className="fun-progress" /></i></div><div><span>🚌 Transport <b>19%</b></span><i><u className="shop-progress" /></i></div><p>Food is your biggest category in this demo.</p></article></div></section>;
}

export default function Dashboard() {
  const [isDemo, setIsDemo] = useState(false);
  const [activePage, setActivePage] = useState('Dashboard');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [accountName, setAccountName] = useState(() => sessionStorage.getItem('teenspend_preview_name') || '');
  const [accountEmail, setAccountEmail] = useState(() => sessionStorage.getItem('teenspend_preview_email') || '');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [signupError, setSignupError] = useState('');

  const createPreviewAccount = (event) => {
    event.preventDefault();
    const details = new FormData(event.currentTarget);
    const name = details.get('name').trim();
    const email = details.get('email').trim();
    const password = details.get('password');
    const confirmation = details.get('confirmation');

    if (password !== confirmation) {
      setSignupError('Passwords do not match. Please check them and try again.');
      return;
    }

    sessionStorage.setItem('teenspend_preview_name', name);
    sessionStorage.setItem('teenspend_preview_email', email);
    sessionStorage.setItem('teenspend_preview_created_at', new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }));
    setAccountName(name);
    setAccountEmail(email);
    setSignupError('');
    setIsSignupOpen(false);
  };

  const updateProfile = (event) => {
    event.preventDefault();
    const details = new FormData(event.currentTarget);
    const name = details.get('profileName').trim();
    const email = details.get('profileEmail').trim();
    sessionStorage.setItem('teenspend_preview_name', name);
    sessionStorage.setItem('teenspend_preview_email', email);
    setAccountName(name);
    setAccountEmail(email);
    setIsProfileOpen(false);
  };

  const initials = accountName ? accountName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() : 'TS';

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="/" aria-label="TeenSpend dashboard"><span>₹</span> TeenSpend</a>
        <p className="brand-tagline">Spend with confidence.</p>
        <p className="nav-label">Workspace</p>
        <nav aria-label="Main navigation">
          {navigation.map(([icon, label]) => (
            <button className={activePage === label ? 'nav-item active' : 'nav-item'} key={label} type="button" onClick={() => setActivePage(label)}>
              <span className="nav-icon" aria-hidden="true">{icon}</span>{label}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <button className="sidebar-quick" type="button" onClick={() => accountName ? setIsProfileOpen(true) : setIsSignupOpen(true)}><span>+</span>{accountName ? 'Manage profile' : 'Create account'}</button>
          {accountName && <button className="sidebar-user" type="button" onClick={() => setIsProfileOpen(true)}><span>{initials}</span><div><b>{accountName}</b><small>Preview profile</small></div><em>›</em></button>}
          <div className="privacy-note"><span>🔒</span><p>Your money data stays private and is only shown after you sign in.</p></div>
        </div>
      </aside>

      <main className="dashboard">
        <header className="topbar">
          <div><p className="eyebrow">{activePage === 'Dashboard' ? 'Your money, made simple' : activePage}</p><h1>{activePage === 'Dashboard' ? (isDemo ? 'Your demo spending story ✨' : accountName ? `Welcome, ${accountName} 👋` : 'Welcome to TeenSpend 👋') : `${activePage} at a glance`}</h1><p className="subtext">{isDemo ? 'Demo data is shown only for this preview and is never saved.' : accountName ? 'Your preview profile is ready. Connect Supabase to save real transactions.' : 'Start with your first transaction to see your spending story.'}</p></div>
          <div className="header-actions"><button className="demo-toggle" type="button" onClick={() => setIsDemo((value) => !value)}>{isDemo ? 'Exit demo' : 'Preview demo'}</button><button className="profile" type="button" onClick={() => accountName ? setIsProfileOpen(true) : setIsSignupOpen(true)} aria-label="Profile settings">{initials}</button></div>
        </header>

        {activePage === 'Dashboard' ? <><section className="summary-grid" aria-label="Money overview">
          <StatCard label="Total balance" value={isDemo ? '₹3,245' : '₹0'} detail="Income minus expenses" tone="balance" />
          <StatCard label="This month's income" value={isDemo ? '₹5,000' : '₹0'} detail={isDemo ? 'Monthly allowance' : 'No income recorded yet'} tone="income" />
          <StatCard label="This month's expenses" value={isDemo ? '₹1,755' : '₹0'} detail={isDemo ? '6 transactions this month' : 'No expenses recorded yet'} tone="expense" />
          <StatCard label="Daily average" value={isDemo ? '₹63' : '₹0'} detail="Based on this month" tone="average" />
        </section>

        <section className="dashboard-grid">
          <article className="panel empty-panel">
            <div className="panel-heading"><div><p className="eyebrow">Spending overview</p><h2>Your monthly activity</h2></div><span className="chip">This month</span></div>
            {isDemo ? <div className="chart-wrap"><ResponsiveContainer width="100%" height={220}><AreaChart data={demoActivity} margin={{ top: 18, right: 4, left: -24, bottom: 0 }}><defs><linearGradient id="spendGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#8f7aec" stopOpacity={.38}/><stop offset="100%" stopColor="#8f7aec" stopOpacity={.02}/></linearGradient></defs><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#898696', fontSize: 12 }}/><YAxis axisLine={false} tickLine={false} tick={{ fill: '#898696', fontSize: 12 }}/><Tooltip formatter={(value) => [`₹${value}`, 'Spent']} cursor={{ stroke: '#d8d2fb' }}/><Area type="monotone" dataKey="amount" stroke="#7d68dd" strokeWidth={3} fill="url(#spendGradient)" /></AreaChart></ResponsiveContainer></div> : <div className="empty-chart"><div className="chart-icon">↗</div><h3>No spending to show yet</h3><p>Add an expense after signing in and this chart will show how your spending changes over time.</p></div>}
          </article>
          <article className="panel budget-panel">
            <div className="panel-heading"><div><p className="eyebrow">Plan ahead</p><h2>Budget status</h2></div></div>
            {isDemo ? <div className="budget-list"><div><span><b>🍔 Food</b><em>₹680 / ₹1,200</em></span><i><u className="food-progress" /></i><small>57% used</small></div><div><span><b>🎮 Fun</b><em>₹420 / ₹700</em></span><i><u className="fun-progress" /></i><small>60% used</small></div><div><span><b>🛍️ Shopping</b><em>₹310 / ₹800</em></span><i><u className="shop-progress" /></i><small>39% used</small></div></div> : <div className="budget-empty"><span>◎</span><h3>No budgets yet</h3><p>Set a category budget to track your monthly progress.</p></div>}
          </article>
        </section>

        <section className="dashboard-grid lower-grid">
          <article className="panel transactions-panel">
            <div className="panel-heading"><div><p className="eyebrow">Latest activity</p><h2>Recent transactions</h2></div><button className="text-button" type="button" disabled>View all</button></div>
            {isDemo ? <div className="transactions">{demoTransactions.map(([icon, category, description, date, amount]) => <div className="transaction" key={description}><span className="transaction-icon">{icon}</span><div><b>{description}</b><small>{category} · {date}</small></div><strong>- {amount}</strong></div>)}</div> : <div className="transaction-empty"><span>✦</span><div><h3>Your transactions will appear here</h3><p>Add income or expenses to build a clear record of your money.</p></div></div>}
          </article>
          <article className="panel insight-panel">
            <p className="eyebrow">Smart insights</p><h2>{isDemo ? 'Food is your top category' : 'Helpful, never judgmental'}</h2><p>{isDemo ? 'In this demo, Food is ₹680 of ₹1,755 total spending. Reviewing purchases can help you understand the pattern.' : 'Based on your recorded spending, TeenSpend will point out patterns and budget progress here.'}</p>
            <span className="data-note">Personal tracking, not financial advice</span>
          </article>
        </section>

        <section className="start-card"><div><span className="start-icon">+</span><div><h2>{accountName ? 'Preview profile active' : 'Ready to start tracking?'}</h2><p>{accountName ? 'Connect Supabase next to make this a permanent, secure account.' : 'Create an account to securely save expenses, income, budgets, and insights.'}</p></div></div><button type="button" onClick={() => { if (accountName) setIsProfileOpen(true); else { setSignupError(''); setIsSignupOpen(true); } }}>{accountName ? 'View profile' : 'Create account'} <span>→</span></button></section></> : <WorkspacePage page={activePage} isDemo={isDemo} />}
      </main>
      {isSignupOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsSignupOpen(false)}><section className="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setIsSignupOpen(false)} aria-label="Close create account form">×</button><p className="eyebrow">Get started</p><h2 id="signup-title">Create your TeenSpend profile</h2><p className="modal-intro">This creates a local preview profile for this browser session. Passwords are never stored locally.</p><form onSubmit={createPreviewAccount}><label>Full name<input name="name" type="text" minLength="2" maxLength="100" placeholder="Your name" required autoFocus /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" required /></label><label>Password<input name="password" type="password" minLength="8" placeholder="At least 8 characters" required /></label><label>Confirm password<input name="confirmation" type="password" minLength="8" placeholder="Repeat your password" required /></label>{signupError && <p className="form-error" role="alert">{signupError}</p>}<button className="signup-submit" type="submit">Create preview account <span>→</span></button></form><p className="modal-footnote">For permanent accounts, TeenSpend will use bcrypt, JWT, and Supabase after the backend credentials are configured.</p></section></div>}
      {isProfileOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setIsProfileOpen(false)}><section className="signup-modal profile-modal" role="dialog" aria-modal="true" aria-labelledby="profile-title" onMouseDown={(event) => event.stopPropagation()}><button className="modal-close" type="button" onClick={() => setIsProfileOpen(false)} aria-label="Close profile">×</button><div className="profile-hero"><span>{initials}</span><div><p className="eyebrow">Preview profile</p><h2 id="profile-title">{accountName || 'TeenSpend member'}</h2><p>{accountEmail || 'Add your email below'}</p></div></div><div className="profile-meta"><span><b>Currency</b><em>INR · ₹</em></span><span><b>Account status</b><em>Local preview</em></span><span><b>Created</b><em>{sessionStorage.getItem('teenspend_preview_created_at') || 'This browser session'}</em></span></div><form onSubmit={updateProfile}><label>Full name<input name="profileName" type="text" minLength="2" maxLength="100" defaultValue={accountName} required /></label><label>Email address<input name="profileEmail" type="email" defaultValue={accountEmail} placeholder="you@example.com" required /></label><button className="signup-submit" type="submit">Save profile details <span>→</span></button></form><p className="modal-footnote">Profile values are held only in this browser session. Supabase authentication will make the profile permanent.</p></section></div>}
    </div>
  );
}
