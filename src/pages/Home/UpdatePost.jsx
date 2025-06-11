import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Spinner from "../../components/Spinner";

const UpdatePost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        data.deadline = new Date(data.deadline); // convert to Date object for DatePicker
        setFormData(data);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      deadline: date,
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();

  fetch(`http://localhost:3000/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.modifiedCount > 0) {
        Swal.fire("Updated!", "Post updated successfully", "success");
        navigate("/my-post");
      } else if (data.modifiedCount === 0) {
        Swal.fire("No changes!", "No updates were made to the post.", "info");
      }
    })
    .catch((err) => {
      Swal.fire("Error!", "Failed to update the post", "error");
      console.error("Update error:", err);
    });
};

  if (loading) return <Spinner></Spinner>
  if (!formData) return <p>Post not found.</p>;

  return (
    <div className="w-11/12 max-w-2xl mx-auto p-6 shadow-md  rounded-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Update Volunteer Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail URL"
          className="input input-bordered w-full"
        />
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Post Title"
          className="input input-bordered w-full"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
        ></textarea>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">Select Category</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="social service">Social Service</option>
          <option value="animal welfare">Animal Welfare</option>
        </select>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
        />
        <input
          type="number"
          name="volunteersNeeded"
          value={formData.volunteersNeeded}
          onChange={handleChange}
          placeholder="Volunteers Needed"
          className="input input-bordered w-full"
        />
        <div>
          <label className="block mb-1">Deadline:</label>
          <DatePicker
            selected={formData.deadline}
            onChange={handleDateChange}
            className="input input-bordered w-full"
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <input
          type="text"
          value={user?.displayName}
          readOnly
          className="input input-bordered w-full "
        />
        <input
          type="email"
          value={user?.email}
          readOnly
          className="input input-bordered w-full "
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
