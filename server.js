
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

app.use(cors());
// Parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiRoutes = require('./server/routes/api.js');
app.use('/api', apiRoutes);

//#
app.use(express.static(path.join(__dirname + '/client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
})
//~#

const port = 5000;
//const hostName = 

app.listen(process.env.PORT || port, () => console.log('Server running on port :'+port));