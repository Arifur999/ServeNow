import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Link } from "react-router"; // fixed here
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner";
import MyRequests from "./MyRequests";

const MyPosts = () => {
  const { user, loading } = useContext(AuthContext);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    if (!user?.email) return;

    console.log("Fetching posts for:", user.email);

    fetch(`http://localhost:3000/volunteer-posts?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("My Posts:", data);
        setMyPosts(data);
      })
      .catch((error) => {
        console.error("Failed to fetch posts:", error);
        setMyPosts([]);
      });
  }, [user?.email]);
  if (loading) {
    return <Spinner></Spinner>;
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/volunteer-posts/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete");
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your post has been deleted.", "success");
              setMyPosts((prev) => prev.filter((post) => post._id !== id));
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire("Error", "Something went wrong!", "error");
          });
      }
    });
  };

  return (
    <div className="container  p-4 w-11/12 mx-auto  min-h-[50vh]">
      <h1 className="text-3xl font-semibold mb-6 text-center text-pink-500">
        Manage My Posts
      </h1>

      <Tabs>
        <TabList>
          <Tab>My Need Posts</Tab>
          <Tab>My Request Posts</Tab>
        </TabList>

        <TabPanel>
          {myPosts.length === 0 ? (
            <p className="text-center text-gray-500 pt-10">
              No volunteer need posts found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myPosts.map((post) => (
                    <tr key={post._id}>
                      <td>{post.title}</td>
                      <td>{post.category}</td>
                      <td>
                        {new Date(post.deadline).toLocaleDateString()}
                      </td>{" "}
                      {/* formatted */}
                      <td>
                        <Link
                          to={`/update-post/${post._id}`}
                          className="btn btn-sm btn-primary mr-2"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="btn btn-sm btn-error"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabPanel>

        <TabPanel>
          <MyRequests></MyRequests>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default MyPosts;
