/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable object-curly-newline */
/* eslint-disable operator-linebreak */
/* eslint-disable quotes */

const express = require("express");
// eslint-disable-next-line import/no-extraneous-dependencies
const fileUpload = require("../features/imageUpload");
const postValidations = require("../features/validations/postValidations");

const {
  getAllPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controller/postController");
const loginVerify = require("../features/loginVerify");
const postValidationsRules = require("../features/validations/postValidationsRules");

const postRouter = express.Router();

postRouter.get("/", getAllPost);
postRouter.post(
  "/create-post",
  loginVerify,
  postValidationsRules,
  postValidations,
  fileUpload.single("file"),
  createPost
);
postRouter.patch("/update-post/:id", fileUpload.single("file"), updatePost);
postRouter.delete("/delete-post", deletePost);

module.exports = postRouter;
