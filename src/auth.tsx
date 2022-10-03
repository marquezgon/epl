import { CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import awsExports, { AppSyncConfig } from './aws-exports';

type Callback = () => void;

export const getCurrentUser = () : CognitoUser | null => {
  const userPool = new CognitoUserPool(awsExports);
  const currentUser = userPool.getCurrentUser();

  return currentUser;
}

export const getCurrentSession = (onFailure?: Callback, onSuccess?: Callback) : CognitoUserSession | null => {
  const currentUser = getCurrentUser();
  let currentSession = null;

  if (currentUser != null) {
    currentUser.getSession(function(err: Error | null, session: CognitoUserSession | null) {
      if (err) {
        console.error(err.message);
      } else {
        onSuccess?.();
        currentSession = session;
      }
    });
  } else {
    onFailure?.();
  }

  return currentSession;
}

export const getCognitoSession = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = getCurrentUser();
    if (!cognitoUser) {
      reject(new Error('Failure getting Cognito user. Are you logged in?'));
      return;
    }
    cognitoUser.getSession((err: Error | null, result: CognitoUserSession | null) => {
      if (err || !result) {
        reject(new Error('Failure getting Cognito session: ' + err))
        return
      }
 
      const session = {
        url: AppSyncConfig.graphqlEndpoint,
        region: AppSyncConfig.region,
        auth: {
          type: AppSyncConfig.authenticationType,
          jwtToken: result.getIdToken().getJwtToken()
        }};
        
      resolve(session);
    })
  })
};