import {html, LitElement} from 'lit-element';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import './CascadeX.js';

/**
 * An ajax element that handles the
 * cascade-select-request event by making an XHR request to a server.
 */
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
      /**
       * The URL to the server.
       */
      url: {type: String},
    };
  }

  constructor() {
    super();
    this.url = '';
    this.addEventListener("cascade-select-request", this._requestEventHandler.bind(this));
  }


  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._ajax = this.shadowRoot.querySelector('iron-ajax');
    this.cascadeXs = [...this.shadowRoot.querySelector(".cascade-ajax-container")
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
   * Handles to cascade-select-request event.
   * @param e the cascade-select-request event.
   * @private
   */
  _requestEventHandler(e) {
    e.preventDefault();
    this.requestData(e.detail);
  }

  /**
   * Handles the server response.
   * @private
   */
  _responseHandler() {
    const response = this._ajax.lastResponse;
    this.cascadeXs.forEach(c => c.setList(response));
  }
}
