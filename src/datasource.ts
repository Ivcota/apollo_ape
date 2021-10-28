import { RESTDataSource } from "apollo-datasource-rest";

export class MusicAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://jsonplaceholder.typicode.com/";
  }

  async getAlbums() {
    return this.get("albums/");
  }

  async getPhotos(albumnId: number) {
    return this.get(`photos/?albumId=${albumnId}`);
  }
}
