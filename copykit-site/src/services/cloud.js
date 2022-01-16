import awsconfig from '../aws-exports';
import Amplify from '@aws-amplify/core';
import { Auth } from '@aws-amplify/auth';

export const configCloud = () => {
  Amplify.configure(awsconfig);
  Auth.configure(awsconfig);
};
export const auth_logout = async () => {
  try {
    await Auth.signOut();
    const result = await Auth.currentUserInfo();
    return { status: 'ok', payload: {} };
  } catch (error) {
    return { status: 'error', payload: {} };
  }
};