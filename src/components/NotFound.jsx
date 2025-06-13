const NotFound = ({ message = "Page not found" }) => {
  return (
    <div className="text-center py-20">
      <p className="text-gray-500 mt-4">{message}</p>
    </div>
  );
};

export default NotFound;