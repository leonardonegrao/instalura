import styled, { css } from "styled-components";
import get from 'lodash/get'
import { TextStyleVariantsMap } from "../../foundation/Text";
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { propToStyle } from '../../../theme/utils/propToStyle';

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

  ${breakpointsMedia({
    xs: css`
      ${TextStyleVariantsMap.smallestException}
    `,
    md: css`
      padding: 12px 43px;
      ${TextStyleVariantsMap.paragraph1}
    `,
  })}

  font-family: ${({ theme }) => theme.fontFamily};

  ${propToStyle('margin')}
  ${propToStyle('display')}

  ${props => props.ghost ? ButtonGhost : ButtonDefault}

  &:hover,
  &:focus  {
    opacity: .5;
  }
`;