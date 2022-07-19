const express = require('express');
const path = require('path');

const checkListRouter = require('./src/routes/checkList')
const taskRouter = require('./src/routes/task')
const rootRouter = require('./src/routes/index')
const methodOverride = require('method-override');

require('./config/database');

const app = express();
app.use(express.json());//Este middleware está traduzindo nosso JSON que está vindo da nossa requisição e traduzindo-o para o nosso servidor
app.use(express.urlencoded({extended: true}));//Ja esta trazir nossos dados que está vindo de um form.
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(express.static(path.join(__dirname, 'public/')));

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklists', checkListRouter);
app.use('/checklists', taskRouter.checklistDependent);
app.use('/tasks', taskRouter.simple);

app.listen(3000, () => {
    console.log('Servidor ativo!');
});