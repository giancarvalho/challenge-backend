import axios from "axios";

export default class GeocodingAPI {
  private KEY: string;
  URL: string;

  constructor() {
    this.KEY = process.env.API_KEY;
    this.URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
  }

  buildURL(address: string) {
    address = encodeURIComponent(address);

    return this.URL + address + "&key=" + this.KEY;
  }

  async getLocationData(address: string) {
    const url = this.buildURL(address);
    try {
      const { data } = await axios.get(url);

      return data.results[0];
    } catch (error) {
      return null;
    }
  }

  async getFormatedLocation(address: string) {
    const addressData = await this.getLocationData(address);

    if (!addressData) return null;

    const { location } = addressData.geometry;
    const formatedAddress = {
      addressName: addressData.formatted_address,
      location,
    };

    return formatedAddress;
  }
}
