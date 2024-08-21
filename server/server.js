
const { PUBLIC_DIR, SERVER_PORT } = require('../config.js');
const express = require('express'); 
const app = express();

// serve website routes
app.use(express.static(PUBLIC_DIR));
app.get('*', (req, res) => {
  res.sendFile(PUBLIC_DIR + '/index.html');
});
 
// start server
app.listen(SERVER_PORT, () => {
    console.log('Running in port ' + SERVER_PORT);
});
