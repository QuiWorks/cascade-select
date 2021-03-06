# EJP Cascading Select

A suite of components that can be used to create a cascading group of select inputs in which
the options for next list depend on the previous list's selected value.

The base functionality of any cascade component implementation is to throw events.
The cascade-ajax is used to handle request events by making XHR requests to a server.
The cascade-form is used to handle submission events by submitting an HTML form.

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i
```

## Usage
```html
<script type="module">
  import 'cascade-select/cascade-form.js';
  import 'cascade-select/cascade-ajax.js';
  import 'cascade-select/cascade-select.js';
  import 'cascade-select/cascade-combo-box.js';
</script>

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


<cascade-form action="http://localhost:8001/" method="POST">
  <cascade-ajax url="http://localhost:8001/">
    <cascade-combo-box class="flex-row" action="http://localhost:8001/" method="POST">
      <input type="hidden" name="baseUrl" value="/snow" />
      <vaadin-combo-box name="year" item-label-path="name"></vaadin-combo-box>
      <vaadin-combo-box name="make" item-label-path="name"></vaadin-combo-box>
      <vaadin-combo-box name="rideType" item-label-path="name"></vaadin-combo-box>
      <vaadin-combo-box name="color" item-label-path="name" items='[{"name": "blue", "value": "blue"}]'></vaadin-combo-box>
      <vaadin-combo-box name="model" item-label-path="name"></vaadin-combo-box>
    </cascade-combo-box>
  </cascade-ajax>
</cascade-form>
```

## Start the development server.
```bash
npm run start
```

## Run the unit tests.
```bash
npm run test
```
