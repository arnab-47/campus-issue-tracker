import { useContext, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ReportIssue from "./pages/ReportIssue.jsx";
import IssueDetails from "./pages/IssueDetails.jsx";

import {
  AuthProvider,
  AuthContext
} from "./context/AuthContext.jsx";

import api from "./api/axios.js";


function RequireAuth({ children }) {
  const { user } = useContext(AuthContext);

  return user
    ? children
    : <Navigate to="/signin" replace />;
}


function AppRoutes() {
  const { user } = useContext(AuthContext);

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // GET ALL ISSUES
  useEffect(() => {
    if (!user) {
      setIssues([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchIssues() {
      setLoading(true);
      setError("");

      try {
        const res = await api.get("/issues");

        if (!cancelled) {
          setIssues(res.data);
        }

      } catch (err) {
        console.error(err);

        if (!cancelled) {
          setError(
            "Couldn't load issues. Is the API running?"
          );
        }

      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchIssues();

    return () => {
      cancelled = true;
    };

  }, [user]);


  // ADD ISSUE
  async function addIssue(newIssue) {
    try {
      const res = await api.post("/issues", {
        title: newIssue.title,
        category: newIssue.category,
        description: newIssue.description,
        reportedBy: user.id
      });

      setIssues((prev) => [
        res.data,
        ...prev
      ]);

      return res.data;

    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  // UPDATE STATUS - ADMIN
  async function updateStatus(id, status) {
    try {

      const res = await api.patch(
        `/issues/${id}`,
        {
          status,
          userId: user.id
        }
      );

      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id
            ? res.data
            : issue
        )
      );

      return res.data;

    } catch (err) {
      console.error(err);
      throw err;
    }
  }


  // UPVOTE ISSUE
  async function upvote(id) {
    try {

      const res = await api.patch(
        `/issues/${id}/upvote`
      );

      setIssues((prev) =>
        prev.map((issue) =>
          issue._id === id
            ? res.data
            : issue
        )
      );

    } catch (err) {
      console.error("Error upvoting:", err);
    }
  }


  return (
    <>
      <Navbar />

      <Routes>

        {/* SIGN IN */}
        <Route
          path="/signin"
          element={<SignIn />}
        />


        {/* SIGN UP */}
        <Route
          path="/signup"
          element={<SignUp />}
        />


        {/* DASHBOARD */}
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard
                issues={issues}
                loading={loading}
                error={error}
                onUpvote={upvote}
              />
            </RequireAuth>
          }
        />


        {/* REPORT ISSUE */}
        <Route
          path="/report"
          element={
            <RequireAuth>
              <ReportIssue
                onAddIssue={addIssue}
              />
            </RequireAuth>
          }
        />


        {/* ISSUE DETAILS */}
        <Route
          path="/issue/:id"
          element={
            <RequireAuth>
              <IssueDetails
                issues={issues}
                loading={loading}
                error={error}
                onUpdateStatus={updateStatus}
              />
            </RequireAuth>
          }
        />


        {/* UNKNOWN ROUTE */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>
    </>
  );
}


function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}


export default App;