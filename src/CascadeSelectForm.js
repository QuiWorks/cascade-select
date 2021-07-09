/* eslint-disable */
import {CascadeXForm} from "./CascadeXForm.js";

/**
 * An implementation of CascadeXForm that works with <select> elements.
 */
export class CascadeSelectForm extends CascadeXForm {

  render() {
    return super.render();
  }

  static get properties() {
    return {
      optional: {type: String}
    };
  }

  constructor() {
    super();
    this.optional = '';
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.optionalLists = this.optional.split(',').map(l => l.trim());
    this.lists.forEach(l => {
      if(this.optionalLists.includes(l.name)) {
        l.optional = true;
        this._hideList(l);
      }else{
        l.optional = false;
      }
    });
  }

  _hideList(list){
    const { element } = list;
    element.style.display = 'none';
  }

  _showList(list){
    const { element } = list;
    element.style.display = 'flex';
  }

  addOptions(data) {
    let list = this._findActiveList();
    let element = list.element;
    let onlyHasOneOption = data.length === 1;
    data.forEach((d) => {
      element.options[element.options.length] = new Option(d.name, d.value);
    });
    if(onlyHasOneOption) this._activateNextList(list);
    if(data.length > 1 && list.optional === true) this._showList(list);
  }

  clearOptions(list) {
    const { element } = list;
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
    if(list.optional) this._hideList(list);
  }

  setPlaceHolder(list) {
    const { name } = list;
    const { element } = list;
    const option = document.createElement("OPTION");
    option.value = this.placeHolderValue;
    option.textContent = `Select ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    option.disabled = true;
    option.selected = true;
    element.appendChild(option);
  }

  enableList(listElement) {
    listElement.disabled = false;
  }

  disableList(listElement) {
    listElement.disabled = true;
  }

  isEditable(listElement) {
    return listElement.querySelector('option') === null;
  }

  selectFirstOption(listElement) {
    listElement.options[0].selected = true;
  }

  getInputNodeName() {
    return 'SELECT';
  }

  getInputChangeEventName() {
    return 'change';
  }

  getListValue(listElement) {
    return listElement.value;
  }
}
