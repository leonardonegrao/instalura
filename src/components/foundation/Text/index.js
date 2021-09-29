import React from 'react';
import styled, { css } from 'styled-components';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { Link } from '../../commons/Link';
import { propToStyle } from '../../../theme/utils/propToStyle';
import { breakpointsMedia } from '../../../theme/utils/breakpointsMedia';
import { WebsitePageContext } from '../../wrappers/WebsitePage/context';

export const TextStyleVariantsMap = {
  paragraph1: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.paragraph1.fontSize};
      font-weight: ${theme.typographyVariants.paragraph1.fontWeight};
      line-height: ${theme.typographyVariants.paragraph1.lineHeight};
    `}
  `,
  smallestException: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.smallestException.fontSize};
      font-weight: ${theme.typographyVariants.smallestException.fontWeight};
      line-height: ${theme.typographyVariants.smallestException.lineHeight};
    `}
  `,
  title: css`
    ${({ theme }) => css`
      font-size: ${theme.typographyVariants.titleXS.fontSize};
      font-weight: ${theme.typographyVariants.titleXS.fontWeight};
      line-height: ${theme.typographyVariants.titleXS.lineHeight};
    `}
    ${breakpointsMedia({
    md: css`
        ${({ theme }) => css`
          font-size: ${theme.typographyVariants.title.fontSize};
          font-weight: ${theme.typographyVariants.title.fontWeight};
          line-height: ${theme.typographyVariants.title.lineHeight};
        `}
      `,
  })}
  `,
};

const TextBase = styled.span`
  font-family: ${({ theme }) => theme.fontFamily};
  ${({ variant }) => TextStyleVariantsMap[variant]}
  color: ${({ theme, color }) => get(theme, `colors.${color}.color`)};
  ${propToStyle('textAlign')}
`;

export default function Text({
  tag, variant, children, href, cmsKey, ...props
}) {
  const websitePageContext = React.useContext(WebsitePageContext);
  const componentContent = cmsKey ? websitePageContext.getCMSContent(cmsKey) : children;

  if (href) {
    return (
      <TextBase
        as={Link}
        variant={variant}
        href={href}
        {...props}
      >
        {componentContent}
      </TextBase>
    );
  }

  return (
    <TextBase
      as={tag}
      variant={variant}
      {...props}
    >
      {componentContent}
    </TextBase>
  );
}

Text.defaultProps = {
  tag: 'span',
  variant: 'paragraph1',
  children: null,
  href: '',
  cmsKey: '',
};

Text.propTypes = {
  children: PropTypes.node,
  tag: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li', 'a', 'span', 'input', 'subTitle']),
  variant: PropTypes.oneOf(['title', 'paragraph1', 'smallestException']),
  href: PropTypes.string,
  cmsKey: PropTypes.string,
};
