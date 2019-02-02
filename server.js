const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan')
const knex = require('knex')
const server = express();

const dbConfig = require('./knexfile')
const db = knex(dbConfig.development)

server.use(helmet());
server.use(cors());
server.use(morgan('short'));
server.use(express.json());

const categoriesRoutes = require('./Routes/categoriesRoutes')
const staffRoutes = require('./Routes/staffRoutes')
const itemsRoutes = require('./Routes/itemsRoutes')

// server.use('/categories', categoriesRoutes)
server.use('/staff', staffRoutes)
// server.use('/items', staffRoutes)

module.exports = {
  server
};