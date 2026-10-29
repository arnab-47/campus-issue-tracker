import { Link } from "react-router-dom";

function IssueCard({ issue, onUpvote }) {

  const statusClass = issue.status
    .toLowerCase()
    .replace(" ", "-");


  function handleUpvoteClick(e) {
    e.preventDefault();
    e.stopPropagation();

    onUpvote(issue._id);
  }


  return (
    <article className="issue-card">

      <Link
        to={`/issue/${issue._id}`}
        className="card-link"
      >

        <div className="card-top">

          <span className="badge category">
            {issue.category}
          </span>

          <span
            className={`status ${statusClass}`}
          >
            {issue.status}
          </span>

        </div>


        <h3>{issue.title}</h3>

        <p className="meta">
          {issue.votes} votes
        </p>

      </Link>


      <div className="card-footer">

        <button
          className="vote-btn"
          onClick={handleUpvoteClick}
        >
          ▲ {issue.votes}
        </button>

      </div>

    </article>
  );
}

export default IssueCard;