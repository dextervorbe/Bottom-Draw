const router = require('express').Router();
const { Item } = require('../../models');
const withAuth = require('../../utils/auth');

//,,
router.post('/', withAuth, async (req, res) => {

  try {
    const newItem = await Item.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.redirect("/dashboard")
  } catch (err) {
    res.status(400).json(err);
  }
 
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const itemData = await Item.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!itemData) {
      res.status(404).json({ message: 'You may not remove this item!' });
      return;
    }

    res.status(200).json(itemData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
