import React from 'react';
import { useState } from 'react';
import { css } from '@emotion/react';
import { ScaleLoader } from 'react-spinners';

const PopupLoading = () => {
  const [display, setDisplay] = useState(true);

  const handleClose = () => {
    setDisplay(false);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <div style={{ display: display ? 'block' : 'none', zIndex: 9999 }}>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={handleClose}
      >
        <div style={{ padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
          <svg
            style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
            onClick={handleClose}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 1 0-1.41 1.41L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
              fill="black"
            />
          </svg>
          <div style={{ textAlign: 'center' }}>
            <ScaleLoader css={override} color={'#000000'} loading={true} size={150} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupLoading;
