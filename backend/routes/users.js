const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { AVATAR_REGEX } = require('../constants');

const {
  getUsers, getUserById, updateUser, updateUserAvatar, getCurrentUsers,
} = require('../controllers/users');

router.get('/me', getCurrentUsers);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), updateUser);

router.get('/', getUsers);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helpers) => {
      if (AVATAR_REGEX.test(value)) {
        return value;
      }
      return helpers.message('Некорректная ссылка');
    }),
  }),
}), updateUserAvatar);

module.exports = router;
