import {html, LitElement} from 'lit-element';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import './CascadeXForm.js';

export class CascadeAjax extends LitElement {

  render() {
    return html`
      <div class="cascade-ajax-container">
        <iron-ajax
          url="${this.url}"
          headers='{"X-Requested-With": "XMLHttpRequest"}'
          handle-as="json"
          @iron-ajax-response="${this._responseHandler}" >
        </iron-ajax>
        <slot></slot>
      </div>
    `;
  }

  static get properties() {
    return {
      url: {type: String},
    };
  }

  constructor() {
    super();
    this.url = '';
    this.addEventListener("cascade-select-request", this._requestEventHandler.bind(this));
  }

  _requestEventHandler(e) {
    this.requestData(e.detail);
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._ajax = this.shadowRoot.querySelector('iron-ajax');
    this.cascadeXForms = [...this.shadowRoot.querySelector(".cascade-ajax-container")
      .querySelector("slot")
      .assignedElements()];
    this.requestData();
  }

  /**
   * Requests data from the server.
   */
  requestData(params) {
    this._ajax.params = params;
    this._ajax.generateRequest();
  }

  /**
   * Handles the server response
   * @private
   */
  _responseHandler() {
    const response = this._ajax.lastResponse;
    this.cascadeXForms.forEach(c => c.setList(response));
  }
}
