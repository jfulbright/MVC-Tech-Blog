const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

//GET all Blog Posts by Users
router.get('/user', async (req, res) => {
  try {
    const postData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Return Error Message if no product is found
    if (!postData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all Blog Posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });

    // Return Error Message if no product is found
    if (!postData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }

    // Else Return Product Object
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all Posts by 1 User
router.get('/user/:id', async (req, res) => {
  try {
    const postData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    // Return Error Message if no post is found
    if (!postData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }
    // Else Return Post Object
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET 1 Posts
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    // Return Error Message if no post is found
    if (!postData) {
      res.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }
    // Else Return Post Object
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE A post
router.post('/', async (req, res) => {
  try {
    const postData = await Post.create(req.body);
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE a post by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!postData) {
      req.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a post by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Return Error Message if no product is found
    if (!postData) {
      res.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }

    // Else Return Product Object
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET one Post with comments:
router.get('/comments/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [{ model: Comment }],
    });

    // Return Error Message if no product is found
    if (!postData) {
      res.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(postData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
