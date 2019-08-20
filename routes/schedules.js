const App = require('express');
const router = App.Router();
const Auth = require('../helper/auth');
const models = require('../models');
const bcrypt = require('bcryptjs');

// Current user schedules
router.get('/mobile', Auth.verifyToken, async (req, res) => {
  const userId = Auth.getDecode(req).jwtUser.id || null;
  await models.schedules
    .findAll({
      include: [{ model: models.subjects }, { model: models.schoolclass }],
      where: {
        userId,
      },
    })
    .then(respons => {
      res.json({ status: 'ok', data: respons });
    });
});

// Get ALL
router.get('/', Auth.verifyToken, async (req, res) => {
  await models.users
    .findAll({ attributes: { exclude: ['password'] } })
    .then(respons => {
      res.json({ status: 'ok', data: respons });
    });
});

// Get BY id
router.get('/:id', Auth.verifyToken, async (req, res) => {
  const id = parseInt(req.params.id);
  await models.users
    .findOne({
      attributes: { exclude: ['password'] },
      include: [{ model: models.schoolclass }, { model: models.schedules }],
      where: {
        id,
      },
    })
    .then(respons => {
      res.json({ status: 'ok', data: respons });
    });
});

// CREATE
router.post('/create', Auth.verifyToken, async (req, res) => {
  const { schoolclassId, subjectId, userId, startAt, finishAt } = req.body;
  //   let usernameChekcer = username || unique_number;
  try {
    // bcrypt.genSalt(10, (err, salt) => {
    //   bcrypt.hash(password, salt, async (err, hash) => {

    //   });
    // });
    await models.schedules
      .create({
        schoolclassId,
        subjectId,
        userId,
        startAt,
        finishAt,
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
  } catch (err) {
    res.json({
      status: 'error',
      messages: 'server error',
    });
  }
});

// UPDATE
router.put('/update/:id', async (req, res) => {
  try {
    await models.users
      .update(
        {
          ...req.body,
        },
        { returning: true, where: { id: req.params.id } },
      )
      .then(respons =>
        res.json({
          status: 'ok',
          data: Boolean(respons[1]),
        }),
      )
      .catch(err => {
        res.json({
          status: 'error',
          message: err.message,
        });
      });
  } catch (err) {
    console.log(err);
    res.json({
      status: 'error',
      messages: 'server error',
    });
  }
});

// DELETE
router.delete('/delete', async (req, res) => {
  try {
    await models.users
      .destroy({ where: { id: req.body.id } })
      .then(respons =>
        res.json({
          status: 'ok',
          data: Boolean(respons),
        }),
      )
      .catch(err => {
        res.json({
          status: 'error',
          message: err.message,
        });
      });
  } catch (err) {
    console.log(err);
    res.json({
      status: 'error',
      messages: 'server error',
    });
  }
});

module.exports = router;
