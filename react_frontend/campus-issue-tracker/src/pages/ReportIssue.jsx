import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  title: "",
  category: "",
  description: "",
};

const categories = [
  "Plumbing",
  "Electrical",
  "Internet",
  "Food",
  "Other",
];


function ReportIssue({ onAddIssue }) {

  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();


  // ===============================
  // HANDLE INPUT CHANGE
  // ===============================

  function handleChange(e) {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  }


  // ===============================
  // HANDLE FORM SUBMIT
  // ===============================

  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    const {
      title,
      category,
      description,
    } = formData;


    // VALIDATION

    if (!title || !category || !description) {

      setError("Please fill in every field.");

      return;

    }


    if (description.length < 15) {

      setError(
        "Description must be at least 15 characters."
      );

      return;

    }


    setSubmitting(true);


    try {

      console.log("Submitting form:", formData);

      await onAddIssue({
        title,
        category,
        description,
      });


      // RESET FORM

      setFormData(initialForm);


      // GO TO DASHBOARD

      navigate("/");


    } catch (err) {

      console.error(
        "Submit error:",
        err.response?.data || err.message
      );


      setError(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Couldn't submit the issue. Please try again."
      );

    } finally {

      setSubmitting(false);

    }

  }


  return (

    <main>

      <div className="auth-wrap">

        <section className="auth-card">

          <h1>Report an issue</h1>

          <p className="subtext">
            Tell us what's broken — admins will pick it up from the dashboard.
          </p>


          <form
            onSubmit={handleSubmit}
            noValidate
          >


            {/* TITLE */}

            <div className="form-group">

              <label htmlFor="title">
                Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                placeholder="Leaking tap in Block C washroom"
                value={formData.title}
                onChange={handleChange}
              />

            </div>


            {/* CATEGORY */}

            <div className="form-group">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >

                <option
                  value=""
                  disabled
                >
                  Choose a category
                </option>


                {categories.map((category) => (

                  <option
                    key={category}
                    value={category}
                  >

                    {category}

                  </option>

                ))}

              </select>

            </div>


            {/* DESCRIPTION */}

            <div className="form-group">

              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="What's wrong, and where exactly?"
                value={formData.description}
                onChange={handleChange}
              />

            </div>


            {/* ERROR */}

            {error && (

              <p className="error-text visible">
                {error}
              </p>

            )}


            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className="btn-primary"
              disabled={submitting}
            >

              {submitting
                ? "Submitting..."
                : "Submit Issue"
              }

            </button>


          </form>

        </section>

      </div>

    </main>

  );

}


export default ReportIssue;