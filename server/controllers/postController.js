const Post = require('../models/postSchema.js');
const User = require('../models/userSchema.js');
const { post } = require('../routes/authRoutes.js');

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
module.exports.getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find()
        res.json({
            posts
        })
    } catch (error) {
        console.error(error)
    
    }
}

module.exports.addComment = async(req, res) => {
    const userId = req.params.id;
    const { postId, comment } = req.body;
    try {
        const comment = await Post.create({comment})
        const updatedPost = await Post.findByIdAndUpdate(userId, postId,
            {$push: {comments: comment._id}}, {new: true}
        )
        res.json({
            post: updatedPost
        })
    } catch (error) {
        console.error(error);
    }
}
