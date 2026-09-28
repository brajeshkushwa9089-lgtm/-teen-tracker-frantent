import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return <main className="welcome-shell"><p>That page does not exist. <Link to="/">Return home</Link>.</p></main>;
}
