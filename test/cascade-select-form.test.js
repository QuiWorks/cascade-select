/* eslint-disable */
import { html, fixture, fixtureSync, expect, elementUpdated, assert } from '@open-wc/testing';
// import sinon from 'sinon';

import '../cascade-select.js';

describe('cascadeSelectForm', () => {
  before(() =>{
  });
  after(function () {
    //create a request to shut down test server
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:8001/shutdown");
    xhr.send();
  });

  it('Initial setup works', async () => {
    const el = await fixture(html`
      <cascade-select-form optional="rideType" class="flex-column" url="http://localhost:8001/" action="http://localhost:8001/" method="POST">
        <input type="hidden" name="baseUrl" value="/dirt" />
        <select name="year" class="custom-select"></select>
        <select name="make" class="custom-select"></select>
        <select name="rideType" class="custom-select"></select>
        <select name="color" class="custom-select">
          <option value="blue">blue</option>
        </select>
        <select name="model" class="custom-select"></select>
      </cascade-select-form>
    `);
    //handles attributes
    expect(el.url).to.equal('http://localhost:8001/');
    expect(el.action).to.equal('http://localhost:8001/');
    expect(el.method).to.equal('POST');
    expect(el.optional).to.equal('rideType');
    //handles params
    expect(el.parameters.length).to.equal(1);
    expect(el.parameters[0].name).to.equal('baseUrl');
    expect(el.parameters[0].value).to.equal('/dirt');
    //handles lists
    expect(el.lists.length).to.equal(5);
    expect(el.lists[0].index).to.equal(0);
    expect(el.lists[0].name).to.equal('year');
    expect(el.lists[0].element.nodeName).to.equal("SELECT");
    expect(el.lists[0].active).to.equal(true);
    expect(el.lists[0].editable).to.equal(true);
    expect(el.lists[1].index).to.equal(1);
    expect(el.lists[1].name).to.equal('make');
    expect(el.lists[1].element.nodeName).to.equal("SELECT");
    expect(el.lists[1].active).to.equal(false);
    expect(el.lists[1].editable).to.equal(true);
    expect(el.lists[2].index).to.equal(2);
    expect(el.lists[2].name).to.equal('rideType');
    expect(el.lists[2].element.nodeName).to.equal("SELECT");
    expect(el.lists[2].active).to.equal(false);
    expect(el.lists[2].editable).to.equal(true);
    expect(el.lists[3].index).to.equal(3);
    expect(el.lists[3].name).to.equal('color');
    expect(el.lists[3].element.nodeName).to.equal("SELECT");
    expect(el.lists[3].active).to.equal(false);
    expect(el.lists[3].editable).to.equal(false);
    expect(el.lists[4].index).to.equal(4);
    expect(el.lists[4].name).to.equal('model');
    expect(el.lists[4].element.nodeName).to.equal("SELECT");
    expect(el.lists[4].active).to.equal(false);
    expect(el.lists[4].editable).to.equal(true);
  });

  it('Shadow dom renders correctly', async () => {
    const el = await fixture(html`
      <cascade-select-form optional="rideType" class="flex-column" url="http://localhost:8001/" action="http://localhost:8001/" method="POST">
        <input type="hidden" name="baseUrl" value="/dirt" />
        <select name="year" class="custom-select"></select>
        <select name="make" class="custom-select"></select>
        <select name="rideType" class="custom-select"></select>
        <select name="color" class="custom-select">
          <option value="blue">blue</option>
        </select>
        <select name="model" class="custom-select"></select>
      </cascade-select-form>
    `);

    expect(el).shadowDom.to.equal(`
     <iron-ajax handle-as="json" url="http://localhost:8001/" hidden="">
      </iron-ajax>
      <iron-form allow-redirect="">
        <form action="http://localhost:8001/" method="POST">
          <slot></slot>
        </form>
      </iron-form>
      <paper-spinner-lite class="blue" aria-hidden="true"></paper-spinner-lite>`
    , { ignoreAttributes: ['style', 'headers']});
  });

  it('Light dom renders correctly', async () => {
    const el = await fixture(html`
      <cascade-select-form optional="rideType" class="flex-column" url="http://localhost:8001/" action="http://localhost:8001/" method="POST">
        <input type="hidden" name="baseUrl" value="/dirt" />
        <select name="year" class="custom-select"></select>
        <select name="make" class="custom-select"></select>
        <select name="rideType" class="custom-select"></select>
        <select name="color" class="custom-select">
          <option value="blue">blue</option>
        </select>
        <select name="model" class="custom-select"></select>
      </cascade-select-form>
    `);

    expect(el).lightDom.to.equalSnapshot();
  });

  it('First list gets set on first load', async () => {
    const el = await fixture(html`
      <cascade-select-form optional="rideType" class="flex-column" url="http://localhost:8001/" action="http://localhost:8001/" method="POST">
        <input type="hidden" name="baseUrl" value="/dirt" />
        <select name="year" class="custom-select"></select>
        <select name="make" class="custom-select"></select>
        <select name="rideType" class="custom-select"></select>
        <select name="color" class="custom-select">
          <option value="blue">blue</option>
        </select>
        <select name="model" class="custom-select"></select>
      </cascade-select-form>
    `);

    await elementUpdated(el);

    expect(el).to.not.be.null;
    expect(el._ajax).to.not.be.null;


    expect(el._ajax).to.not.be.null;
    // expect(el._ajax).to.equal();

    let list = el._findListByName('year');
    expect(list.element.options.length).to.equal(1);
    expect(list.element.options[0].text).to.equal("Select Year");
    expect(list.element.options[0].value).to.equal("-1");
    // expect(list.element.options[1].value).to.equal("2020");
    // expect(list.element.options[1].value).to.equal("2020");
    // expect(list.element.options[2].value).to.equal("2019");
    // expect(list.element.options[2].value).to.equal("2019");
    // await waitUntil(
    //   () => el.querySelector('select[name=year] > option[value=2020]'),
    //   'Element did not render children',
    // );

    // setTimeout(function(){ console.log("waiting...") }, 3000);
    //
    // debugger;
    //
    // let ajaxStub = sinon.stub(el._ajax, 'lastResponse').value([{name: "n1", value: "v1"},{name: "n2", value: "v2"}]);
    //
    // // let eventSpy = sinon.spy(CascadeX,"_responseHandler");
    // let elSpy = sinon.spy(el,"getInputNodeName");
    //
    // console.log(el.querySelector('select[name=year]').children.length);

    // el.addEventListener("iron-ajax-response", function(e){console.log(e);});
    //
    // // el._ajax.dispatchEvent(new Event('iron-ajax-response'));
    // el._ajax.fire('iron-ajax-response', request, {bubbles: this.bubbles, composed: true});
    //
    // assert.isTrue(elSpy.called);
    // // stub a function
    // const requestDataStub = stub(el, 'requestData');
    //
    // el.requestData();

    // await elementUpdated(el);
    // assert.isNotNull(server);
    // assert.isNotNull(xhr);
    // expect(requests.length).to.equal(3);
    // requests[0].respond(200, responseHeaders.json,'[{name: "n1", value: "v1"},{name: "n2", value: "v2"}]');
    // requests[1].respond(200, responseHeaders.json,'[{name: "n1", value: "v1"},{name: "n2", value: "v2"}]');
    //
    // requests[2].respond(200, responseHeaders.json,'[{name: "n1", value: "v1"},{name: "n2", value: "v2"}]');

    // el.firstUpdated(new Map());
    // await elementUpdated(el);
    // assert.isTrue(ajaxSpy.isCalled);

    // expect(el._ajax.url).to.equal('/responds_to_get_with_json');
    // el._ajax.generateRequest = sinon.stub().returns([{name: "n1", value: "v1"},{name: "n2", value: "v2"}]);
    //
    //
    //
    // let response = el._ajax.generateRequest();
    // expect(response).to.be.ok;
    // expect(response).to.be.ok;
    // expect(el._ajax.generateRequest()).to.equal([{name: "n1", value: "v1"},{name: "n2", value: "v2"}]);
    // expect(el._ajax.lastResponse).to.equal([{name: "n1", value: "v1"},{name: "n2", value: "v2"}]);

    // let list = el._findListByName('year');
    // expect(list.element.options.length).to.equal(1);
    // expect(list.element.options[0].text).to.equal("Select Year");
    // expect(list.element.options[0].value).to.equal("-1");
    // expect(list.element.options[1].value).to.equal("n1");
    // expect(list.element.options[1].value).to.equal("v1");
    // expect(list.element.options[2].value).to.equal("n2");
    // expect(list.element.options[2].value).to.equal("v2");

    // // check if the function was called
    // expect(requestDataStub).to.have.callCount(1);



    // expect(el.lists[0].element).dom.to.equal(`
    //       <option value="-1" disabled="">Select Year</option>
    //       <option value="2020">2020</option>
    //       <option value="2019">2019</option>
    //       <option value="2018">2018</option>
    //       <option value="2017">2017</option>
    //       <option value="2016">2016</option>
    //       <option value="2015">2015</option>
    //       <option value="2014">2014</option>
    //       <option value="2013">2013</option>
    //       <option value="2012">2012</option>
    // `);
  });

  //
  // it('increases the counter on button click', async () => {
  //   const el = await fixture(html`
  //     <cascade-select-form></cascade-select-form>
  //   `);
  //   el.shadowRoot.querySelector('button').click();
  //
  //   expect(el.counter).to.equal(6);
  // });
  //
  // it('can override the title via attribute', async () => {
  //   const el = await fixture(html`
  //     <cascade-select-form title="attribute title"></cascade-select-form>
  //   `);
  //
  //   expect(el.title).to.equal('attribute title');
  // });
});
