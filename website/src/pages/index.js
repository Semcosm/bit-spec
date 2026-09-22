import React from 'react';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <main>
      <header className="homeHero">
        <div className="container">
          <p className="eyebrow">Working Draft</p>
          <h1>Bit Specification</h1>
          <p className="homeHero__subtitle">
            A portable systems language and a verifiable intermediate representation,
            documented as contracts for implementations.
          </p>
          <div className="homeHero__actions">
            <Link className="button button--primary button--lg" to="/docs/">
              Read the documentation
            </Link>
            <Link className="button button--secondary button--lg" to="/docs/index">
              Browse the index
            </Link>
          </div>
        </div>
      </header>

      <section className="homeSection container" aria-labelledby="core-contracts">
        <div className="sectionHeading">
          <p className="eyebrow">Core contracts</p>
          <h2 id="core-contracts">Start with the three layers</h2>
          <p>
            Read source semantics first, then the representation and the boundaries that make an implementation portable.
          </p>
        </div>
        <div className="homeGrid homeGrid--three">
          <Link className="homeCard" to="/docs/spec/bit/language">
            <span className="homeCard__index">01</span>
            <h3>Bit language</h3>
            <p>Syntax, semantics, types, ownership, memory, concurrency, and modules.</p>
            <span className="homeCard__link">Open language specification</span>
          </Link>
          <Link className="homeCard" to="/docs/spec/bir/overview">
            <span className="homeCard__index">02</span>
            <h3>BIR</h3>
            <p>A typed, region-based IR with explicit effects, control flow, and verification rules.</p>
            <span className="homeCard__link">Open BIR specification</span>
          </Link>
          <Link className="homeCard" to="/docs/architecture/overview">
            <span className="homeCard__index">03</span>
            <h3>Architecture</h3>
            <p>Compilation stages, trust boundaries, dependencies, and the LLVM seed direction.</p>
            <span className="homeCard__link">Open architecture guide</span>
          </Link>
        </div>
      </section>

      <section className="homeSection homeSection--muted" aria-labelledby="read-spec">
        <div className="container homeSplit">
          <div>
            <p className="eyebrow">How to read the spec</p>
            <h2 id="read-spec">Follow contracts from source to target</h2>
            <p>
              Normative rules define behavior. Architecture and design documents explain boundaries. Guides show how to apply the contracts without inventing unspecified behavior.
            </p>
          </div>
          <div className="homeLinks">
            <Link to="/docs/guides/overview">Read the contributor guides <span aria-hidden="true">-&gt;</span></Link>
            <Link to="/docs/rfcs/rfc-process">Understand the RFC process <span aria-hidden="true">-&gt;</span></Link>
            <Link to="/docs/conformance/">Review conformance expectations <span aria-hidden="true">-&gt;</span></Link>
          </div>
        </div>
      </section>

      <section className="homeSection container" aria-labelledby="status">
        <div className="sectionHeading sectionHeading--row">
          <div>
            <p className="eyebrow">Project status</p>
            <h2 id="status">What is ready, and what is next</h2>
          </div>
          <p>The repository is a working draft. A document becomes normative only after the RFC process accepts it.</p>
        </div>
        <div className="homeGrid homeGrid--four">
          <div className="statusItem statusItem--ready"><strong>Ready</strong><span>Language and BIR draft contracts</span></div>
          <div className="statusItem statusItem--ready"><strong>Ready</strong><span>Architecture and design rationale</span></div>
          <div className="statusItem statusItem--next"><strong>Next</strong><span>ABI, runtime, and bootstrap profiles</span></div>
          <div className="statusItem statusItem--next"><strong>Next</strong><span>Executable conformance fixtures</span></div>
        </div>
      </section>
    </main>
  );
}
