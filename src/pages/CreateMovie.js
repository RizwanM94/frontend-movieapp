import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateMovie = ({ mode = 'Create', movieId = null }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // To handle errors
  const [loading, setLoading] = useState(false); // To show loading state

  // Image upload handle
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Form submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title || !year) {
      setErrorMessage("Title and Year are required.");
      return;
    }

    // Reset error message
    setErrorMessage('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    if (image) {
      formData.append('image', image);
    }

    try {
      
      const token = localStorage.getItem('token'); 
      const headers = {
        'Content-Type': 'multipart/form-data',
        ...(token && { Authorization: `Bearer ${token}` }), 
      };

      if (mode === 'Create') {
        const response = await axios.post('http://localhost:5000/api/movies/create', formData, {
          headers,
        });
        alert('Movie created successfully');
        console.log('Created movie response:', response.data); 
      } navigate('/home'); 
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'An error occurred while saving the movie.');
      } else {
        setErrorMessage('Network error. Please try again.');
      }
      console.error('Error:', error); 
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#093545]">
      <div className="bg-[#093545] p-8 rounded-lg  w-full max-w-4xl">
        <h1 className="text-white text-4xl font-bold mb-8">
          {mode === 'Create' ? 'Create a new movie' : 'Edit movie'}
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Dropzone */}
          <div className="w-full md:w-1/2 border-2 border-dashed border-gray-400 h-64 flex flex-col items-center justify-center text-white">
            <span>Drop an image here</span>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-4"
            />
          </div>
          {/* Form Fields */}
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#224957] text-white p-3 rounded mb-4 outline-none"
              />
              <input
                type="number"
                placeholder="Publishing year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="w-80 bg-[#224957] text-white p-3 rounded mb-6 outline-none"
              />
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => navigate('/home')}
                  className="bg-[#093545] border-solid border-2 text-white px-4 py-2 rounded hover:bg-[#093545]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  //onClick={() => navigate('/home')}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-400 "
                >
                  {mode === 'Create' ? 'Submit' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMovie;
