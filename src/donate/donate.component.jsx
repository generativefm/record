import React, { useState, useCallback, useEffect } from 'react';
import Button from '../common/button.component';
import ExternalLinkIcon from '../common/external-link-icon.component';
import CopyIcon from './copy-icon.component';
import CheckmarkIcon from './checkmark-icon.component';
import './donate.styles.scss';

const PAYPAL_URL = 'https://paypal.me/alexbainter';
const PATREON_URL = 'https://www.patreon.com/bePatron?u=2484731';
const FETCH_PATRONS_URL = `https://api.alexbainter.com/v1/active-patrons`;
const BTC_ADDRESS = '3DMb8BQVTtfVv59pMLmZmHr6xSoJsb3P4Z';

const makeSupporterNameMessage = (names) =>
  names.map(
    (name, i) =>
      ` ${i === names.length - 1 ? 'and ' : ''}${name}${
        i === names.length - 1 ? '' : ','
      }`
  );

const fetchPatrons = () => {
  const now = Date.now();
  const cacheTime = localStorage.getItem('cache_time');
  const cachedValue = localStorage.getItem('cache_value');
  if (cacheTime) {
    const parsedCacheTime = Number.parseInt(cacheTime, 10);
    if (now - parsedCacheTime < 60 * 60 * 1000) {
      try {
        const value = JSON.parse(cachedValue);
        return Promise.resolve(value);
      } catch (e) {
        // do nothing
      }
    }
  }
  return fetch(FETCH_PATRONS_URL)
    .then((response) => response.json())
    .then((patronList) => {
      localStorage.setItem('cache_time', now);
      localStorage.setItem('cache_value', JSON.stringify(patronList));
      return patronList;
    });
};

const execCommandCopy = (text) => {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  return Promise.resolve();
};

const clipboardApiCopy = (text) => navigator.clipboard.writeText(text);

const copyTextToClipboard = navigator.clipboard
  ? clipboardApiCopy
  : execCommandCopy;

const Donate = () => {
  const [
    isShowingOneTimeDonationLinks,
    setIsShowingOneTimeDonationLinks,
  ] = useState(false);
  const [bigSupporterMessage, setBigSupporterMessage] = useState([]);
  const [supporterMessage, setSupporterMessage] = useState([]);
  const [isBtcAddressRecentlyCopied, setIsBtcAddressRecentlyCopied] = useState(
    false
  );

  const handleShowOneTimeDonationClick = useCallback(() => {
    setIsShowingOneTimeDonationLinks(true);
  }, [setIsShowingOneTimeDonationLinks]);

  const handleBtcCopyClick = useCallback(() => {
    setIsBtcAddressRecentlyCopied(false);
    let resetIconTimeout;
    let isPromiseCanceled = false;
    copyTextToClipboard(BTC_ADDRESS).then(() => {
      if (isPromiseCanceled) {
        return;
      }
      setIsBtcAddressRecentlyCopied(true);
      resetIconTimeout = setTimeout(() => {
        setIsBtcAddressRecentlyCopied(false);
      }, 3000);
    });
    return () => {
      isPromiseCanceled = true;
      if (resetIconTimeout) {
        clearTimeout(resetIconTimeout);
      }
    };
  }, []);

  useEffect(() => {
    let isCancelled = false;
    fetchPatrons()
      .then((patronList) => {
        if (isCancelled) {
          return;
        }
        const sortedPatrons = patronList.sort(
          (a, b) => b.creditScore - a.creditScore
        );
        setBigSupporterMessage(
          makeSupporterNameMessage(
            sortedPatrons
              .filter(({ creditScore }) => creditScore >= 20)
              .map(({ name }) => name)
          )
        );
        setSupporterMessage(
          makeSupporterNameMessage(
            sortedPatrons
              .filter(({ creditScore }) => creditScore < 20)
              .map(({ name }) => name)
          )
        );
      })
      .catch((error) => {
        console.error(error);
      });
    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="donate text-content">
      <h1>Why Donate?</h1>
      <h2>You don&apost have to, but here&aposs why you might</h2>
      <p>
        Hi there. My name is{' '}
        <a
          href="https://alexbainter.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Alex Bainter
        </a>
        , and I’m the creator of Generative.fm. I do everything from designing
        and building the site to composing and programming the music. I release
        this work for free so everyone can have access to it. However, hosting
        this service on the web is not free. Without financial support from
        folks like you, I’d either have to feature advertisements, charge
        upfront, or shut it down. Beyond reimbursing costs, funding enables me
        to spend more time on Generative.fm instead of doing other things to
        earn a living.
      </p>
      <p>
        If you enjoy Generative.fm, consider supporting it financially. Ask
        yourself what you’d expect to pay if you had to. I very much appreciate
        it.
      </p>
      <div className="donate__options">
        <a
          href={PATREON_URL}
          className="button button--text button--primary donate__options__primary"
          target="_blank"
          rel="noreferrer noopener"
        >
          Make a monthly donation (and get cool benefits)
          <ExternalLinkIcon />
        </a>
        Or
        {isShowingOneTimeDonationLinks ? (
          <div className="donate__options__one-time">
            <a
              className="donate__options__one-time__link"
              href={PAYPAL_URL}
              target="_blank"
              rel="noreferrer noopener"
            >
              PayPal <ExternalLinkIcon />
            </a>
            <Button
              className="button--link donate__options__one-time__link"
              tooltip="Copy Bitcoin wallet address"
              onClick={handleBtcCopyClick}
            >
              {`BTC: ${BTC_ADDRESS}`}
              {isBtcAddressRecentlyCopied ? <CheckmarkIcon /> : <CopyIcon />}
            </Button>
          </div>
        ) : (
          <Button
            className="button--link"
            onClick={handleShowOneTimeDonationClick}
          >
            Make a one-time donation via PayPal or magic internet money
          </Button>
        )}
      </div>
      {bigSupporterMessage.length || supporterMessage.length ? (
        <p>
          If nothing else, take a moment to thank these lovely folks for their
          monthly support of Generative.fm:
        </p>
      ) : null}
      {bigSupporterMessage.length ? (
        <p className="donate__bigger-supporters">{bigSupporterMessage}</p>
      ) : null}
      {supporterMessage.length ? (
        <p className="donate__supporters">{supporterMessage}</p>
      ) : null}
    </div>
  );
};

export default Donate;
