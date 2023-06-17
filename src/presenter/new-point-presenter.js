import {nanoid} from 'nanoid';
import EditFormView from '../view/edit-form-view.js';
import {
  render,
  RenderPosition,
  remove
} from '../framework/render.js';
import {
  USER_ACTION,
  UPDATE_TYPE
} from '../const.js';

export default class NewPointPresenter {
  #pointListContainer = null;
  #offersModel = null;
  #destinationsModel = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #offers = [];
  #destinations = [];

  #pointEditComponent = null;

  constructor({offersModel, destinationsModel, pointListContainer, onDataChange, onDestroy}) {
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#pointListContainer = pointListContainer;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    this.#offers = [...this.#offersModel.offers];
    this.#destinations = [...this.#destinationsModel.destinations];

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new EditFormView({
      offers: this.#offers,
      destinations: this.#destinations,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick
    });

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      USER_ACTION.ADD_POINT,
      UPDATE_TYPE.MINOR,
      {id: nanoid(), ...point},
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
