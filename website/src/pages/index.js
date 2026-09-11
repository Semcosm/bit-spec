import React from 'react';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <main className="container margin-vert--lg">
      <div className="hero hero--primary">
        <div className="container">
          <h1 className="hero__title">Bit Specification</h1>
          <p className="hero__subtitle">
            A portable language and a verifiable intermediate representation.
          </p>
          <Link className="button button--secondary button--lg" to="/docs/">
            Read the documentation
          </Link>
        </div>
      </div>
    </main>
  );
}
