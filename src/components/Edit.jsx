import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import { storage } from '../firebase-config';
import './edit.css';

const Edit = () => {
    const { id } = useParams();
    const [petDetails, setPetDetails] = useState(null);
    const [updatedDetails, setUpdatedDetails] = useState({
        name: '',
        breed: '',
        gender: '',
        age: '',
        history: '',
    });


    const navigate = useNavigate();

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const petDocRef = doc(db, 'pets', id);
                const petSnapshot = await getDoc(petDocRef);

                if (petSnapshot.exists()) {
                    setPetDetails({ id: petSnapshot.id, ...petSnapshot.data() });
                    setUpdatedDetails({ ...petSnapshot.data() });
                } else {
                    console.log('Pet not found');
                }
            } catch (error) {
                console.error('Error fetching pet details:', error);
            }
        };

        fetchPetDetails();
    }, [id]);


    const handleInputChange = (e, fieldName) => {
        const { value, files } = e.target;
        if (fieldName === 'image' && files && files.length > 0) {
            setUpdatedDetails((prevDetails) => ({
                ...prevDetails,
                [fieldName]: files[0],
            }));
        } else {
            setUpdatedDetails((prevDetails) => ({
                ...prevDetails,
                [fieldName]: value,
            }));
        }
    };

    const handleUpdate = async () => {
        try {
            const petDocRef = doc(db, 'pets', id);
            if (updatedDetails.image instanceof File) {
                const imageRef = ref(storage, `images/${updatedDetails.image.name + v4()}`);
                await uploadBytes(imageRef, updatedDetails.image);
                const imageUrl = await getDownloadURL(imageRef);
                await updateDoc(petDocRef, {
                    ...updatedDetails,
                    image: imageUrl,
                });
            } else {
                await updateDoc(petDocRef, updatedDetails);
            }
            navigate(`/details/${id}`);
        } catch (error) {
            console.error('Error updating pet details:', error);
        }
    };

    if (!petDetails) {
        return <p>Loading...</p>;
    }
    return (
        <div className="edit-post">
            <div className="edit-post-form">
                <h1>Edit Post</h1>
                <label htmlFor="petName">Edit name:</label>
                <input
                    id="petName"
                    className="form-control"
                    placeholder="Name..."
                    value={updatedDetails.name}
                    onChange={(event) => handleInputChange(event, 'name')}
                />

                <label htmlFor="petBreed">Edit breed:</label>
                <input
                    id="petBreed"
                    className="form-control"
                    placeholder="Breed..."
                    value={updatedDetails.breed}
                    onChange={(event) => handleInputChange(event, 'breed')}
                />

                <label htmlFor="petAge">Edit age:</label>
                <input
                    id="petAge"
                    className="form-control"
                    type="number"
                    placeholder="Age..."
                    value={updatedDetails.age}
                    onChange={(event) => handleInputChange(event, 'age')}
                />

                <label>Edit gender:</label>
                <div className="gender-options">
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={updatedDetails.gender === 'Male'}
                            onChange={(event) => handleInputChange(event, 'gender')}
                        />
                        Male
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={updatedDetails.gender === 'Female'}
                            onChange={(event) => handleInputChange(event, 'gender')}
                        />
                        Female
                    </label>
                </div>
                <label htmlFor="petImage">Edit image:</label>
                <input
                    id="petImage"
                    className="form-control"
                    type="file"
                    onChange={(event) => handleInputChange(event, 'image')}
                />
                <label htmlFor="petHistory">Edit history:</label>
                <textarea
                    id="petHistory"
                    className="form-control"
                    placeholder="History..."
                    value={updatedDetails.history}
                    onChange={(event) => handleInputChange(event, 'history')}
                />
                <button className="btn-create-post" onClick={handleUpdate}>
                    Update Pet
                </button>
            </div>
        </div>
    );
};

export default Edit;
