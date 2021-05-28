import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Dialog } from '@generative.fm/web-ui';
import './donation-prompt.styles.scss';

const PAY_PAL_BASE_URL = 'https://paypal.me/alexbainter/';

const priceInputRegex = /[\d.]|Backspace|Delete|ArrowLeft|ArrowRight/;

const DonationPrompt = ({ onDismiss }) => {
  const [priceInputValue, setPriceInputValue] = useState('');
  const [payPalUrl, setPayPalUrl] = useState(PAY_PAL_BASE_URL);

  const handlePriceKeyDown = useCallback(
    (event) => {
      if (
        !priceInputRegex.test(event.key) ||
        (event.key === '.' && priceInputValue.includes('.'))
      ) {
        event.preventDefault();
      }
    },
    [priceInputValue]
  );

  const handlePriceChange = useCallback((event) => {
    const { value } = event.target;
    if (!value) {
      setPriceInputValue('');
      setPayPalUrl(PAY_PAL_BASE_URL);
      return;
    }
    setPriceInputValue(value);
    setPayPalUrl(`${PAY_PAL_BASE_URL}${event.target.value}`);
  }, []);

  return (
    <Dialog title="Name your price" onDismiss={onDismiss}>
      <div className="donation-prompt__content">
        <div>
          $
          <input
            type="tel"
            min="0"
            placeholder="0"
            className="donation-prompt__content__price-input"
            value={priceInputValue}
            onKeyDown={handlePriceKeyDown}
            onChange={handlePriceChange}
          />
          USD
        </div>
        <div className="donation-prompt__content__pay-pal-link">
          <a
            href={payPalUrl}
            target="_blank"
            rel="noreferrer noopener"
            onClick={onDismiss}
          >
            Pay with PayPal <OpenInNewIcon style={{ marginLeft: '0.25rem' }} />
          </a>
        </div>
        <div>
          For other ways to pay, see <Link to="/donate">Donate</Link>.
        </div>
      </div>
    </Dialog>
  );
};

DonationPrompt.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default DonationPrompt;
