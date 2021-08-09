import { css } from 'styled-components';
import breakpoints from '../index';

/**
 * Resolves the media query for the given breakpoint.
 * @param {object} cssByBreakpoint - An object with CSS values per breakpoint
 * @returns {ThemedCssFunction} - Styled Component CSS value
 * */
export function breakpointsMedia(cssByBreakpoint) {
  const breakpointNames = Object.keys(breakpoints);
  return breakpointNames
    .filter((breakpointName) => Boolean(cssByBreakpoint[breakpointName]))
    .map((breakpointName) => css`
    @media only screen and (min-width: ${breakpoints[breakpointName]}px) {
      ${cssByBreakpoint[breakpointName]}
    }
  `);
}