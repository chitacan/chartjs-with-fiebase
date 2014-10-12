# chartjs-with-firebase

simple [chartjs](http://www.chartjs.org/) demo. powered by [firebase](https://www.firebase.com).

## Run

* Create a firebase app.
* Update your firebase app url to following files.
```javascript
// on index.js
var fb = new Firebase(YOUR_FIREBASE_URL);
var chartRef = fb.child('chart_1');
```
```html
<!-- on control.html -->
<script type="text/javascript">
  var fb = new Firebase(YOUR_FIREBASE_URL);
  var chartRef = fb.child('chart_1');
```
* Run `bower install`
* Fire up an local server & hacking it !!
