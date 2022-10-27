const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const { defaults } = require('pg');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// // sync data
// app.get("/sync", (req, res) => {
//   let models = require("./models");
//   models.sequelize.sync().then(() => {
//     res.send("Database completed successfully!");
//   });
// });
// 
app.use(express.static(__dirname + '/public'));
app.engine('hbs', hbs.engine({
  layoutsDir: __dirname + "/views/layouts/",
  defaultLayout: 'layout',
  extname: 'hbs',
  runtimeOptions: { allowProtoPropertiesByDefault: true },
  }));
app.set('view engine', 'hbs');
app.get('/', (req,res)=> {
  res.render('index');
})

app.use('/recipes', require('./routes/recipeRoute'));

app.get('/sync', (req,res)=>{
  let models = require("./models");
  models.sequelize.sync().then(()=>{
    res.send("Database completed successfully");
    })
  });
app.set("port", process.env.PORT || 3000);
app.listen(app.get('port'),()=>{
  console.log(`server is running on port ${app.get("port")}`);
});

cl