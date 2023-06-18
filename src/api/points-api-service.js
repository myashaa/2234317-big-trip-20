import {
  Method,
  Url
} from '../const/api.js';
import ApiService from '../framework/api-service.js';

export default class PointsApiService extends ApiService {
  get points() {
    return this._load({url: Url.POINTS})
      .then(ApiService.parseResponse);
  }

  async addPoint(point) {
    const response = await this._load({
      url: Url.POINTS,
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deletePoint(point) {
    const response = await this._load({
      url: `${Url.POINTS}/${point.id}`,
      method: Method.DELETE,
    });

    return response;
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `${Url.POINTS}/${point.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  #adaptToServer(point) {
    const adaptedPoint = {...point,
      'base_price': Number(point.basePrice),
      'date_from': point.dateFrom instanceof Date ? point.dateFrom.toISOString() : null,
      'date_to': point.dateTo instanceof Date ? point.dateTo.toISOString() : null,
      'is_favorite': point.isFavorite,
    };

    adaptedPoint.offers = point.offers.slice().map((offer) => (offer.id) ? offer.id : offer);

    delete adaptedPoint.basePrice;
    delete adaptedPoint.dateFrom;
    delete adaptedPoint.dateTo;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
