import React from "react";
import { useEffect, useState } from "react";
import { FaThLarge, FaList, FaSearch } from "react-icons/fa";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState("card");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header with controls */}

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 ">
            All Volunteers
          </h1>
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
            className="w-full pl-10 pr-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400   "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-3 text-xl">
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded hover:bg-blue-100  ${
              viewMode === "card"
                ? "text-blue-600 bg-blue-100 "
                : "text-gray-400"
            }`}
          >
            <FaThLarge />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded hover:bg-blue-100 d ${
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
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="border rounded shadow p-4  "
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="text-lg font-semibold  ">
                {post.title}
              </h3>
              <p className="text-sm ">
                {post.description.slice(0, 60)}...
              </p>
              <p className="text-sm mt-1">
                <strong>Volunteers:</strong> {post.volunteersNeeded}
              </p>
              <p className="text-sm">
                <strong>Deadline:</strong>{" "}
                {new Date(post.deadline).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === "table" && (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm border">
            <thead className="bg-gray-100 dark:bg-gray-700 text-left">
              <tr>
                <th className="p-2">Image</th>
                <th className="p-2">Title</th>
                <th className="p-2">Description</th>
                <th className="p-2">Volunteers</th>
                <th className="p-2">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post._id}
                  className="border-b hover:bg-gray-50 dark:hover:bg-gray-800"
                >
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
