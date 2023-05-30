export class Section {
  constructor({items, renderer}, selector) {
    this._container = document.querySelector(selector);
    this._renderer = renderer;
    this._items = items;
  }

  render() {
    //this._container.innerHTML = '';

    this._items.forEach((x) => {
      this.renderItem(x);
    })
  }

  renderItem(item) {
    this.addItem(this._renderer(item)); 
  }

  addItem(element) {
    this._container.prepend(element);    
  }
}