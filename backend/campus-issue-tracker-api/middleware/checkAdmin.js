const User = require("../models/User");

// Runs BEFORE updateStatus (wired up in routes/issueRoutes.js). Looks up the
// user making the request — by the userId the frontend sends in the request
// body — and only calls next() to continue to the real route handler if that
// user's role, as stored in MongoDB right now, is "admin".
//
// Deliberately re-checks the database instead of trusting req.body.role: a
// client can put anything at all in a JSON body, but it can't fake what's
// actually stored against its own userId in the users collection. This is
// the part IssueDetail.jsx's `user?.role === "admin"` check on Day 3 was
// missing — that only hid a button; this actually enforces the rule.
async function checkAdmin(req, res, next) {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(401).json({ message: "userId is required for this action." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unrecognized user." });
    }
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Admin role required for this action." });
    }

    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid userId." });
  }
}

module.exports = checkAdmin;