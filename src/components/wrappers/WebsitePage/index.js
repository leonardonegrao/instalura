import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '../../foundation/layout/Box';
import Menu from '../../commons/Menu';
import Footer from '../../commons/Footer';
import Modal from '../../commons/Modal';
import FormCadastro from '../../patterns/FormCadastro';
import { SEO } from '../../commons/SEO';

export const WebsitePageContext = React.createContext({
  toggleModalCadastro: () => { },
  isModalOpen: false,
});

export default function WebsitePageWrapper({
  children,
  seoProps,
  pageBoxProps,
  menuProps,
}) {
  const [isModalOpen, setModalState] = React.useState(false);

  return (
    <WebsitePageContext.Provider value={{
      toggleModalCadastro: () => {
        setModalState(!isModalOpen);
      },
      isModalOpen,
    }}
    >
      <SEO {...seoProps} />
      <Box
        display="flex"
        flexDirection="column"
        flex="1"
        {...pageBoxProps}
      >
        <Modal isOpen={isModalOpen} onClose={() => setModalState(false)}>
          {(propsModal) => (
            <FormCadastro propsModal={propsModal} />
          )}
        </Modal>

        {menuProps.display && (<Menu onCadastrarClick={() => setModalState(true)} />)}
        {children}
        <Footer />
      </Box>
    </WebsitePageContext.Provider>
  );
}

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: {
    display: true,
  },
};

WebsitePageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
};
