import create from 'zustand';
import {
  CognitoUser, CognitoUserSession
} from 'amazon-cognito-identity-js';

interface AuthState {
  cognitoUser: CognitoUser | null,
  updateCognitoUser: (user: CognitoUser) => void,
  cognitoSession: CognitoUserSession | null,
  updateCognitoSession: (user: CognitoUserSession | null) => void,
}

const useAuthStore = create<AuthState>()((set) => ({
  cognitoUser: null,
  updateCognitoUser: (cognitoUser) => set(() => ({ cognitoUser })),
  cognitoSession: null,
  updateCognitoSession: (cognitoSession) => set(() => ({ cognitoSession }))
}))

export default useAuthStore;