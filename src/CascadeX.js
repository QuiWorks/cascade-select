import {html, LitElement } from 'lit-element';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';

/**
 * Default values for a List object.
 * Used as a null object for the List class.
 * @returns {{editable: boolean, name: string, index: number, element: null}}
 */
function getDefaultList() {
  return {
    index: -1,
    name: "",
    element: null,
    editable: false,
  };
}

/**---------------------------------------------
 * EXTEND THIS CLASS AND IMPLEMENT THESE METHODS
 * ---------------------------------------------

 * Adds an array of name value pairs to an input list.
 addOptions(data)

 * Clear an input list of all its contents.
 clearOptions(list)

 * Set helpful text to be displayed by empty and inactive lists.
 setPlaceHolder(list)

 * Allow the list to be interacted with.
 enableList(listElement)

 * Disallow the list to be interacted with.
 disableList(listElement)

 * Is the list's value allowed to be altered.
 isEditable(listElement)

 * Select the first choise contained in the list.
 selectFirstOption(listElement)

 * Return the node name of the class that extending this class.
 getInputNodeName()

 * Return the name of the event the list fires when its value changes.
 getInputChangeEventName()

 * Return the lists currently selected option.
 getListValue(listElement)

 */
export class CascadeX extends LitElement {

  render() {
    return html`
      <div>
        <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      lists: { type: Array },
      placeHolderName: { type: String, attribute: 'place-holder-name' },
      placeHolderValue: { type: String, attribute: 'place-holder-value' },
      listParamName: { type: String, attribute: 'list-param-name' },
    };
  }

  constructor() {
    super();
    this.placeHolderName = '';
    this.placeHolderValue = '-1';
    this.listParamName = 'type';
    this.lists = [];
    this.parameters = [];
    this.activeList = getDefaultList();
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._processNodes();
    this.resetLists();
    this.requestData();
  }

  /**
   * Resets all lists to their default state.
   */
  resetLists() {
    this.lists.forEach(l => {
      const { element } = l;
      if (l.editable) {
        this._resetList(l);
        element.removeEventListener(
          this.getInputChangeEventName(),
          this._handleListChange.bind(this),
        );
        element.addEventListener(
          this.getInputChangeEventName(),
          this._handleListChange.bind(this),
        );
      } else {
        this.setPlaceHolder(l);
        this.selectFirstOption(element);
        this.disableList(element);
      }
    });
  }

  /**
   * Requests data from the server.
   */
  requestData() {
    this.dispatchEvent(new CustomEvent("cascade-select-request", {detail: this.getRequestParameters(), bubbles: true, composed: true}));
  }

  /**
   * Dispatches a submit event.
   */
  submit() {
    this.dispatchEvent(new CustomEvent("cascade-select-submit", {detail : {}, bubbles: true, composed: true}));
  }

  /**
   * Enables all lists.
   */
  enableLists()
  {
    this.lists.forEach(l => {
      this.enableList(l.element);
    });
  }

  /**
   * Disables all lists.
   */
  disableLists()
  {
    this.lists.forEach(l => {
      this.disableList(l.element);
    });
  }

  /**
   * Gets the request parameters for the request event.
   * @private
   */
  getRequestParameters() {
    const params = {};
    params[this.listParamName] = this._findActiveList().name;
    this.lists.forEach(l => {
      params[l.name] = l.element.value;
    });
    this.parameters.forEach(p => {
      params[p.name] = p.value;
    });
    return params;
  }

  /**
   * Adds the passed in array of values as options for the next list.
   * @public
   */
  setList(list) {
    const l = this._findActiveList();
    if (list.length === 0) {
      this.disableList(l.element);
      this._activateNextList(l);
    } else if (list.length === 1) {
      this.addOptions(list);
    } else {
      this._resetList(l);
      this.addOptions(list);
    }
  }

  /**
   * Process all the child nodes added to this components slot.
   * @private
   */
  _processNodes(){
    this.shadowRoot
      .querySelector('slot')
      .assignedNodes()
      .forEach((n) => this._processNode(n));
  }

  /**
   * Processes the nodes provided as children to this element.
   * All nodes that match a name defined by the implementation class
   * are added to the array of input lists.
   * All nodes that are hidden inputs will be query parameters for the ajax calls.
   * @param node a child element
   * @private
   */
  _processNode(node) {
    if (node.nodeName && node.nodeName === this.getInputNodeName()) {
      this._addToLists(node);
    } else if (node.nodeName && node.nodeName === 'INPUT' && node.type === 'hidden') {
      this._addToParameters(node);
    }
  }

  /**
   * Adds parameters to the request
   * that are provided through hidden input fields
   * @param param the hidden input field provided as a child element
   * @private
   */
  _addToParameters(param) {
    this.parameters.push({
      index: this.parameters.length,
      name: param.name,
      value: param.value,
    });
  }

  /**
   * Adds a list data object the the lists property.
   * @param list a select list that was added as a child to this element.
   * @private
   */
  _addToLists(list) {
    const listObj = {
      index: this.lists.length,
      name: list.getAttribute('name'),
      element: list,
      editable: this.isEditable(list),
    };
    if(this.lists.length === 0) this.activeList = listObj;
    this.lists.push(listObj);
  }

  /**
   * Resets a single list
   * @param list the object representation of the select list
   * @private
   */
  _resetList(list) {
    const { element } = list;
    const active = this._isActiveList(list);
    this.clearOptions(list);
    this.setPlaceHolder(list);
    this.selectFirstOption(element);
    if (!active) this.disableList(element);
  }

  /**
   * Event handler for each select list
   * @param e a change event thrown by the select list
   * @private
   */
  _handleListChange(e) {
    const list = this._findListByName(e.target.name);
    if (this.getListValue(list.element) !== this.placeHolderValue) {
      this._activateNextList(list);
    } else {
      this._cascadeReset(list);
    }
  }

  /**
   * Reset all down stream lists
   * @param list the top list (this will not be reset)
   * @private
   */
  _cascadeReset(list) {
    const { index } = list;
    this.lists
      .filter(l => l.index > index && l.editable)
      .forEach(l => {
        this._resetList(l);
      });
  }

  /**
   * Activates the next list or submits the form if last list.
   * @param list the current active list.
   * @private
   */
  _activateNextList(list) {
    const nextIndex = list.index + 1;
    if (this.lists.length > nextIndex) {
      this._clearActiveList();
      this._cascadeReset(list);
      const nextList = this._findNextEditableListByIndex(list.index);
      this._setActiveList(nextList);
      this.enableList(nextList.element);
      this.requestData();
    } else {
      this.submit();
    }
  }

  /**
   * Set the active list to its default value.
   * @private
   */
  _clearActiveList()
  {
    this.activeList = getDefaultList();
  }

  /**
   * Set the passed list as active.
   * @param list a list object.
   * @private
   */
  _setActiveList(list)
  {
    this.activeList = list;
  }

  /**
   * Check to see if passed list is the active list.
   * @param list a list object.
   * @returns {boolean}
   * @private
   */
  _isActiveList(list)
  {
    return this.activeList.name === list.name;
  }

  /**
   * Finds the current active list
   * @returns the active list
   * @private
   */
  _findActiveList() {
    return this._findList(l => this._isActiveList(l));
  }

  /**
   * Finds a list by name.
   * @param name the name of the list being searched.
   * @returns the list matching the name
   * @private
   */
  _findListByName(name) {
    return this._findList(l => l.name === name);
  }

  /**
   * Finds a list by its index.
   * @param i the index of the current active list
   * @returns the list matching the index
   * @private
   */
  _findNextEditableListByIndex(i) {
    return this._findList(l => l.index > i && l.editable);
  }

  /**
   * Finds a list in the lists property by a provided function.
   * @param func the logic for finding the list.
   * @returns {Object} the list matching the criteria of the function.
   * @private
   */
  _findList(func) {
    return this.lists.find(func);
  }

  /**
   * Returns a placeholder object
   * @returns {{name: string, value: string}}
   * @private
   */
  _getPlaceHolderValueObject() {
    return { name: this.placeHolderName, value: this.placeHolderValue };
  }

}
