var express = require('express');
var router = express.Router();
const JsonDB = require('@aytacmalkoc/jsondb');

// JsonDB always creates database files in the root directory.
const db = new JsonDB('db/users.json');

/* Users listing */
router.get('/', function (req, res, next) {
  const users = db.findAll('users');

  res.json(users);
});

/* Add user */
router.post('/create', function (req, res, next) {
  const user = db.add('users', {
    name: req.body.name,
    surname: req.body.surname,
    age: req.body.age,
    gender: req.body.gender,
    email: req.body.email,
  });

  res.status(200).json(user)
});

/* Find user by id */
router.get('/:id', function (req, res, next) {
  const user = db.findById('users', req.params.id);

  res.json(user);
});


/* Update user */
router.post('/update/:id', function (req, res, next) {
  const user = db.update('users', req.params.id, req.body);

  res.json(user);
});

/* Delete user */
router.delete('/delete/:id', function (req, res, next) {
  const del = db.delete('users', req.params.id);

  if (del) return res.status(200).json({ message: 'User deleted' });

  res.status(404).json({ message: 'User not found' });
});

/* Delete all users */
router.delete('/deleteAll', function (req, res, next) {
  const del = db.deleteAll('users');

  if (del) return res.status(200).json({ message: 'All users deleted' });

  res.status(404).json({ message: 'No users found' });
});

module.exports = router;
