import React, { use, useEffect, useState } from "react";
import { FaThLarge, FaList, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

const AllPosts = () => {
    const {_id}=use(AuthContext)
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/posts?search=${searchTerm}`
        );
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, [searchTerm]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-pink-600">All Volunteers</h1>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs">
          <FaSearch
            className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by title..."
            className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-3 text-xl">
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded hover:bg-blue-100 ${
              viewMode === "card"
                ? "text-blue-600 bg-blue-100"
                : "text-gray-400"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded hover:bg-blue-100 ${
              viewMode === "table"
                ? "text-blue-600 bg-blue-100"
                : "text-gray-400"
            }`}
          >
            <FaList />
          </button>
        </div>
      </div>

      {/* Card View */}
      {viewMode === "card" && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border border-gray-300 rounded shadow p-4 flex flex-col justify-between"
            >
              <div>
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-sm">{post.description.slice(0, 60)}...</p>
                <p className="text-sm mt-1">
                  <strong>Volunteers:</strong> {post.volunteersNeeded}
                </p>
                <p className="text-sm">
                  <strong>Deadline:</strong>{" "}
                  {new Date(post.deadline).toLocaleDateString()}
                </p>
              </div>

              {/* Details Button */}
              <Link
                to={`/posts/${post._id}`}
                className="inline-block mt-2 bg-pink-600 text-white px-4 py-2 rounded text-center hover:bg-pink-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm border">
            <thead className=" text-left">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Volunteers</th>
                <th className="p-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b ">
                  <td className="p-2">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-10 w-16 object-cover"
                    />
                  </td>
                  <td className="p-2">{post.title}</td>
                  <td className="p-2">{post.description.slice(0, 40)}...</td>
                  <td className="p-2">{post.volunteersNeeded}</td>
                  <td className="p-2">
                    {new Date(post.deadline).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllPosts;
