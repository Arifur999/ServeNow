import Swal from "sweetalert2";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner";

const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://b11a11-server-side-arifur999.vercel.app/volunteer-requests?email=${user.email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMyRequests(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch requests:", err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleCancel = (id, postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel your volunteer request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://b11a11-server-side-arifur999.vercel.app/volunteer-requests/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message) {
              Swal.fire(
                "Cancelled!",
                "Your request has been cancelled.",
                "success"
              );
              setMyRequests((prev) => prev.filter((req) => req._id !== id));
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to cancel the request.", "error");
          });
      }
    });
  };

  if (loading) {
    return (
      <Spinner></Spinner>
    );
  }

  if (myRequests.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-8">
        <p>You haven’t made any volunteer requests yet.</p>
        <p>Go to a post and click “Be a Volunteer” to submit a request.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Post Title</th>
            <th>Organizer Name</th>
            <th>Deadline</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myRequests.map((req) => (
            <tr key={req._id}>
              <td>{req.title}</td>
              <td>{req.organizerName}</td>
              <td>{new Date(req.deadline).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleCancel(req._id, req.postId)}
                  className="btn btn-sm btn-warning"
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyRequests;
