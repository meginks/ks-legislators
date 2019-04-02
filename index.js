const express = require('express'); 
const helmet = require('helmet');
const server = express(); 
const repRouter = require('./ksleg/representatives.js');
const senRouter = require('./ksleg/senators.js')

server.use(express.json()); 
server.use(helmet());

server.use('/api/reps', repRouter); 
server.use('/api/senators', senRouter);

const port = process.env.PORT || 5006; 

server.listen(port, () => {console.log(`\n*** API Listening on http://localhost:${port} ***\n`)}); 