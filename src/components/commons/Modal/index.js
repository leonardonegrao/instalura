import React from 'react';

import PropTypes from 'prop-types';
import styled, { createGlobalStyle, css } from 'styled-components';
import { motion } from 'framer-motion';

const LockScroll = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
  background: rgba(0, 0, 0, 0.9);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  margin: auto;
  overflow: scroll;

  transition: .3s;

  ${({ isOpen }) => {
    if (isOpen) {
      return css`
        opacity: 1;
        pointer-events: all;
      `;
    }

    // exists, but user can't see it nor interact with it
    return css`
      opacity: 0;
      pointer-events: none;
    `;
  }}
`;

export default function Modal({ isOpen, onClose, children }) {
  function handleClick(event) {
    const isSafeArea = event.target.closest('[data-model-safe-area="true"]');

    if (!isSafeArea) {
      onClose();
    }
  }

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClick={(event) => handleClick(event)}
    >
      {isOpen && <LockScroll />}

      <motion.div
        variants={{
          open: {
            x: 0,
          },
          closed: {
            x: '100%',
          },
        }}
        animate={isOpen ? 'open' : 'closed'}
        transition={{
          duration: 0.5,
        }}
        style={{
          display: 'flex',
          flex: 1,
        }}
      >
        {children({
          'data-model-safe-area': 'true',
        })}
      </motion.div>
    </ModalWrapper>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};
