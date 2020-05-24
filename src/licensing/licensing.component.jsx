import React from 'react';
import { Link } from 'react-router-dom';

const Licensing = () => (
  <div className="licensing text-content">
    <h1>Creative Commons License</h1>
    <h2>Free for anyone and everyone</h2>
    <p>
      Music from Generative.fm is officially licensed under a{' '}
      <a href="https://creativecommons.org/licenses/by/4.0/">
        Creative Commons Attribution 4.0 International License (CC BY 4.0)
      </a>
      . Generally, you are welcome to use or modify the music for any purpose,
      including commercially or publicly, provided you give appropriate credit.
    </p>
    <p>It's as easy as adding something like this to your work:</p>
    <ul>
      <li>"Music by Alex Bainter"</li>
      <li>"[piece title] (Excerpt) by Alex Bainter"</li>
    </ul>
    <p>
      Links to <a href="https://alexbainter.com">alexbainter.com</a> or{' '}
      <a href="https://generative.fm">Generative.fm</a> are appreciated. Please
      pretend to read the{' '}
      <a href="https://creativecommons.org/licenses/by/4.0/legalcode">
        official licensing terms
      </a>{' '}
      before using music from this service.
    </p>
    <p>
      You can show your appreciation by making a{' '}
      <Link to="/donate">donation</Link>.
    </p>
    <h1>Other Licensing Arrangements</h1>
    <h2>For special cases and people with fancy pants</h2>
    If you prefer not to use the Creative Commons licensing, send an email with
    your offer to <a href="mailto:alex@alexbainter.com">alex@alexbainter.com</a>
    .
  </div>
);

export default Licensing;
