import { useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";
import VolunteerModal from "./VolunteerModal";
import NotFound from "../../components/NotFound";
import { Helmet } from "react-helmet-async";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const { user } = useContext(AuthContext);

 const fetchPostDetails = () => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid post ID");
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setError(false);
      })
      .catch((err) => {
        console.error("Error loading post:", err);
        setError(true);
      });
  };

  useEffect(() => {
    fetchPostDetails();
  }, [id]);

  if (error) {
    return <NotFound message="Post not found or invalid ID." />;
  }

  if (!post) {
    return <div className="text-center py-10">Loading...</div>;
  }
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
    setShowModal(true);
  };

  return (
    <div >
      <Helmet>
      <title>SERVE NOW || Details</title>
    </Helmet>
            <h1 className="text-4xl flex justify-center items-center w-full text-pink-600 pt-6">volunteer Details</h1>

    <div className="max-w-3xl mx-auto  shadow-md rounded p-6 my-8">

      <img
        src={thumbnail}
        alt={title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold  mb-4">
        {title}
      </h2>
      <p className=" mb-4">{description}</p>

      <ul className=" space-y-1 mb-6">
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

      {/*  Modal */}
      {showModal && (
        <VolunteerModal
          post={post}
          onClose={() => {
            setShowModal(false);
            fetchPostDetails(); 
          }}
        />
      )}
    </div>
    </div>
  );
};

export default PostDetails;
