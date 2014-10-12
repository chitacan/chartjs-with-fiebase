var fb = new Firebase(YOUR_FIREBASE_URL);
var chartRef = fb.child('chart_1');
var dataRef  = fb.child('chart_1-data');

var ctx   = document.getElementById('chart').getContext('2d');
var chart = new Chart(ctx).Pie([]);

var timestamp = new Date().getTime();

chartRef.endAt(timestamp).once('value', function(snap) {
  if (!snap.val()) return;

  snap.val().forEach(function(item, idx) {
    chart.addData(item);
    seg = chart.segments[idx];
    seg.data = [];

    var childRef = dataRef.child(item.label);
    childRef.endAt(timestamp).once('value', onChartData.bind(seg));
    childRef.startAt(timestamp).on('child_added', onVoted.bind(seg));
  });
});

function onVoted(snap) {
  this.data.push(snap.val());
  updateChart();
}

function onChartData(snap) {
  if (!snap.val()) return;

  var self = this;
  snap.forEach(function(item) {
    self.data.push(item.val())
  });
  updateChart();
}

function updateChart() {
  setTimeout(function() {
    chart.segments.forEach(function(item) {
      var data = item.data;
      while(data.length) {
        item.value += data.pop().value;
      }
    });

    chart.update();
  }, 100)
}
