import { QueryResult, OperationVariables } from '@apollo/client';
import { AlertColor } from '@mui/material/Alert';

export type MarketplaceStatus = 'open' | 'closed';

export interface BasicUserData {
  name: string;
  id: string;
}

export interface FixturesData {
  id: string;
  home_team_id: string;
  away_team_id: string;
  week: number;
}

export interface UserData {
  budget: number;
  logo: string;
  name: string;
  owner_name: string;
  username: string;
  id: string;
}

interface ToastPosition {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export interface ToastData {
  message: string;
  duration?: number;
  position?: ToastPosition;
  type?: AlertColor;
}

export interface PlayerData {
  id: string;
  futdbId: string;
  transferable: number;
  name: string;
  fullName: string;
  position: string;
  price: number;
  age: string;
  nationality: string;
  ownedBy: string;
  wage: number;
  rating: number;
  __typename: string;
}

export type GqlQuery = () => QueryResult <any, OperationVariables>