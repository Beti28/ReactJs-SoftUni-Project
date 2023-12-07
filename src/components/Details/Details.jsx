import React, { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './details.css';
import Comments from './Comments'; // Import the Comments component

// Details component displays information about a specific pet
const Details = ({ user }) => {
  // Extract the pet ID from the URL params
  const { id } = useParams();

  // State to store the details of the pet
  const [petDetails, setPetDetails] = useState(null);

  // State to determine if the current user is the author of the pet
  const [isAuthor, setIsAuthor] = useState({});

  // React Router hook for navigation
  const navigate = useNavigate();

  // useEffect to fetch pet details when the component mounts or when the user changes
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        // Reference to the Firestore document for the specific pet
        const petDocRef = doc(db, 'pets', id);
        const petSnapshot = await getDoc(petDocRef);
  
        // Check if the pet document exists
        if (petSnapshot.exists()) {
          // Extract pet data from the snapshot
          const petData = { id: petSnapshot.id, ...petSnapshot.data() };
  
          // Update the state with pet details
          setPetDetails(petData);
  
          // Check if the current user is the author of the pet
          setIsAuthor({ email: petData.authorEmail }); // Assuming 'authorEmail' is the field in your pet document
        } else {
          console.log('Pet not found');
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };
  
    // Invoke the fetchPetDetails function
    fetchPetDetails();
  }, [id]);

  // Handle edit button click - navigate to the edit page
  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  // Handle delete button click - delete the pet document from Firestore
  const handleDelete = async () => {
    try {
      const petDocRef = doc(db, 'pets', id);
      await deleteDoc(petDocRef);
      // Navigate to the home page after successful deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  // If pet details are not available, show a loading message
  if (!petDetails) {
    return <p>Loading...</p>;
  }

  // Render the pet details and action buttons
  return (
    <div id="detailsPage">
      <div className="details">
        <div className="animalPic">
          <img src={petDetails.image} alt={petDetails.name} />
        </div>
        <div className="animalInfo">
          <h2>Name: {petDetails.name}</h2>
          <h2>Breed: {petDetails.breed}</h2>
          <h2>Gender: {petDetails.gender}</h2>
          <h2>Age: {petDetails.age}</h2>
          <h2>History: {petDetails.history}</h2>
          <div className="actionBtn">
          {user && petDetails.email === user.email &&(
            <Link to={`/edit/${petDetails.id}`} className="btn" onClick={handleEdit}>
              Edit
            </Link>
          )}
          {user && petDetails.email === user.email && (
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
        </div>
        {user &&(
        <Comments petId={id} />
        )}
      </div>
    </div>
  );
};

export default Details;
