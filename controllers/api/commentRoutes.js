const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

//GET all Comments by Users
router.get('/user', async (req, res) => {
  try {
    const commentData = await User.findAll({
      include: [
        {
          model: Comment,
          attributes: { exclude: ['password'] },
        },
      ],
    });

    // Return Error Message if no product is found
    if (!commentData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all Comments
router.get('/', async (req, res) => {
  try {
    const commentData = await Comment.findAll();

    // Return Error Message if no product is found
    if (!commentData) {
      res.status(404).json({ message: 'No Comments exist!' });
      return;
    }
    // Else Return Product Object
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET all Comments by Posts
router.get('/posts', async (req, res) => {
  try {
    const commentData = await Post.findAll({
      include: [{ model: Comment }],
    });

    // Return Error Message if no product is found
    if (!commentData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET all Posts by 1 User
router.get('/user/:id', async (req, res) => {
  try {
    const commentData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Comment,
        },
      ],
    });

    // Return Error Message if no post is found
    if (!commentData) {
      res.status(404).json({ message: "That User doesn't exist!" });
      return;
    }
    // Else Return Post Object
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Posts with User & Comments
router.get('/allModels', async (req, res) => {
  try {
    const commentData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: Comment,
        },
      ],
    });

    // Return Error Message if no product is found
    if (!commentData) {
      res.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }
    // Else Return Product Object
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET one Comment
router.get('/:id', async (req, res) => {
  // find one post by its `id` value
  try {
    const commentData = await Comment.findByPk(req.params.id);

    // Return error if no Post found
    if (!commentData) {
      res.status(404).json({ message: 'No Posts found with this id!' });
      return;
    }

    // Else Return Comment Object
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CREATE A Comment
router.post('/', async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE a comment by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!commentData) {
      req.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE a comment by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    // Return Error Message if no product is found
    if (!commentData) {
      res.status(404).json({ message: "That Post doesn't exist!" });
      return;
    }

    // Else Return Product Object
    res.status(200).json(commentData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
