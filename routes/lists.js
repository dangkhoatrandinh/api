const express = require('express');
const router = express.Router();

//List, Task Model
const List = require('../db/models/List.model');
const Task = require('../db/models/Task.model');

//List Routes
router.get('/', (req, res) => {
    //return Array of All the List in Database
    List.find().then((list) => {
        res.send(list);
    })
});

router.post('/', (req, res) => {
    //create a new list and return new List to user via JSON request body
    const title = req.body.title;
    const newList = new List({
        title: title
    });
    newList.save()
    .then(() => {
        //Return full list doc
        res.send(newList);
    })
    .catch(err => console.log(err));
});

router.patch('/:id', (req, res) => {
    // Update List by id'
    List.findByIdAndUpdate({_id: req.params.id},
        { $set:  req.body, "date": new Date()}
        ,(err, resDoc) => {
            if (err) throw err;
            if (resDoc) res.send(resDoc);
            else {
                res.status(400).json({ msg: 'Not found' });
            }
        });
});

router.delete('/:id', (req, res) => {
    //Delete list by id
    List.findOneAndRemove({_id:req.params.id},(err, resDoc) => {
        if (err) throw err;
        if (resDoc) res.send(resDoc);
        else {
            res.status(400).json({ msg: 'Not found' });
        }
    })
});

/*********************************/
//List of Tasks
router.get('/:listId', (req, res) => {
    //return Array of All the Task in Database
    const listId = req.params.listId;
    Task.find({ _listId: listId }, (err, task) => {
        res.send(task);
    })
});

router.get('/:listId/tasks/:id', (req, res) => {
    //Get Specific Task 
    const id = req.params.id;
    const listId = req.params.listId;
    Task.findOne({_id: id, _listId: listId}, (err, resDoc) =>{
        if (err) throw err;
        if (resDoc) res.send(resDoc);
        else {
        res.status(400).json({ msg: 'Not found' });
        }
    });
}) 

router.post('/:listId', (req, res) => {
    //create a new list and return new Task to user via JSON request body
    const title = req.body.title;
    const listId = req.params.listId;
    const newTask = new Task({
        title: title,
        _listId: listId
    });
    newTask.save()
    .then(() => {
        //Return full Task doc
        res.send(newTask);
    })
    .catch(err => console.log(err));
});

router.patch('/:listId/:id', (req, res) => {
    // Update Task by id'
    const id = req.params.id;
    Task.findByIdAndUpdate({_id: id},
        { $set:  req.body, "date": new Date()},
        (err, resDoc) => {
            if (err) throw err;
            if (resDoc) res.send(resDoc);
            else {
                res.status(400).json({ msg: 'Not found' });
            }
        });
});

router.delete('/:listId/:id', (req, res) => {
    //Delete list by id
    const id = req.params.id;
    Task.findOneAndRemove({_id: id},(err, resDoc) => {
        if (err) throw err;
        if (resDoc) res.send(resDoc);
        else {
            res.status(400).json({ msg: 'Not found' });
        }
    })
});


module.exports = router;