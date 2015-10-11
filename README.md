# jQuery Motion Detection

This jQuery plugin uses HTML5's getUserMedia() API to detect motion using a device's webcam/camera.

## Setup

Include the plugin _after_ the jQuery library:
```html
<script src="/path/to/jquery.js"></script>
<script src="/path/to/jquery.motionDetection.js"></script>
```

## Usage

Include a <video> and <canvas> element in your markup, each with the class `.motionDetection`.
```html
<body>
  <video class="motionDetection"></video>
  <canvas class="motionDetection"></canvas>
</body>
```

Attach the plugin to their parent element:
```javascript
$("body").motionDetection();
```

When motion is detected, a supplied method can be triggered.

## Options

| Name  | Type | Description | Default | 
|:----- |:---- |:----------- |:------- |
| pollingFrequency | Integer | How often to check for motion (ms) | 1000 |
| sampleWidth | Integer | The canvas width | 100 |
| sampleHeight | Integer | The canvas height | 100 |
| threshold | Decimal | Percentage of total pixels that must change (0-1) | 0.25 |
| hide | Boolean | Hide the <video> and <canvas> elements | true |
| onDetection | Function | The function to call when motion is detected | function() { console.log("Motion detected!"); } |
