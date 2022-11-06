const express = require("express");
const blogController = require("../controllers/blogController");
const passport = require("passport");
const blogRouter = express.Router();

blogRouter.get("/:blogId", blogController.getBlog);
blogRouter.get("/", blogController.getBlogs);
blogRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  blogController.createBlog
);
blogRouter.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  blogController.updateBlog
);
blogRouter.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  blogController.deleteBlog
);

module.exports = blogRouter;
