import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import VolunteerModal from "./VolunteerModal";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data))
      .catch((err) => console.error("Error loading post:", err));
  }, [id]);

  if (!post) return <div className="text-center py-10">Loading...</div>;

  const {
    thumbnail,
    title,
    description,
    category,
    location,
    volunteersNeeded,
    deadline,
    organizerName,
    organizerEmail,
  } = post;

  const handleVolunteerClick = () => {
    if (!user) {
      Swal.fire("Unauthorized", "Please log in first", "warning");
      return;
    }
    setShowModal(true); // ✅ Show modal
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded p-6 my-8">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-4">{description}</p>

      <ul className="text-gray-600 dark:text-gray-300 space-y-1 mb-6">
        <li><strong>Category:</strong> {category}</li>
        <li><strong>Location:</strong> {location}</li>
        <li><strong>Volunteers Needed:</strong> {volunteersNeeded}</li>
        <li><strong>Deadline:</strong> {new Date(deadline).toLocaleDateString()}</li>
        <li><strong>Organizer:</strong> {organizerName} ({organizerEmail})</li>
      </ul>

      <button
        onClick={handleVolunteerClick}
        className="bg-pink-600 text-white px-5 py-2 rounded hover:bg-pink-700 transition"
      >
        Be a Volunteer
      </button>

      {showModal && (
        <VolunteerModal post={post} onClose={() => setShowModal(false)}></VolunteerModal>
      )}
    </div>
  );
};

export default PostDetails;
