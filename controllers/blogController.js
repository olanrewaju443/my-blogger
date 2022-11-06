const { blogModel, blogState } = require("../models/blogModel");
const moment = require("moment");

exports.createBlog = async (req, res) => {
  try {
    const blogBody = req.body;
    const wordCount = blogBody.body.split(" ").length;
    const reading_time = `${Math.floor(wordCount / 200)} minute(s)`;
    blogBody.author = req.user._id;
    const blog = await blogModel.create({
      author: blogBody.author,
      title: blogBody.title,
      description: blogBody.description,
      tags: blogBody.tags,
      body: blogBody.body,
      reading_time,
    });
    return res.status(201).json({ status: true, blog });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const { query } = req;
    const {
      timestamp,
      author,
      title,
      tags,
      read_count = "asc",
      reading_time = "asc",
      blog_by = "timestamp",
      page = 1,
      per_page = 20,
    } = query;

    const findQuery = {};

    if (timestamp) {
      findQuery.timestamp = {
        $gt: moment(timestamp).startOf("day").toDate(),
        $lt: moment(timestamp).endOf("day").toDate(),
      };
    }

    if (author) {
      findQuery.author = author;
    }

    if (title) {
      findQuery.title = title;
    }

    if (tags) {
      findQuery.tags = tags;
    }

    const sortQuery = {};

    const sortAttributes = blog_by.split(",");

    for (const attribute of sortAttributes) {
      if (read_count === "asc" && reading_time === "asc") {
        sortQuery[attribute] = 1;
      }
      if (read_count === "desc" && reading_time === "desc") {
        sortQuery[attribute] = -1;
      }
    }

    const blogs = await blogModel

      .find({ state: blogState.published }, findQuery)
      .sort(sortQuery)
      .skip(page)
      .limit(per_page)
      .populate("author", "-password -__v");
    res.status(200).json({ status: true, blogs });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

exports.getBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await blogModel
      .findById(blogId)
      .populate("author", "-password -__v");

    if (!blog) {
      return res.status(404).json({ status: false, blog: null });
    }
    blog.read_count += 1;
    blog.save();
    return res.json({ status: true, blog });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const blog = await blogModel.findById(id);
    blog.timestamp.updated_at = new Date(); // set the lastUpdateAt to the current date
    if (blog.state === blogState.published)
      return res.status(401).json({ error: "blog already published" });
    blog.state = blogState.published;
    await blog.save();

    res.status(200).json({ status: true, blog });
  } catch (error) {
    next(error);
  }
  //     const { id: taskID } = req.params
  //     const blogBody = req.body;
  //     const wordCount = blogBody.body.split(" ").length
  //     const reading_time = `${Math.floor(wordCount/200)} minute(s)`

  //     const blog = await blogModel.findOneAndUpdate({ _id: taskID }, {
  //         author: blogBody.author,
  //         title: blogBody.title,
  //         description: blogBody.description,
  //         tag: blogBody.tag,
  //         body: blogBody.body,
  //         reading_time
  //     }, {
  //         new: true,
  //         runValidators: true,
  //       })

  //     if (!blog) {
  //         return res.status(404).json({ status: false, blog: "No blog post found" })
  //     }

  //     await blog.save()
  //     return res.json({ status: true, blog })
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;

  const blog = await blogModel.deleteOne({ _id: id });

  return res.json({ status: true, message: "blog successfully deleted" });
};
