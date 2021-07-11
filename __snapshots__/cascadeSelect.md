# `cascadeSelect`

#### `Shadow dom renders correctly`

```html
<iron-form allow-redirect="">
  <form
    action="http://localhost:8001/"
    method="POST"
  >
    <slot>
    </slot>
  </form>
</iron-form>
<paper-spinner-lite
  aria-hidden="true"
  class="blue"
  style="top: -14px; left: 620px; display: none;"
>
</paper-spinner-lite>

```

#### `Light dom renders correctly`

```html
<cascade-ajax url="http://localhost:8001/">
  <cascade-select
    class="flex-column"
    optional="rideType"
  >
    <input
      name="baseUrl"
      type="hidden"
      value="/dirt"
    >
    <select
      class="custom-select"
      name="year"
    >
      <option
        disabled=""
        value="-1"
      >
        Select Year
      </option>
    </select>
    <select
      class="custom-select"
      disabled=""
      name="make"
    >
      <option
        disabled=""
        value="-1"
      >
        Select Make
      </option>
    </select>
    <select
      class="custom-select"
      disabled=""
      name="rideType"
      style="display: none;"
    >
      <option
        disabled=""
        value="-1"
      >
        Select RideType
      </option>
    </select>
    <select
      class="custom-select"
      disabled=""
      name="color"
    >
      <option value="blue">
        blue
      </option>
      <option
        disabled=""
        value="-1"
      >
        Select Color
      </option>
    </select>
    <select
      class="custom-select"
      disabled=""
      name="model"
    >
      <option
        disabled=""
        value="-1"
      >
        Select Model
      </option>
    </select>
  </cascade-select>
</cascade-ajax>
```

