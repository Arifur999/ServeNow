import { Link } from "react-router";

const ShowAllPost = ({ post }) => {
  const { _id, title, thumbnail, category, deadline } = post;

  return (
    <div className="  shadow-md rounded-lg overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">
          {title}
        </h3>
        <p className="text-sm  mb-1">
          <span className="font-semibold">Category:</span> {category}
        </p>
        <p className="text-sm  mb-3">
          <span className="font-semibold">Deadline:</span>{" "}
          {new Date(deadline).toLocaleDateString()}
        </p>
        <Link
          to={`/posts/${_id}`}
          className="inline-block mt-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ShowAllPost;
