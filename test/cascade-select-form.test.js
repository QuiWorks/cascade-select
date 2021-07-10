/* eslint-disable */
import { html, fixture, expect, elementUpdated} from '@open-wc/testing';
import sinon from 'sinon';

import '../cascade-select.js';
import '../cascade-form.js';
import '../cascade-ajax.js';

describe('cascadeSelect', () => {

  it('Initial setup works', async () => {
    const el = await fixture(html`
      <cascade-form action="http://localhost:8001/" method="POST">
        <cascade-ajax url="http://localhost:8001/">
          <cascade-select optional="rideType" class="flex-column">
            <input type="hidden" name="baseUrl" value="/dirt" />
            <select name="year" class="custom-select"></select>
            <select name="make" class="custom-select"></select>
            <select name="rideType" class="custom-select"></select>
            <select name="color" class="custom-select">
              <option value="blue">blue</option>
            </select>
            <select name="model" class="custom-select"></select>
          </cascade-select>
        </cascade-ajax>
      </cascade-form>
    `);
    //handles attributes
    const form = el;
    const ajax = el.querySelector("cascade-ajax");
    const select = el.querySelector("cascade-select");

    expect(ajax.url).to.equal('http://localhost:8001/');
    expect(form.action).to.equal('http://localhost:8001/');
    expect(form.method).to.equal('POST');
    expect(select.optional).to.equal('rideType');
    //handles params
    expect(select.parameters.length).to.equal(1);
    expect(select.parameters[0].name).to.equal('baseUrl');
    expect(select.parameters[0].value).to.equal('/dirt');
    //handles lists
    expect(select.lists.length).to.equal(5);
    expect(select.lists[0].index).to.equal(0);
    expect(select.lists[0].name).to.equal('year');
    expect(select.lists[0].element.nodeName).to.equal("SELECT");
    expect(select.lists[0].active).to.equal(true);
    expect(select.lists[0].editable).to.equal(true);
    expect(select.lists[1].index).to.equal(1);
    expect(select.lists[1].name).to.equal('make');
    expect(select.lists[1].element.nodeName).to.equal("SELECT");
    expect(select.lists[1].active).to.equal(false);
    expect(select.lists[1].editable).to.equal(true);
    expect(select.lists[2].index).to.equal(2);
    expect(select.lists[2].name).to.equal('rideType');
    expect(select.lists[2].element.nodeName).to.equal("SELECT");
    expect(select.lists[2].active).to.equal(false);
    expect(select.lists[2].editable).to.equal(true);
    expect(select.lists[3].index).to.equal(3);
    expect(select.lists[3].name).to.equal('color');
    expect(select.lists[3].element.nodeName).to.equal("SELECT");
    expect(select.lists[3].active).to.equal(false);
    expect(select.lists[3].editable).to.equal(false);
    expect(select.lists[4].index).to.equal(4);
    expect(select.lists[4].name).to.equal('model');
    expect(select.lists[4].element.nodeName).to.equal("SELECT");
    expect(select.lists[4].active).to.equal(false);
    expect(select.lists[4].editable).to.equal(true);
  });

  it('Selecting list items work', async () => {
    const el = await fixture(html`
      <cascade-form action="http://localhost:8001/" method="POST">
        <cascade-ajax url="http://localhost:8001/">
          <cascade-select optional="rideType" class="flex-column">
            <input type="hidden" name="baseUrl" value="/dirt" />
            <select name="year" class="custom-select"></select>
            <select name="make" class="custom-select"></select>
            <select name="rideType" class="custom-select"></select>
            <select name="color" class="custom-select">
              <option value="blue">blue</option>
            </select>
            <select name="model" class="custom-select"></select>
          </cascade-select>
        </cascade-ajax>
      </cascade-form>
    `);
    const cascade = el.querySelector("cascade-select");
    const select = cascade.querySelector("select");
    select.value = "2020";
    select.dispatchEvent(new Event("change"));

    await elementUpdated(el);
    //handles lists
    expect(cascade.lists.length).to.equal(5);
    expect(cascade.lists[0].index).to.equal(0);
    expect(cascade.lists[0].name).to.equal('year');
    expect(cascade.lists[0].element.nodeName).to.equal("SELECT");
    expect(cascade.lists[0].active).to.equal(false);
    expect(cascade.lists[0].editable).to.equal(true);
    expect(cascade.lists[1].index).to.equal(1);
    expect(cascade.lists[1].name).to.equal('make');
    expect(cascade.lists[1].element.nodeName).to.equal("SELECT");
    expect(cascade.lists[1].active).to.equal(true);
    expect(cascade.lists[1].editable).to.equal(true);
    expect(cascade.lists[2].index).to.equal(2);
    expect(cascade.lists[2].name).to.equal('rideType');
    expect(cascade.lists[2].element.nodeName).to.equal("SELECT");
    expect(cascade.lists[2].active).to.equal(false);
    expect(cascade.lists[2].editable).to.equal(true);
    expect(cascade.lists[3].index).to.equal(3);
    expect(cascade.lists[3].name).to.equal('color');
    expect(cascade.lists[3].element.nodeName).to.equal("SELECT");
    expect(cascade.lists[3].active).to.equal(false);
    expect(cascade.lists[3].editable).to.equal(false);
    expect(cascade.lists[4].index).to.equal(4);
    expect(cascade.lists[4].name).to.equal('model');
    expect(cascade.lists[4].element.nodeName).to.equal("SELECT");
    expect(cascade.lists[4].active).to.equal(false);
    expect(cascade.lists[4].editable).to.equal(true);
  });

  it('Submission works', async () => {
    const el = await fixture(html`
      <cascade-form action="http://localhost:8001/" method="POST">
        <cascade-ajax url="http://localhost:8001/">
          <cascade-select optional="rideType" class="flex-column">
            <input type="hidden" name="baseUrl" value="/dirt" />
            <select name="year" class="custom-select"></select>
            <select name="make" class="custom-select"></select>
            <select name="rideType" class="custom-select"></select>
            <select name="color" class="custom-select">
              <option value="blue">blue</option>
            </select>
            <select name="model" class="custom-select"></select>
          </cascade-select>
        </cascade-ajax>
      </cascade-form>
    `);
    const cascade = el.querySelector("cascade-select");
    const selects = cascade.querySelectorAll("select");

    const submitFormSpy = sinon.spy(el, "submitForm");

    selects[0].value = "2020";
    selects[0].dispatchEvent(new Event("change"));
    await elementUpdated(el);
    selects[1].value = "3";
    selects[1].dispatchEvent(new Event("change"));
    await elementUpdated(el);
    selects[2].value = "pg2";
    selects[2].dispatchEvent(new Event("change"));
    await elementUpdated(el);
    selects[4].value = "17500067";
    selects[4].dispatchEvent(new Event("change"));
    await elementUpdated(el);

    expect(submitFormSpy.callCount).to.equal(1);
  });

  it('Shadow dom renders correctly', async () => {
    const el = await fixture(html`
      <cascade-form action="http://localhost:8001/" method="POST">
        <cascade-ajax url="http://localhost:8001/">
          <cascade-select optional="rideType" class="flex-column">
            <input type="hidden" name="baseUrl" value="/dirt" />
            <select name="year" class="custom-select"></select>
            <select name="make" class="custom-select"></select>
            <select name="rideType" class="custom-select"></select>
            <select name="color" class="custom-select">
              <option value="blue">blue</option>
            </select>
            <select name="model" class="custom-select"></select>
          </cascade-select
        </cascade-ajax>
      </cascade-form>
    `);

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Light dom renders correctly', async () => {
    const el = await fixture(html`
      <cascade-form action="http://localhost:8001/" method="POST">
        <cascade-ajax url="http://localhost:8001/">
          <cascade-select optional="rideType" class="flex-column">
            <input type="hidden" name="baseUrl" value="/dirt" />
            <select name="year" class="custom-select"></select>
            <select name="make" class="custom-select"></select>
            <select name="rideType" class="custom-select"></select>
            <select name="color" class="custom-select">
              <option value="blue">blue</option>
            </select>
            <select name="model" class="custom-select"></select>
          </cascade-select>
        </cascade-ajax>
      </cascade-form>
    `);

    expect(el).lightDom.to.equalSnapshot();
  });
});
