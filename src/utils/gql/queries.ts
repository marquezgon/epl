import { gql } from '@apollo/client';

export const GET_PLAYERS = gql`
  query ListPlayers($transferable: Int!, $nextToken: String, $limit: Int, $filter: TablePlayerFilterWithoutTransferableInput) {
    listPlayers(transferable: $transferable, limit: $limit, nextToken: $nextToken, filter: $filter) {
      nextToken
      items {
        id
        name: nickname
        position
        price
        age: dob
        nationality
        fullName: full_name
        transferable
        ownedBy: owned_by
        wage
        rating: overall_rating
        futdbId
      }
    }
  }
`;

export const LIST_TEAMS = gql`
  query ListTeams($nextToken: String, $limit: Int, $filter: TableTeamFilterInput) {
    listTeams(limit: $limit, nextToken: $nextToken, filter: $filter) {
      items {
        id
        name
      }
    }
  }
`;

export const SEARCH_PLAYERS = gql`
  query SearchPlayers($nextToken: String, $limit: Int, $filter: TablePlayerFilterInput) {
    getPlayersByOrder(limit: $limit, nextToken: $nextToken, filter: $filter) {
      nextToken
      items {
        id
        name: nickname
        position
        price
        age: dob
        nationality
        fullName: full_name
        transferable
        ownedBy: owned_by
        wage
        rating: overall_rating
        futdbId
      }
    }
  }
`;

export const GET_MY_TEAM = gql`
  query GetMyTeam($teamId: ID!) {
    getPlayersByTeam(id: $teamId) {
      id
      name: nickname
      position
      price
      age: dob
      nationality
      fullName: full_name
      transferable
      ownedBy: owned_by
      wage
      rating: overall_rating
      futdbId
    }
  }
`;

export const GET_FIXTURES_BY_WEEK = gql`
  query GetFixturesByWeek($tournamentId: ID!, $week: Int!) {
    getFixturesByWeek(tournamentId: $tournamentId, week: $week) {
      id
      home_team_id
      away_team_id
      week
    }
  }
`;

export const GET_STANDINGS = gql`
  query GetStandings($tournamentId: ID!) {
    getStandings(tournamentId: $tournamentId) {
      teamId: team_id
      wins
      losses
      draws
      goalsFavor: goals_favor
      goalsAgainst: goals_against
    }
  }
`;