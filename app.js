const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cons = require('consolidate')
const flash = require('connect-flash')
const session = require('express-session')
const expressValidator = require('express-validator')
const passport = require('passport')
const methodOverride = require('method-override')

const admin = require('./routes/admin')
const front = require('./routes/front')
const user = require('./routes/user')
require('dotenv').config()

// DB
const { knex } = require('./db/bookshelf')

const KnexSessionStore = require('connect-session-knex')(session)

// store session in db so server reload won't force logout
const store = new KnexSessionStore({
  knex: knex,
  tablename: 'sessions'
})

const app = express()

// Template Engine

app.engine('html', cons.nunjucks)
app.set('view engine', 'html')
app.set('views', path.join(__dirname, './views'))

// let webpack to handle file path
app.use(express.static(path.join(__dirname)))

// Middleware

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(flash())

app.use(expressValidator())

app.use(passport.initialize())
app.use(passport.session())

// GlobalVariables

app.use((req, res, next) => {
  res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path.toLowerCase()
  next()
})

// Route

app.use('/', front)
app.use('/user', user)
app.use('/system_admin', admin)

// ErrorHandle

app.use((req, res) => {
  res.status(404).send('404 找不到此頁面')
})

app.use((err, req, res, next) => {
  const errorKeys = Object.keys(err.errors)
  errorKeys.forEach(key => req.flash('error', err.errors[key].message))
  res.redirect('back')
})

app.use((err, req, res) => {
  /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
  console.error(err.stack)
  res.send(err.stack)
})

const port = 5000

app.listen(port, () => {
  console.log('server on')
})
