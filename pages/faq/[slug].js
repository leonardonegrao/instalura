import React from 'react';
import FAQQuestionScreen from '../../src/components/screens/FAQQuestionScreen';
import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';

function FAQInternalScreen({ category, question }) {
  return (
    <FAQQuestionScreen
      question={question}
      category={category}
    />
  );
}

FAQInternalScreen.propTypes = FAQQuestionScreen.propTypes;

export default websitePageHOC(FAQInternalScreen);

async function fetchCategories() {
  return fetch('https://instalura-api.vercel.app/api/content/faq')
    .then(async (respostaDoServer) => {
      const resposta = await respostaDoServer.json();
      return resposta.data;
    });
}

function formatPageData(faqCategories, params) {
  function verifyIfQuestionOfCategory(question) {
    if (question.slug === params.slug) {
      return true;
    }
    return false;
  }

  return faqCategories.reduce((valorAcumulado, faqCategory) => {
    const foundQuestion = faqCategory.questions.find(verifyIfQuestionOfCategory);

    if (foundQuestion) {
      return {
        ...valorAcumulado,
        category: faqCategory,
        question: foundQuestion,
      };
    }

    return valorAcumulado;
  }, {});
}

export async function getStaticProps({ params }) {
  const faqCategories = await fetchCategories();

  const dadosDaPagina = formatPageData(faqCategories, params);

  return {
    props: {
      category: dadosDaPagina.category,
      question: dadosDaPagina.question,
      pageWrapperProps: {
        seoProps: {
          headTitle: dadosDaPagina.question.title,
        },
      },
    },
  };
}

function getPaths(faqCategories) {
  return faqCategories.reduce((valorAcumulado, faqCategory) => {
    const questionsPaths = faqCategory.questions.map((question) => {
      const questionSlug = question.slug;
      return { params: { slug: questionSlug } };
    });

    return [
      ...valorAcumulado,
      ...questionsPaths,
    ];
  }, []);
}

export async function getStaticPaths() {
  const faqCategories = await fetchCategories();

  const paths = getPaths(faqCategories);

  return {
    paths,
    fallback: false,
  };
}
