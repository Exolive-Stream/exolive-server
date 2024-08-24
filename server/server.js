
const { PUBLIC_DIR, SERVER_PORT } = require('../config.js');
const connectDB = require("./database/connection.js");
const express = require('express'); 
const app = express();
const router = require("./routes/router.js");

connectDB();

app.use(router);
// serve website routes
app.use(express.static(PUBLIC_DIR));
app.get('*', (req, res) => {
  res.sendFile(PUBLIC_DIR + '/index.html');
});
 
// start server
app.listen(SERVER_PORT, () => {
    console.log('Running in port ' + SERVER_PORT);
});
