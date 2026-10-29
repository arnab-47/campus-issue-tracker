import IssueCard from "../components/IssueCard.jsx";

function Dashboard({
  issues,
  loading,
  error,
  onUpvote
}) {
  return (
    <main>

      {loading && (
        <p className="status-text">
          Loading issues…
        </p>
      )}

      {!loading && error && (
        <p className="status-text error-status">
          {error}
        </p>
      )}

      {!loading && !error && (
        <section className="issues-grid">

          {issues.length === 0 ? (

            <p className="empty-state">
              No issues reported yet.
            </p>

          ) : (

            issues.map((issue) => (
              <IssueCard
                key={issue._id}
                issue={issue}
                onUpvote={onUpvote}
              />
            ))

          )}

        </section>
      )}

    </main>
  );
}

export default Dashboard;