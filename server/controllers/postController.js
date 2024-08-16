const Post = require('../models/postSchema.js');
const User = require('../models/userSchema.js');


module.exports.createPost = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.json({ message: "User not found" });
  }
  try {
    const newPost = await Post.create({
      title: req.body.title,
      content: req.body.content,
      image: req.file.filename,
      user: userId
    });
    const user = await User.findByIdAndUpdate(userId,
      { $push: { posts: newPost._id } }, { new: true });
    res.json({
      post: newPost
    });
  } catch (error) {
    console.log(error);
  }
}
module.exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({ path: 'user', select: 'username' })
      .populate({
        path: 'comments',
        populate: ({
          path: 'userId',
          select: 'username'
        })
      });
    res.json({
      posts
    })
  } catch (error) {
    console.error(error)
  }
}

module.exports.addComment = async (req, res) => {
  const { postId, text, userId } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.json({ error: 'Post not found' });
    }
    post.comments.push({ text, userId });
    await post.save();
    res.json({
      post
    })
  } catch (error) {
    console.error(error);
  }
}

module.exports.getPost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId).populate({ path: 'user', select: 'username' })
      .populate({
        path: 'comments',
        populate: ({
          path: 'userId',
          select: 'username'
        })
      });
    res.json({ post });
  } catch (error) {
    console.error(error);
  }
}

module.exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId).populate({ path: 'likes', select: 'username' });
    // console.log("++++++====", post);
    if (!post) {
      return res.json({
        msg: 'Post not found'
      })
    }
    post.likes.push(userId);
    await post.save();
    res.json({
      msg: "post liked"
    })
  } catch (error) {
    res.json({
      msg:
        error
    })
    console.error(error);
  }
}