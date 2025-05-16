import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { S3Client } from '@aws-sdk/client-s3';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';

interface AwsClients {
  s3: S3Client;
}

/**
 * A factory that creates AWS clients used by the application.
 * This application requires an authenticated Amazon Cognito identity to grant
 * permissions.
 * 
 * @returns {Promise<AwsClients>} The AWS clients, initialized with Amazon Cognito identity credentials.
 */
export const awsFactory = async (): Promise<AwsClients> => {
  const deployRegion = 'us-east-1';
  const cognitoToken = await getCognitoToken();
  const poolId = 'us-east-1_Sp4VgjOVX';
  const cognitoId = `cognito-idp.${deployRegion}.amazonaws.com/${poolId}`;

  const creds = fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: deployRegion }),
    identityPoolId: 'us-east-1:f65b946b-98f4-42d7-81ad-9f7d9e09bdbe',
    logins: { [cognitoId]: cognitoToken },
  });

  const clients: AwsClients = {
    s3: new S3Client({
      region: deployRegion,
      credentials: creds,
    }),
  };

  return clients;
};

/**
 * Gets the Cognito token for the current user.
 * This is a placeholder function - you'll need to implement the actual token retrieval
 * based on your authentication flow.
 * 
 * @returns {Promise<string>} The Cognito token
 */
const getCognitoToken = async (): Promise<string> => {
  // TODO: Implement actual token retrieval from your auth system
  // This could be from localStorage, a cookie, or your auth state management
  const token = localStorage.getItem('cognitoToken');
  
  if (!token) {
    throw new Error('No Cognito token found. Please authenticate first.');
  }
  
  return token;
}; 