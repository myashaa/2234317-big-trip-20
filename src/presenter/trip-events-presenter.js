//import CreationFormView from '../view/creation-form-view.js';
import EditFormView from '../view/edit-form-view.js';
import SortView from '../view/sort-view.js';
import ListView from '../view/list-view.js';
import TripPointView from '../view/point-view.js';
import {render} from '../render.js';

export default class TripEventsPresenter {
  listComponent = new ListView();

  constructor({tripContainer, pointsModel}) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new SortView(), this.tripContainer);
    render(this.listComponent, this.tripContainer);
    //render(new CreationFormView(), this.listComponent.getElement());
    render(new EditFormView(), this.listComponent.getElement());
    for (let i = 0; i < this.points.length; i++) {
      render(new TripPointView({points: this.points[i]}), this.listComponent.getElement());
    }
  }
}
