import axios, { AxiosResponse } from "axios";
import BadRequest from "../utils/BadRequestError";

export default class GeocodingAPI {
  private KEY: string;
  URL: string;

  constructor() {
    this.KEY = `&key=${process.env.API_KEY}`;
    this.URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  }

  buildURL(address: string) {
    address = encodeURIComponent(address);

    return this.URL + address + this.KEY;
  }

  async getLocationData(address: string) {
    const url = this.buildURL(address);

    try {
      const response: AxiosResponse = await axios.get(url);
      const { data } = response;
      return data.results[0];
    } catch (error) {
      return null;
    }
  }

  async getFormatedLocation(address: string, index: number) {
    const addressData = await this.getLocationData(address);

    if (!addressData)
      throw new BadRequest(`Address ${address} (${index}) is invalid`);

    const { location } = addressData.geometry;
    const formatedAddress = {
      addressName: addressData.formatted_address,
      location,
    };

    return formatedAddress;
  }
}
