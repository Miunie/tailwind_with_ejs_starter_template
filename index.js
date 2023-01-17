const express = require("express");
const morgan = require('morgan');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// design file
app.use(express.static("public"));
app.set("view engine", "ejs");

//my stuff
function toTime(millis) {
  var hours = Math.floor(millis / 3600000);
  var minutes = Math.floor(millis / 60000);
  var seconds = Math.floor((millis % 60000) / 1000).toFixed(0);
  var milliseconds = millis % 1000;
  return (
      (hours > 0 ? hours : "") + (minutes < 10 && hours > 0 ? "0" : "") + (minutes > 0 ? minutes + ":" : "") + (seconds < 10 ? "0" : "") + seconds + "." + milliseconds
  );
}


// routers
app.get('/', (req, res) => {
  res.render('index', {title: "Home"});
});
app.get('/records', (req, res) => {
  const records = [
      {map: "bhop_a", time: 320+52*1000+1*60000, style: "HSW", player: "Miunie", server: "Baguette"},
      {map: "bhop_b", time: 753+21*1000+2*60000, style: "W", player: "Miunie", server: "Baguette"},
      {map: "bhop_c", time: 684+47*1000, style: "SW", player: "Miunie", server: "Baguette"},
      {map: "bhop_d", time: 129+28*1000, style: "A/D", player: "Miunie", server: "Baguette"}
  ];
  records.forEach(record => {
      record.time = toTime(record.time);
  })
  res.render('records', {title: "Records", records});
});
app.get('/players', (req, res) => {
  res.render('players', {title: "Players"});
});
app.get('/leaderboards', (req, res) => {
  res.render('leaderboards', {title: "Leaderboards"});
});
app.get('/servers', (req, res) => {
  res.render('servers', {title: "Servers"});
});
app.get('/community', (req, res) => {
  res.render('community', {title: "Community"});
});
app.get('/records/add', (req, res) => {
  res.render('addrecord', {title: "Add record"});
})

// 404
app.use((req, res) => {
  res.status(404).render('404', {title: "404"});
});

// server listening
app.listen(PORT, () => {
  console.log(`The app start on http://localhost:${PORT}`);
});
