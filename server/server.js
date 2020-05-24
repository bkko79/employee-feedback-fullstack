'use strict';

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000;

app.use(bodyParser.json())

app.listen( PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

// Tables and datastructure were created with Sequelize CLI:
// node_modules/.bin/sequelize model:generate --name Users --attributes id:integer,name:string,email:string,gender:enum('male','female','others'),position:string 
// node_modules/.bin/sequelize model:generate --name Reviews --attributes reviewer_id:integer,reviewee_id:integer,score:integer
// node_modules/.bin/sequelize db:migrate && node_modules/.bin/sequelize db:seed:all

const db = require("./database/models")
const users = require("./api/users")
const reviews = require("./api/reviews")

//LISTEN
users(app, db)
reviews(app, db)