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

    var childRef = dataRef.child(item.label);
    childRef.endAt(timestamp).once('value', onChartData.bind(seg));
    childRef.startAt(timestamp).on('child_added', onVoted.bind(seg));
  });
});

function onVoted(snap) {
  updateChart(this, snap.val().value);
}

function onChartData(snap) {
  if (!snap.val()) return;

  var val = 0;
  snap.forEach(function(item) {
    val += item.val().value;
  });
  updateChart(this, val);
}

function updateChart(segment, value) {
  setTimeout(function() {
    segment.value += value;
    chart.update();
  }, 100)
}
