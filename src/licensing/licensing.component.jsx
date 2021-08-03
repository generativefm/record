import React from 'react';
import { Link } from 'react-router-dom';
import './licensing.styles.scss';

const Licensing = () => (
  <div className="licensing text-content">
    <h1>Creative Commons License</h1>
    <h2>For anyone and everyone</h2>
    <p>
      Music from Generative.fm is officially licensed under a{' '}
      <a
        href="https://creativecommons.org/licenses/by/4.0/"
        rel="noreferrer noopener"
        target="_blank"
      >
        Creative Commons Attribution 4.0 International License (CC BY 4.0)
      </a>
      . Generally, you are welcome to use or modify the music for any purpose,
      including commercially or publicly, provided you give appropriate credit.
    </p>
    <p>It&apos;s as easy as adding something like this to your work:</p>
    <ul>
      <li>
        &quot;
        <a
          href="https://generative.fm/music/alex-bainter-above-the-rain"
          rel="noreferrer noopener"
          target="_blank"
        >
          Above the Rain (Excerpt)
        </a>
        &quot; by{' '}
        <a
          href="https://alexbainter.com"
          rel="noreferrer noopener"
          target="_blank"
        >
          Alex Bainter
        </a>{' '}
        is licensed under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          rel="noreferrer noopener"
          target="_blank"
        >
          CC BY 4.0
        </a>
      </li>
    </ul>
    <p>Or even just:</p>
    <ul>
      <li>
        <a
          href="https://generative.fm"
          rel="noreferrer noopener"
          target="_blank"
        >
          Music
        </a>{' '}
        by{' '}
        <a
          href="https://alexbainter.com"
          rel="noreferrer noopener"
          target="_blank"
        >
          Alex Bainter
        </a>{' '}
        /{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          rel="noreferrer noopener"
          target="_blank"
        >
          CC BY
        </a>
      </li>
    </ul>
    <p>
      See &quot;
      <a
        href="https://creativecommons.org/use-remix/attribution/"
        rel="noreferrer noopener"
        target="_blank"
      >
        How to give attribution
      </a>
      &quot; from Creative Commons. Please pretend to read the{' '}
      <a
        href="https://creativecommons.org/licenses/by/4.0/legalcode"
        rel="noreferrer noopener"
        target="_blank"
      >
        official licensing terms
      </a>{' '}
      before using music from this service.
    </p>
    <p>
      You can show your appreciation by making a{' '}
      <Link to="/donate">donation</Link>.
    </p>
  </div>
);

export default Licensing;
