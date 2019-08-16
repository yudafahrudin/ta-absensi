const App = require('express');
const router = App.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const models = require('../models');

router.post('/admin/register', (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        await models.users
          .create({
            name,
            username,
            email,
            password: hash,
            schoolclassId: 1,
          })
          .then(respons =>
            res.json({
              status: 'ok',
              data: respons,
            }),
          )
          .catch(err => {
            res.json({
              status: 'error',
              message: err.message,
            });
          });
      });
    });
  } catch (err) {
    res.json({
      status: 'error',
      messages: err.messages,
      data: {},
    });
  }
});

router.post('/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    await models.users
      .findOne({
        where: {
          username,
        },
      })
      .then(user => {
        bcrypt.compare(password, user.password).then(response => {
          const jwtUser = {
            id: user.id,
            username: user.username,
            email: user.email,
            type: user.type,
          };

          if (response) {
            jwt.sign(
              {
                jwtUser,
              },
              process.env.SCREET_KEY,
              (err, token) => {
                res.json({
                  status: 'ok',
                  token,
                });
              },
            );
          } else {
            res.json({
              status: 'error',
              messages: 'password atau username salah',
            });
          }
        });
      });
  } catch (err) {
    res.json({
      status: 'error',
      messages: err.messages,
      data: {},
    });
  }
});

router.post('/user/login', (req, res) => {});

module.exports = router;
