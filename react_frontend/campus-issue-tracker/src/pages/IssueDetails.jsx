import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.jsx";

function IssueDetails({
  issues,
  loading,
  error,
  onUpdateStatus
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  console.log("Current user:", user);

  // Find the clicked issue
  const issue = issues.find(
    (item) => item._id === id
  );


  // Loading
  if (loading) {
    return (
      <main>
        <p className="status-text">
          Loading issue...
        </p>
      </main>
    );
  }


  // Error
  if (error) {
    return (
      <main>
        <p className="status-text error-status">
          {error}
        </p>
      </main>
    );
  }


  // Issue not found
  if (!issue) {
    return (
      <main>
        <p className="status-text error-status">
          Issue not found.
        </p>

        <button
          className="btn-primary"
          onClick={() => navigate("/")}
        >
          Back to Dashboard
        </button>
      </main>
    );
  }


  // Change status
  async function handleStatusChange(e) {
    try {
      await onUpdateStatus(
        issue._id,
        e.target.value
      );

    } catch (err) {
      console.error(
        "Couldn't update status:",
        err
      );
    }
  }


  // Create CSS class for status
  const statusClass = issue.status
    .toLowerCase()
    .replace(" ", "-");


  return (
    <main>
      <div className="auth-wrap">

        <section className="auth-card">

          {/* Back button */}

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Dashboard
          </button>


          {/* Issue title */}

          <h1>{issue.title}</h1>


          <div className="issue-details">


            {/* Category */}

            <div className="detail-row">

              <strong>Category:</strong>

              <span>
                {issue.category}
              </span>

            </div>


            {/* Description */}

            <div className="detail-row">

              <strong>Description:</strong>

              <p>
                {issue.description}
              </p>

            </div>


            {/* Current status */}

            <div className="detail-row">

              <strong>Current Status:</strong>

              <span
                className={`status ${statusClass}`}
              >
                {issue.status}
              </span>

            </div>


            {/* Reported by */}

            <div className="detail-row">

              <strong>Reported By:</strong>

              <span>
                {issue.reportedBy?.username ||
                  "Unknown"}
              </span>

            </div>


            {/* Votes */}

            <div className="detail-row">

              <strong>Votes:</strong>

              <span>
                {issue.votes}
              </span>

            </div>

          </div>


          {/* ADMIN ONLY */}

          {user?.role === "admin" && (

            <div className="form-group admin-status">

              <label htmlFor="status">
                Update Issue Status
              </label>

              <select
                id="status"
                value={issue.status}
                onChange={handleStatusChange}
              >

                <option value="Open">
                  Open
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>

              </select>

            </div>

          )}

        </section>

      </div>
    </main>
  );
}

export default IssueDetails;