export interface UserData {
  budget: number;
  logo: string;
  name: string;
  owner_name: string;
  username: string;
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
  __typename: string;
}