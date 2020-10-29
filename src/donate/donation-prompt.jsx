import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { OpenInNew as OpenInNewIcon } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import Overlay from '../layout/overlay.component';
import Modal from '../modal/modal.component';
import ModalHeader from '../modal/modal-header.component';
import ModalContent from '../modal/modal-content.component';
import ModalFooter from '../modal/modal-footer.component';
import Button from '../common/button.component';
import userSelectedPromptSetting from './actions/user-selected-prompt-setting.creator';
import './donation-prompt.styles.scss';

const PAY_PAL_BASE_URL = 'https://paypal.me/alexbainter/';

const priceInputRegex = /[\d.]|Backspace|Delete|ArrowLeft|ArrowRight/;

const DonationPrompt = ({ onDismiss }) => {
  const [priceInputValue, setPriceInputValue] = useState('');
  const [payPalUrl, setPayPalUrl] = useState(PAY_PAL_BASE_URL);
  const [isPromptSettingChecked, setIsPromptSettingChecked] = useState(false);
  const dispatch = useDispatch();

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

  const handleCheckboxChange = useCallback(
    (event) => {
      const isChecked = Boolean(event.target.checked);
      setIsPromptSettingChecked(isChecked);
      dispatch(userSelectedPromptSetting(!isChecked));
    },
    [dispatch]
  );

  return (
    <Overlay>
      <Modal onDismiss={onDismiss}>
        <ModalHeader>Name your price</ModalHeader>
        <ModalContent className="donation-prompt__content">
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
          <a
            href={payPalUrl}
            className="button button--text button--primary donation-prompt__content__pay-pal-link"
            target="_blank"
            rel="noreferrer noopener"
            onClick={onDismiss}
          >
            Pay with PayPal <OpenInNewIcon style={{ marginLeft: '0.25rem' }} />
          </a>
          For more ways to pay, see <Link to="/donate">Donate</Link>.
          <div className="donation-prompt__content__hide">
            <label className="donation-prompt__content__hide__label">
              <input
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={isPromptSettingChecked}
              ></input>
              Don&apos;t ask me again
            </label>
          </div>
        </ModalContent>
        <ModalFooter>
          <Button className="button--text" onClick={onDismiss}>
            No thanks
          </Button>
        </ModalFooter>
      </Modal>
    </Overlay>
  );
};

DonationPrompt.propTypes = {
  onDismiss: PropTypes.func.isRequired,
};

export default DonationPrompt;
