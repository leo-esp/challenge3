import express from 'express';
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer') // v1.0.5
const upload = multer()
const qs = require('qs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('query parser',
  (str) => qs.parse(str, { /* custom options */ }))

var tasks = [{
  id: 1,
  title: 'Test',
  completed: false
}];

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/tasks', (req, res) => {
  res.send(tasks);
});

app.post('/tasks', (req, res) => {
  if(!req.body.title){
    res.send('title is obrigatory')
  }  
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed
  }
  tasks.push(newTask)
  res.send(tasks);
});

app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id as number
  const taskToChangeIndex = tasks.findIndex(t => t.id === taskId)
  if(taskToChangeIndex !== -1){
    tasks[taskToChangeIndex] = {
      ...tasks[taskToChangeIndex],
      title: req.body.title, 
      completed: req.body.completed
    }
  }else{
    res.send('This task does not exists')
  }
  res.send(tasks);
});

app.delete('/tasks', (req, res) => {
  const taskId = req.params.id as number
  const taskToChangeIndex = tasks.findIndex(t => t.id === taskId)
  if(taskToChangeIndex !== -1){
    tasks = tasks.splice(taskToChangeIndex, 1)
  }else{
    res.send('This task does not exists')
  }
  res.send('Hello world!');
});
console.log(process.env)
const port = parseInt('5000');

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
