import { CognitoUser } from 'amazon-cognito-identity-js';

type Username = string;
export type MyCognitoUser = CognitoUser & Username;