const router = require('express').Router();
const sequelize = require('../config/connection');
const { Item, User} = require('../models');
const withAuth = require('../utils/auth');


router.get('/:thankyouflag?', withAuth, (req, res) => {

  Item.findAll({
    where: {
      user_id: req.session.user_id
    }
  })
    .then(itemData => {

      console.log(itemData)

      if (!itemData) {

        res.render('dashboard', { logged_in: true });

      } else {
        const items = itemData.map((item) => item.get({ plain: true }));
        console.log(req.session.user_name)
        res.render('dashboard', {
          items: items,
          logged_in: true,
          user_name: req.session.user_name,
          thanks: (req.params.thankyouflag !== undefined) ? true : false
        });

      }
    }).catch(err => {
      console.log(err)
      res.status(400).send(err)
    })



});

router.get('/edit-item/:id', async (req, res) => {
  const itemData = await Item.findAll({
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });

  const items = itemData.map((item) => item.get({ plain: true }));
  
  res.render('edit-item', {
     items,
     logged_in: true,
     user_name: req.session.user_name
   });
});

module.exports = router;