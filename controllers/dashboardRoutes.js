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


/*router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      },
      {
        model: User,
        attributes: ['username', 'twitter', 'github']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
 
      // serialize the data
      const post = dbPostData.get({ plain: true });

      res.render('edit-post', {
          post,
          loggedIn: true
          });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/create/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      },
      {
        model: User,
        attributes: ['username', 'twitter', 'github']
      }
    ]
  })
    .then(dbPostData => {
      // serialize data before passing to template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('create-post', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
*/

module.exports = router;