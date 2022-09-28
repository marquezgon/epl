import { QueryResult, OperationVariables } from '@apollo/client';

export interface UserData {
  budget: number;
  logo: string;
  name: string;
  owner_name: string;
  username: string;
  id: string;
}

export interface PlayerData {
  id: string;
  transferable: number;
  name: string;
  fullName: string;
  position: string;
  price: number;
  age: string;
  nationality: string;
  photo: string;
  ownedBy: string;
  wage: number;
  rating: number;
  __typename: string;
}

export type GqlQuery = () => QueryResult <any, OperationVariables>