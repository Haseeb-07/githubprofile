import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './UserRepositories.css'; 

function UserRepositories() {
  const { username } = useParams();
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?page=${currentPage}&per_page=5`);
        
        if (response.status === 200) {
          const data = await response.json();
          setRepositories(data);
          
          const linkHeader = response.headers.get('Link');
          if (linkHeader) {
            
            const hasNextPage = linkHeader.includes('rel="next"');
            if (hasNextPage) {
              setTotalPages(currentPage + 1);
            } else {
              setTotalPages(currentPage);
            }
          } else {
           
            setTotalPages(1);
          }
        } else {
          throw new Error('User not found');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="container">Loading Repositories for {username}...</div>;
  }

  if (error) {
    return <div className="container error">Error: {error}</div>;
  }

  if (!Array.isArray(repositories) || repositories.length === 0) {
    return (
      <div className="container">
        No repositories found for this user.
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Repositories for: {username}</h2>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            <strong>{repo.name}</strong> - {repo.description} ({repo.stargazers_count} stars)
          </li>
        ))}
      </ul>
      <div>
  <button onClick={handlePrevPage} disabled={currentPage === 1}>
    &lt; 
  </button>
  <span> Page {currentPage} of {totalPages} </span>
  <button onClick={handleNextPage} disabled={currentPage === totalPages}>
     &gt;
  </button>
</div>

    </div>
  );
}

export default UserRepositories;
