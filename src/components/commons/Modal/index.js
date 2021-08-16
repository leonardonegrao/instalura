import React from 'react';

import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: strech;
  background: rgba(0, 0, 0, 0.1);

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  margin: auto;
  overflow: scroll;

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
      {children({
        'data-model-safe-area': 'true',
      })}
    </ModalWrapper>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};
