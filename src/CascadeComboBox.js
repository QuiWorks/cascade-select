/* eslint-disable */
import {CascadeX} from "./CascadeX.js";

/**
 * An implementation of CascadeX that works with <vaadin-combo-box> elements.
 */
export class CascadeComboBox extends CascadeX {

  render() {
    return super.render();
  }

  addOptions(data) {
    if(data.length > 1) data.unshift(this._getPlaceHolderValueObject());
    const { element } = this._findActiveList();
    element.items = data;
  }

  clearOptions(list) {
    const { element } = list;
    element.items = [];
  }

  setPlaceHolder(list) {
    const { index } = list;
    const { name } = list;
    const { element } = list;
    const { editable } = list;
    element.label = `${index + 1} | Select ${name.charAt(0).toUpperCase() + name.slice(1)}`;
    if (editable) element.items = [this._getPlaceHolderValueObject()];
  }

  enableList(listElement) {
    listElement.readonly = false;
  }

  disableList(listElement) {
    listElement.readonly = true;
  }

  isEditable(listElement) {
    return listElement.getAttribute('items') === null;
  }

  selectFirstOption(listElement) {
    if(listElement.items && listElement.items.length > 0){
      listElement.selectedItem = listElement.items[0];
    }
  }

  getInputNodeName() {
    return 'VAADIN-COMBO-BOX';
  }

  getInputChangeEventName() {
    return 'selected-item-changed';
  }

  getListValue(listElement) {
    return listElement.selectedItem.value;
  }
}
