import { S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';
import { IdentityPoolId, Region, UserPoolId } from '../aws-exports';
import { getCurrentSession } from '../auth';

const currentSession = getCurrentSession();
const key = `cognito-idp.us-east-1.amazonaws.com/${UserPoolId}`;
const s3Client = new S3Client({
  region: Region,
  credentials: fromCognitoIdentityPool({
    identityPoolId: IdentityPoolId,
    logins: {
      // Change the key below according to the specific region your user pool is in.
      [key]: currentSession?.getIdToken().getJwtToken() ?? ''
    },
    clientConfig: { region: Region },
  })
});

export default s3Client;