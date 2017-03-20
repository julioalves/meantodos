/**
 * Created by Julio on 20-Mar-17.
 */
/**
 * Created by Julio on 20-Mar-17.
 */

var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

var db = mongojs('mongodb://admin:admin@ds059947.mlab.com:59947/questoes-mongo', ['todos']);

router.get('/todos', function (req, res, next) {

    db.todos.find(function (err, todos) {
        if (err) {
            res.send(err);
        } else {
            res.json(todos);
        }
    })
});


router.get('/todo/:id', function (req, res, next) {

    db.todos.findOne({_id: mongojs.ObjectId(req.params.id)},
        function (err, todos) {
            if (err) {
                res.send(err);
            } else {
                res.json(todos);
            }
        })
});

router.post('/todo', function (req, res, next) {

    var todo = req.body;
    if (!todo.text || !(todo.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "invalid Data"
        });
    }
    else {
        db.save(todo, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        })
    }
});

router.put('/todo/:id', function (req, res, next) {

    var todo = req.body;
    var updObj = {};
    updObj.isCompleted = todo.isCompleted;
    updObj.text = todo.text;

    if (!updObj){
        res.status(400);
        res.json({
            "error": "invalid Data"
        });
    }
    else {
        db.todo.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        })
    }
});

router.delete('/todo/:id', function (req, res, next) {
        db.todo.update({
            _id: mongojs.ObjectId(req.params.id)
        }, '', {}, function (err, result) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(result);
            }
        })
});

module.exports = router;