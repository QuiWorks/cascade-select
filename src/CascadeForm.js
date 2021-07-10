import { css, html, LitElement } from 'lit-element';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-form/iron-form.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';

export class CascadeForm extends LitElement {
  static get styles() {
    return css`
      :host(.flex-column) form{
        display:flex;
        flex-direction:column;
        align-items: center;
      }
      :host(.flex-row) form{
        display:flex;
        flex-direction:row;
        justify-content: center;
      }
      iron-form {
        width: 100%;
      }
      form {
        display: flex;
        flex-direction: row;
      }
      ::slotted(select) {
        margin-bottom: var(--app-margin-bottom, 0.75rem);
      }
    `;
  }

  render() {
    return html`
      <iron-form allow-redirect>
        <form action="${this.action}" method="${this.method}">
          <slot></slot>
        </form>
      </iron-form>
      <paper-spinner-lite class="blue"></paper-spinner-lite>
    `;
  }

  static get properties() {
    return {
      action: { type: String },
      method: { type: String },

    };
  }

  constructor() {
    super();
    this.action = '';
    this.method = 'GET';
  }

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this._form = this.shadowRoot.querySelector('iron-form');
    this._spinner = this.shadowRoot.querySelector('paper-spinner-lite');
    this._setSpinner();
    this.addEventListener("cascade-select-submit", this._handleSubmitEvent.bind(this));
  }

  _handleSubmitEvent()
  {
    this.submitForm();
  }

  /**
   * Submits the form
   */
  submitForm() {
    this._form.submit();
    this._spinner.active = true;
    this._spinner.style.display = 'block';
  }

  /**
   * Initializes the loading spinner.
   * @private
   */
  _setSpinner(){
    this._spinner.style.top = `-${(this._form.offsetHeight / 2) + (this._spinner.offsetHeight / 2)}px`;
    this._spinner.style.left = `${(this._form.offsetWidth / 2) - (this._spinner.offsetHeight / 2)}px`;
    this._spinner.style.display = 'none';
  }
}
