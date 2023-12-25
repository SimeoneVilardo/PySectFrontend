import { useState, useEffect } from 'react';
import './App.css'
import './styles/card.css'

interface Challenge {
  id: number;
  name: string;
  // other properties...
}

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        // Fetch data from your API or any other source
        const response = await fetch('/api/challenge/');
        const challengesJson = await response.json();

        // Update state with the fetched data
        setChallenges(challengesJson);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    // Call the fetchItems function when the component mounts
    fetchChallenges();
  }, []);

  return (
    <div className="ag-format-container">
      <div className="ag-courses_box">

        {challenges.map((challenge) => (
          <div className="ag-courses_item">
            <a href="#" className="ag-courses-item_link">
              <div className="ag-courses-item_bg"></div>

              <div className="ag-courses-item_title">
                {challenge.name}
              </div>
            </a>
          </div>
        ))}


      </div>
    </div>
  )

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {challenges.map((challenge) => (
            <li key={challenge.id}>{challenge.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};


export default App
