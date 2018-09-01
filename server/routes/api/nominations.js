const express = require("express");
const router = express.Router();

// import model
const Nomination = require("../../models/Nomination");

// import validation
const validateNomination = require("../../validation/nomination");
const validateComment = require("../../validation/comment");

// @route   GET /api/nominations/test
// @desc    Tests the route
// @access  Public
router.get("/test", (req, res) => {
  res.json({ routeworks: true });
});

// @route   GET /api/nominations
// @desc    Retrieve all posts
// @access  Public
router.get("/", (req, res) => {
  Nomination.find({ approved: true }).then(nominations =>
    res.json(nominations)
  );
});

// @route   POST /api/nominations
// @desc    Submit a nomination
// @access  Public
router.post("/", (req, res) => {
  // validate
  const { errors, isValid } = validateNomination(req.body);

  if (!isValid) return res.status(400).json(errors);

  const { name, description, picture, country, province, tags } = req.body;

  // create post
  const newNomination = new Nomination({
    name,
    description,
    picture,
    country,
    province,
    tags,
    approved: true
  });

  // save post
  newNomination
    .save()
    .then(nomination => res.json(nomination))
    .catch(err => res.status(400).json(err));
});

// @route   DELETE /api/nominations/:id
// @desc    Delete a post
// @access  Public
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  // find and return comments
  Nomination.findById(id)
    .then(nomination => {
      nomination
        .remove()
        .then(() => res.json({ deleted: true }))
        .catch(err => res.status(404).json(err));
    })
    .catch(err => res.status(400).json(err));
});

// @route   GET /api/nominations/:id/comments
// @desc    Retrieve comments for a post
// @access  Public
router.get("/:id/comments", (req, res) => {
  const { id } = req.params;

  // find and return comments
  Nomination.findById(id)
    .then(nomination => {
      return res.json(nomination.comments);
    })
    .catch(err => res.status(400).json(err));
});

// @route   POST /api/nominations/:id/comment
// @desc    Comment on a nomination
// @access  Public
router.post("/:id/comment", (req, res) => {
  // validate
  const { errors, isValid } = validateComment(req.body);

  if (!isValid) return res.status(400).json(errors);

  // destructure data
  const { id } = req.params;
  const { comment } = req.body;

  // retrieve nomination
  Nomination.findById(id)
    .then(nomination => {
      // insert into array
      nomination.comments.unshift({ comment });

      // save
      nomination
        .save()
        .then(nomination => res.json(nomination))
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(404).json(err));
});

module.exports = router;
