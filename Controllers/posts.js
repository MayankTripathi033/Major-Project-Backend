import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findbyid(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const Post = await Post.find();

    res.status(201).json(Post);
  } catch (error) {
    res.status().json({ message: message.error });
  }
};
/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const FeedPosts = async (req, res) => {
  try {
    const Post = await Post.find();
    res.status(200).json(Post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status().json(post);
  } catch (error) {
    res.status().json({ message: message.error });
  }
};

/*UPDATE*/
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findbyId(id);
    const isLiked = await Post.findbyId(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const update = await post.findbyIdandUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
