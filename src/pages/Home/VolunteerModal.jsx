import { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthContext";

const VolunteerModal = ({ post, onClose }) => {
  const { user } = useContext(AuthContext);

  const handleRequest = () => {
    const volunteerData = {
      postId: post._id,
      thumbnail: post.thumbnail,
      title: post.title,
      description: post.description,
      category: post.category,
      location: post.location,
      deadline: post.deadline,
      organizerName: post.organizerName,
      organizerEmail: post.organizerEmail,
      volunteerName: user.displayName,
      volunteerEmail: user.email,
      suggestion: document.getElementById("suggestion").value,
      status: "requested",
    };

    fetch("http://localhost:3000/volunteer-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(volunteerData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success", "Volunteer request submitted", "success");
        onClose(); 
      });
  };

  return (
    <div className="fixed inset-0 bg-stone-800 bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-xl font-bold cursor-pointer">✖</button>
        <h2 className="text-xl font-bold mb-4">Be a Volunteer</h2>

        <div className="space-y-2 text-sm">
          <p><strong>Title:</strong> {post.title}</p>
          <p><strong>Category:</strong> {post.category}</p>
          <p><strong>Description:</strong> {post.description}</p>
          <p><strong>Location:</strong> {post.location}</p>
          <p><strong>Volunteers Needed:</strong> {post.volunteersNeeded}</p>
          <p><strong>Deadline:</strong> {new Date(post.deadline).toLocaleDateString()}</p>
          <p><strong>Organizer:</strong> {post.organizerName} ({post.organizerEmail})</p>
          <p><strong>Your Name:</strong> {user.displayName}</p>
          <p><strong>Your Email:</strong> {user.email}</p>
          <textarea id="suggestion" placeholder="Your suggestion..." className="w-full p-2 border mt-2 rounded" />
        </div>

        <button
          onClick={handleRequest}
          className="mt-4 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
        >
          Request
        </button>
      </div>
    </div>
  );
};

export default VolunteerModal;
