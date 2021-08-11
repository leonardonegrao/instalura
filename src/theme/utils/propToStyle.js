import { css } from 'styled-components';
import { breakpointsMedia } from './breakpointsMedia';

/**
 * Creates the CSS for each required property.
 * 
 * It is capable of mapping an object, if the props is an object with multiple breakpoints.
 * 
 * The props parameter of the returned function is passed by the styled-components,
 * and it's accessible by closure.
 * 
 * @param {string} propName - The name of the property.
 * @returns {function} - A function that maps the prop values.
 * */
export function propToStyle(propName) {
  return (props) => {
    const propValue = props[propName];

    if (typeof propValue === 'object') {
      return css`
        ${breakpointsMedia({
          ...(propValue.xs && {
            xs: { [propName]: propValue.xs },
          }),
          ...(propValue.sm && {
            sm: { [propName]: propValue.sm },
          }),
          ...(propValue.md && {
            md: { [propName]: propValue.md },
          }),
          ...(propValue.lg && {
            lg: { [propName]: propValue.lg },
          }),
          ...(propValue.xl && {
            xl: { [propName]: propValue.xl },
          }),
        })}
      `;
    }

    return {
      [propName]: props[propName],
    };
  };
}