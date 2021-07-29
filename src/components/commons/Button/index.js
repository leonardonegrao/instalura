import styled, { css } from "styled-components";
import get from 'lodash/get'

const ButtonGhost = css`
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
  background: transparent;
`;

const ButtonDefault = css`
  background-color: ${({ theme, variant }) => get(theme, `colors.${variant}.color`)};
  color: ${({ theme, variant }) => get(theme, `colors.${variant}.contrastText`)};
`;

export const Button = styled.button`
  border: 0;
  cursor: pointer;
  padding: 12px 16px;
  font-weight: bold;
  opacity: 1;
  border-radius: 8px;

  ${props => props.ghost ? ButtonGhost : ButtonDefault}

  &:hover,
  &:focus  {
    opacity: .5;
  }
`;