import { CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import awsExports from './aws-exports';

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