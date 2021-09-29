import { GraphQLClient, gql as GraphQLTag } from 'graphql-request';

export const gql = GraphQLTag;

export function CMSGraphQLClient({ preview } = { preview: false }) {
  const TOKEN = process.env.DATOCMS_TOKEN;
  const DatoCMSURL = `https://graphql.datocms.com/${preview ? 'preview' : ''}`;
  const client = new GraphQLClient(DatoCMSURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return {
    async query({ query, variables = {} }) {
      const messages = await client.request(query, variables);

      return {
        data: {
          messages,
        },
      };
    },
  };
}
