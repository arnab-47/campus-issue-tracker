const Issue = require("../models/Issue");

// ==========================================
// GET ALL ISSUES
// GET /api/issues
// ==========================================
async function getIssues(req, res) {
  try {
    const issues = await Issue.find()
      .populate("reportedBy", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}


// ==========================================
// GET SINGLE ISSUE
// GET /api/issues/:id
// ==========================================
async function getIssueById(req, res) {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate("reportedBy", "username email");

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found.",
      });
    }

    res.status(200).json(issue);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}


// ==========================================
// CREATE ISSUE
// POST /api/issues
// ==========================================
async function createIssue(req, res) {
  try {
    const {
      title,
      category,
      description,
      reportedBy,
    } = req.body;

    // Basic validation
    if (!title || !category || !description || !reportedBy) {
      return res.status(400).json({
        message:
          "Title, category, description and reportedBy are required.",
      });
    }

    const issue = await Issue.create({
      title,
      category,
      description,
      reportedBy,
    });

    res.status(201).json(issue);

  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
}


// UPDATE ISSUE STATUS
// PATCH /api/issues/:id

async function updateStatus(req, res) {
  try {
    const { status } = req.body;

    // Check if status is provided
    if (!status) {
      return res.status(400).json({
        message: "Status is required."
      });
    }

    // Allowed statuses
    const allowedStatus = [
      "Open",
      "In Progress",
      "Resolved"
    ];

    // Check if the status is valid
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status."
      });
    }

    // Find issue
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found."
      });
    }

    // Update status
    issue.status = status;

    // Save changes
    await issue.save();

    // Send updated issue
    res.status(200).json(issue);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
}

async function upvoteIssue(req, res) {
  try {

    const issue = await Issue.findById(
      req.params.id
    );

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found."
      });
    }


    issue.votes += 1;

    await issue.save();

    res.status(200).json(issue);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });

  }
}

// ==========================================
// DELETE ISSUE
// DELETE /api/issues/:id
// ==========================================
async function deleteIssue(req, res) {
  try {
    const issue = await Issue.findByIdAndDelete(
      req.params.id
    );

    if (!issue) {
      return res.status(404).json({
        message: "Issue not found.",
      });
    }

    res.status(200).json({
      message: "Issue deleted successfully.",
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}


// ==========================================
// EXPORT FUNCTIONS
// ==========================================
module.exports = {
  getIssues,
  getIssueById,
  createIssue,
  updateStatus,
  upvoteIssue,
  deleteIssue,
};