import { gql } from "apollo-server-core";
import { MusicAPI } from "./datasource";

export interface IContext {
  musicApi: MusicAPI;
}

export const typeDefs = gql`
  type Photo {
    albumId: Int!
    id: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }

  type Album {
    userId: Int!
    id: ID!
    title: String!
    photos: [Photo!]!
  }

  type Query {
    _root: String!
    allAlbums: [Album!]!
  }
`;

export const resolvers = {
  Query: {
    _root: () => {
      return "Hello World";
    },
    allAlbums: async (
      parent: any,
      args: any,
      { dataSources }: { dataSources: IContext },
      info: any
    ) => {
      return dataSources.musicApi.getAlbums();
    },
  },
  Album: {
    photos: (
      parent: any,
      __: any,
      { dataSources }: { dataSources: IContext }
    ) => {
      return dataSources.musicApi.getPhotos(parent.id);
    },
  },
};
