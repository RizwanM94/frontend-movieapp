import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch existing movie data
  useEffect(() => {
    console.log(`Editing movie with ID: ${id}`); 
  
    const fetchMovie = async () => {
      const token = localStorage.getItem('token'); 
      
      if (!token) {
        setErrorMessage('Unauthorized: No token provided');
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:5000/api/movies/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include token 
          },
        });
  
        const movie = response.data;
  
        if (movie) {
          setTitle(movie.title);
          setYear(movie.year);
        } else {
          setErrorMessage('Movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
        setErrorMessage('Error fetching movie data');
      }
    };
  
    fetchMovie();
  }, [id]);
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('year', year);
    if (image) {
      formData.append('image', image);
    }

    const token = localStorage.getItem('token'); 

  try {
    await axios.put(`http://localhost:5000/api/movies/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}` 
      }
    });
    alert('Movie updated successfully');
    navigate('/home'); // Navigate after successful update
  } catch (error) {
    console.error('Error updating movie:', error);
    setErrorMessage('Error updating movie. Please try again.');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#093545]">
      <div className="bg-[#093545] p-8 rounded-lg w-full max-w-4xl">
        <h1 className="text-white text-4xl font-bold mb-8">Edit Movie</h1>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image Dropzone */}
          <div className="w-full md:w-1/2 border-2 border-dashed border-gray-400 h-64 flex flex-col items-center justify-center text-white">
            <span>Drop other image here</span>
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
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-400"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default EditMovie;
