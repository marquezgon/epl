import { MarketplaceStatus } from './utils/types';

const awsConfig = {
  UserPoolId: process.env.REACT_APP_AWS_COGNITO_POOL_ID || '',
  ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID || '',
};

export const UserPoolId = process.env.REACT_APP_AWS_COGNITO_POOL_ID || '';
export const IdentityPoolId = process.env.REACT_APP_AWS_IDENTITY_POOL_ID || '';
export const Region = process.env.REACT_APP_AWS_REGION || '';

export const AppSyncConfig = {
  graphqlEndpoint: process.env.REACT_APP_AWS_GRAPHQL_URL || '',
  region: Region,
  authenticationType: process.env.REACT_APP_AWS_AUTHENTICATION_TYPE || ''
}

export const marketplaceStatus: MarketplaceStatus = process.env.REACT_APP_MARKETPLACE_STATUS === 'open' ? process.env.REACT_APP_MARKETPLACE_STATUS : 'closed';

export default awsConfig;