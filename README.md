# \<cascading-select-list>

This is a form that Makes ajax request to a server to populate values of a select list style component cascade. 
It is used as a form where one select list style component's values rely on the value of the preceding select list style component.

This webcomponent follows the [open-wc](https://github.com/open-wc/open-wc) recommendation.

## Installation
```bash
npm i
```

## Usage
```html
<script type="module">
  import 'cascade-x-form/cascade-select.js';
  import 'cascade-x-form/cascade-combo-box.js';
</script>

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

<hr/>

<cascade-combo-box-form class="flex-row" url="http://localhost:8001/" action="http://localhost:8001/" method="POST">
  <input type="hidden" name="baseUrl" value="/snow" />
  <vaadin-combo-box name="year" item-label-path="name"></vaadin-combo-box>
  <vaadin-combo-box name="make" item-label-path="name"></vaadin-combo-box>
  <vaadin-combo-box name="rideType" item-label-path="name"></vaadin-combo-box>
  <vaadin-combo-box name="color" item-label-path="name" items='[{"name": "blue", "value": "blue"}]'></vaadin-combo-box>
  <vaadin-combo-box name="model" item-label-path="name"></vaadin-combo-box>
</cascade-combo-box-form>
```

## Testing using karma (if applied by author)
```bash
npm run test
```

## Testing using karma via browserstack (if applied by author)
```bash
npm run test:bs
```

## Demoing using storybook (if applied by author)
```bash
npm run storybook
```

## Linting (if applied by author)
```bash
npm run lint
```
