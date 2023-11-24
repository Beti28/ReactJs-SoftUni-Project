import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './details.css'

const Details = ({ user }) => {
  const { id } = useParams();
  const [petDetails, setPetDetails] = useState(null);
 
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPetDetails = async () => {
      try {
        const petDocRef = doc(db, 'pets', id);
        const petSnapshot = await getDoc(petDocRef);

        if (petSnapshot.exists()) {
          setPetDetails({ id: petSnapshot.id, ...petSnapshot.data() });
        } else {
          console.log('Pet not found');
        }
      } catch (error) {
        console.error('Error fetching pet details:', error);
      }
    };

    fetchPetDetails();
  }, [id]);

  const handleEdit = () => {
 
    console.log('Edit button clicked');
  };

  const handleDelete = async () => {
    try {
      const petDocRef = doc(db, 'pets', id);
      await deleteDoc(petDocRef);
      navigate("/")
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  if (!petDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div id="detailsPage">
      <div className="details">
        <div className="animalPic">
          <img src={petDetails.image} alt={petDetails.name} />
        </div>
        <div className="animalInfo">
          <h2>Name: {petDetails.name}</h2>
          <h2>{petDetails.breed}</h2>
          <h2>Gender: {petDetails.gender}</h2>
          <h2>Age: {petDetails.age}</h2>
          <h2>History: {petDetails.history}</h2>
        </div>
       
        <div className="actionBtn">
          <Link to={`/edit/${petDetails.id}`} className="btn" onClick={handleEdit}>
            Edit
          </Link>
          <button className="btn" onClick={handleDelete} >
            Delete
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Details;
