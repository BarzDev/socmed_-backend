const router = require("express").Router();
const Posting = require("../models/posting");

// Endpoint to get all postings
router.get("/", async (req, res) => {
  try {
    const postings = await Posting.find();
    res.status(200).json({ postings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint to create a new posting
router.post("/", async (req, res) => {
  const { content, author, photo } = req.body;

  const newPosting = new Posting({
    content,
    author,
    photo,
  });

  try {
    if (!content || !author || !photo) {
      res.status(404).json({ message: "missing property" });
    }

    const savedPosting = await newPosting.save();
    res.status(201).json(savedPosting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint to add a comment to an existing posting
router.post("/comment/:id", async (req, res) => {
  const { content, author, photo } = req.body;
  const postingId = req.params.id;

  try {
    if (!content || !author || !photo) {
      res.status(404).json({ message: "missing property" });
    }

    const posting = await Posting.findById(postingId);
    if (!posting) {
      return res.status(404).json({ message: "Posting not found" });
    }

    const newComment = {
      content,
      author,
      photo,
    };

    posting.comments.push(newComment);
    const updatedPosting = await posting.save();

    res.status(201).json(updatedPosting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/like/:id", async (req, res) => {
  const postingId = req.params.id;
  try {
    const posting = await Posting.findById(postingId);
    res.status(200).json({ posting });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/like/:id", async (req, res) => {
  const postingId = req.params.id;
  const userId = req.body.userId;
  try {
    if (!userId) {
      return res.status(404).json({ message: "userId required" });
    }

    const posting = await Posting.findById(postingId);
    if (!posting) {
      return res.status(404).json({ message: "Posting not found" });
    }

    if (posting.likes.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You have already liked this posting" });
    }
    posting.likes.push(userId);
    const updatedPosting = await posting.save();
    res.status(200).json(updatedPosting.likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/unlike/:id", async (req, res) => {
  const postingId = req.params.id;
  const userId = req.body.userId;

  try {
    if (!userId) {
      return res.status(404).json({ message: "userId required" });
    }

    const posting = await Posting.findById(postingId);

    if (!posting) {
      return res.status(404).json({ message: "Posting not found" });
    }

    const likeIndex = posting.likes.indexOf(userId);
    if (likeIndex === -1) {
      return res
        .status(400)
        .json({ message: "You have not liked this posting yet" });
    }

    posting.likes.splice(likeIndex, 1);
    const updatedPosting = await posting.save();

    res.status(200).json(updatedPosting.likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
