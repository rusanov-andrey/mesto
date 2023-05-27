export class Section {
  constructor({items, renderer}, selector) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
    this._items = items;
  }

  render() {
    this._container.innerHTML = '';

    this._items.forEach((x) => {
      this.addItem(x);
    })
  }

  addItem(item) {
    this._container.prepend(this._renderer(item));    
  }
}