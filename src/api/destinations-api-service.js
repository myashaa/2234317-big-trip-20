import {Url} from '../const/api.js';
import ApiService from '../framework/api-service.js';

export default class DestinationsApiService extends ApiService {
  get destinations() {
    return this._load({url: Url.DESTINATIONS})
      .then(ApiService.parseResponse);
  }
}
