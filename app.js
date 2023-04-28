const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const connectDB = require('./config/db_Conn');
const ToDoController = require('./controllers/ToDoController');


app.use(bodyParser.json());  //middleware for capturing json in req body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
connectDB();
const list = [
    {
        id: 1,
        title: 'Buy Rice and dhal',
        priority: 'medium',
        isCompleted: false
    },
    {
        id: 2,
        title: 'Go to ATM and withdrawal amount',
        priority: 'high',
        isCompleted: false
    },
]

app.get('/list', ToDoController.getList);
app.get("/list/priority/:priority", (req, res) => {
    const prior = (req.params.priority).toUpperCase();
  const filteredlist = list.filter((item) => item.priority === prior.toString());
  console.log(filteredlist);
  if (!filteredlist.length) res.status(404).send("No high priority in list");
  res.send(filteredlist);
});
app.post('/list',ToDoController.createList)

app.patch('/list', ToDoController.updateList);
app.delete('/list', ToDoController.deleteList);

app.get("/list/:priority", ToDoController.getPriority);

app.patch('/list/update', ToDoController.updateComplete);



app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})