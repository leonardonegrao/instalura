import React from 'react';
import WebsitePageWrapper from '.';
import WebsiteGlobalProvider from './provider';

export default function websitePageHOC(Component, { pageWrapperProps }) {
  return (props) => (
    <WebsiteGlobalProvider>
      <WebsitePageWrapper {...pageWrapperProps}>
        <Component {...props} />
      </WebsitePageWrapper>
    </WebsiteGlobalProvider>
  );
}
