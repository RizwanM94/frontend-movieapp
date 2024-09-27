import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import Footer from '../components/Footer';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const token = localStorage.getItem('token'); 

      if (!token) {
        setError('Unauthorized: No token found.');
        navigate('/SignIn'); 
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/api/movies', {
          headers: {
            'Authorization': `Bearer ${token}`,  
            'Content-Type': 'application/json',
          },
        });
        setMovies(response.data);  
      } catch (error) {
        console.error('Error fetching movies:', error);
        if (error.response && error.response.status === 401) {
          setError('Unauthorized: Invalid or expired token');
          navigate('/SignIn');  
        } else {
          setError('An error occurred while fetching movies.');
        }
      }
    };

    fetchMovies();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token on logout
    navigate('/SignIn');  
  };

  return (
    <>
      <div className="min-h-screen bg-[#093545] py-10">
        <div className="container mx-auto px-4">
          {/* Header section with Create Movie and Logout Buttons */}
          <div className="flex justify-between items-center mb-6">
            
            {/* Render Create Movie Button  */}
            {movies.length > 0 && (
             <Link
             to="/create-movie"
             className="flex items-center justify-center bg-green-500 hover:bg-white-600 p-4 rounded-full"
           >
             <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               className="w-6 h-6 text-white"
             >
               <path
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 strokeWidth="2"
                 d="M12 4v16m8-8H4"
               />
             </svg>
           </Link>
           
            )}
  
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-white bg-transparent hover:bg-transparent px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <span className="text-2xl">Logout</span>
              <img 
                src="/logout-icon.png" 
                alt="Logout Icon" 
                className="w-8 h-8"
              />
            </button>
          </div>
  
          {/* Movie List or Empty State */}
          {movies.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 bg-[#093545] rounded-lg">
              <p className="text-white text-xl mb-6">Your movie list is empty</p>
              <Link to="/create-movie" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
                Add a new movie
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {movies.map((movie) => (
                <div key={movie._id} className="bg-[#032c3c] rounded-lg overflow-hidden shadow-lg">
                   <img src={`http://localhost:5000${movie.imageUrl}`} alt={movie.title} className="w-full h-64 object-cover " />
                  <div className="p-4">
                    <h2 className="text-xl text-white mb-2">{movie.title}</h2>
                    <p className="text-gray-400">{movie.year}</p>
                    <Link to={`/edit-movie/${movie._id}`} className="text-green-400 hover:underline mt-2 inline-block">
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
  
          {/* Pagination (if applicable) */}
          {movies.length > 0 && (
            <div className="flex justify-center mt-6">
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mx-2">Prev</button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg mx-2">Next</button>
            </div>
          )}
        </div>
      </div>
      
    </>
  );
}  

export default Home;
