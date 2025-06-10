import React, { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthContext';

const AddPost = () => {
  const { user } = useContext(AuthContext);
  const [startDate, setStartDate] = useState(new Date());
  const [formData, setFormData] = useState({
    thumbnail: '',
    title: '',
    description: '',
    category: '',
    location: '',
    volunteersNeeded: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      ...formData,
      deadline: startDate,
      organizerName: user?.displayName || 'Anonymous',
      organizerEmail: user?.email || 'Not provided',
    };

    try {
      const res = await fetch('http://localhost:3000/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const data = await res.json();
      if (data.insertedId || data.acknowledged) {
        Swal.fire('Success!', 'Your volunteer post has been added.', 'success');
        setFormData({
          thumbnail: '',
          title: '',
          description: '',
          category: '',
          location: '',
          volunteersNeeded: '',
        });
        setStartDate(new Date());
      } else {
        throw new Error('Failed to insert data');
      }
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="max-w-4xl my-8 mx-auto px-4 py-10  rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-pink-600 mb-2">
        Add Volunteer Need Post
      </h2>
      <p className="text-center  mb-8">
        Share your need and help gather amazing volunteers.
      </p>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
      >
        <div>
          <label className="block bg-base-200 font-bold mb-2">
            Thumbnail URL
          </label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition "
          />
        </div>

        <div>
          <label className="block bg-base-200 font-bold mb-2">
            Post Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition "
          />
        </div>

        <div className="md:col-span-2">
          <label className="block bg-base-200 font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition "
          ></textarea>
        </div>

        <div>
          <label className="block bg-base-200 font-bold mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition "
          >
            <option value="">Select a category</option>
            <option value="healthcare">Healthcare</option>
            <option value="education">Education</option>
            <option value="social service">Social Service</option>
            <option value="animal welfare">Animal Welfare</option>
          </select>
        </div>

        <div>
          <label className="block bg-base-200 font-bold mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition "
          />
        </div>

        <div>
          <label className="block bg-base-200 font-bold mb-2">
            No. of Volunteers Needed
          </label>
          <input
            type="number"
            name="volunteersNeeded"
            value={formData.volunteersNeeded}
            onChange={handleChange}
            required
            min="1"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition "
          />
        </div>

        <div>
          <label className="block bg-base-200 font-bold mb-2">
            Deadline
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 transition "
            required
          />
        </div>

        <div>
          <label className="block bg-base-200 font-bold mb-2">
            Organizer Name
          </label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="w-full px-3 py-2 border rounded "
          />
        </div>

        <div>
          <label className="block bg-base-200 font-bold mb-2">
            Organizer Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full px-3 py-2 border rounded "
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded w-full"
          >
            Add Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
