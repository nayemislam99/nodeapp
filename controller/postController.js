/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
const fs = require('fs');
const Post = require('../model/postModel');

const getAllPost = async (req, res) => {
  try {
    const getPost = await Post.find();
    let data = [];

    getPost.forEach((singlePost) => {
      const { _id, title, content, image, tags, active, createdAt } =
        singlePost;
      const imageUrl = image.split('/')[2];
      const newData = {
        _id,
        title,
        content,
        imageUrl: `https://dosbubble.cyclic.app/image/${imageUrl}`,
        tags,
        active,
        createdAt,
      };
      data = [...data, newData];
    });

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

const createPost = async (req, res) => {
  // console.log(req.body);

  const payload = req.body;
  const tagsArray = payload.tags.split(',');
  let imgUrl = '';
  if (req.file) imgUrl = `upload/images/${req.file.filename}`;
  payload.image = imgUrl;
  payload.tags = tagsArray;

  try {
    const newPost = await new Post(payload).save();
    res.status(201).json({
      status: 'success',
      msg: 'Successfully create new post',
      data: newPost,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      msg: error.message,
    });
  }
};

// http://localhost:8000/api/post/update-post/:id

const updatePost = async (req, res) => {
  const payload = req.body;
  const { id } = req.params;

  let imgUrl = '';

  try {
    if (req.file) {
      imgUrl = `upload/images/${req.file.filename}`;
      const findImgae = await Post.findById(id);
      const postImg = findImgae.image;
      console.log(postImg);
      if (postImg) {
        fs.unlinkSync(`./${findImgae.image}`);
      }
      payload.image = imgUrl;

      await Post.findByIdAndUpdate({ _id: id }, payload);
      res.status(200).json({
        status: 'success',
        msg: 'Sucessfully updateted',
      });
    } else {
      await Post.findByIdAndUpdate({ _id: id }, payload);
      res.status(200).json({
        status: 'success',
        msg: 'Sucessfully updateted',
      });
    }
  } catch (error) {
    res.status(200).json({
      status: 'error',
      msg: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: 'success',
      msg: 'Sucessfully delete post',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      msg: err.message,
    });
  }
};

module.exports = {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
};
