import React, { useEffect, useState, useContext } from "react";
import { FaThLarge, FaList } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../../components/Spinner";
import { CiSearch } from "react-icons/ci";

const AllPosts = () => {
  const { loading } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("customized"); 

  // Fetch data and sort on client side for demo
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `https://b11a11-server-side-arifur999.vercel.app/posts?search=${searchTerm}`
        );
        let data = await res.json();

        // Sorting logic
        if (sortOption === "title-asc") {
          data.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortOption === "title-desc") {
          data.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortOption === "volunteers-asc") {
          data.sort((a, b) => a.volunteersNeeded - b.volunteersNeeded);
        } else if (sortOption === "volunteers-desc") {
          data.sort((a, b) => b.volunteersNeeded - a.volunteersNeeded);
        }
        // else "customized" keep data as is

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [searchTerm, sortOption]);

  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Header: Title + Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="md:text-center">
        <h1 className="text-2xl font-bold text-pink-600">All Volunteers</h1>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-64">
      <input
        type="text"
        placeholder="Search by title..."
        className="w-full pl-10 pr-4 py-2 border rounded-full border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <CiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
    </div>

        {/* Sort & View Controls */}
        <div className="flex items-center gap-4  lg:justify-end ">
          {/* Sort dropdown */}
          <div className="flex md:items-start lg:items-center gap-2">
           
            <select
              id="sort"
              className="border border-gray-300 text-gray-400 rounded lg:px-3 md:px-3 py-1 w-full focus:outline-none bg-base-200"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="customized">Sort By:</option>
              <option value="title-asc">Title: A to Z</option>
              <option value="title-desc">Title: Z to A</option>
              <option value="volunteers-asc">Volunteers: Low to High</option>
              <option value="volunteers-desc">Volunteers: High to Low</option>
            </select>
          </div>

          {/* View mode toggles */}
          <div className="flex lg:items-center gap-2  text-xl text-gray-600">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded hover:bg-blue-100 ${
                viewMode === "grid" ? "text-blue-600 bg-blue-100" : ""
              }`}
              aria-label="Grid view"
              title="Grid view"
            >
              <FaThLarge />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded hover:bg-blue-100 ${
                viewMode === "list" ? "text-blue-600 bg-blue-100" : ""
              }`}
              aria-label="List view"
              title="List view"
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Posts Display */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="border border-gray-300 rounded shadow p-4 flex flex-col justify-between"
            >
              <img
                src={post.thumbnail}
                alt={post.title}
                className="h-40 w-full object-cover rounded mb-3"
              />
              <h3 className="font-semibold text-lg">{post.title}</h3>
              <p>{post.description.slice(0, 60)}...</p>
              <p>
                <strong>Volunteers:</strong> {post.volunteersNeeded}
              </p>
              <p>
                <strong>Deadline:</strong>{" "}
                {new Date(post.deadline).toLocaleDateString()}
              </p>
              <Link
                to={`/posts/${post._id}`}
                className="mt-2 bg-pink-600  py-1 rounded text-center text-white hover:bg-pink-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="">
                <th className="p-2 border border-gray-300">Image</th>
                <th className="p-2 border border-gray-300">Title</th>
                <th className="p-2 border border-gray-300">Description</th>
                <th className="p-2 border border-gray-300">Volunteers</th>
                <th className="p-2 border border-gray-300">Deadline</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id} className="border-b ">
                  <td className="p-2 border border-gray-300">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="h-10 w-16 object-cover"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">{post.title}</td>
                  <td className="p-2 border border-gray-300">{post.description.slice(0, 40)}...</td>
                  <td className="p-2 border border-gray-300">{post.volunteersNeeded}</td>
                  <td className="p-2 border border-gray-300">
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
