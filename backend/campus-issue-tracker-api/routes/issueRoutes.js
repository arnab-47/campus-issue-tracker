const express = require("express");

const router = express.Router();

const {
  createIssue,
  getIssues,
  getIssueById,
  updateStatus,
  upvoteIssue,
  deleteIssue
} = require("../controllers/issueController");


router.post("/", createIssue);

router.get("/", getIssues);

router.get("/:id", getIssueById);


// ADMIN STATUS UPDATE
router.patch("/:id", updateStatus);


// UPVOTE
router.patch("/:id/upvote", upvoteIssue);


// DELETE
router.delete("/:id", deleteIssue);


module.exports = router;