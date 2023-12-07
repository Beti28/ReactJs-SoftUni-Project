import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage, auth } from "../../firebase-config";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid';

import './create.css';

function Create() {
  const navigate = useNavigate();
  const petsCollectionRef = collection(db, "pets");
  const [newName, setNewName] = useState('');
  const [newBreed, setNewBreed] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [newGender, setNewGender] = useState('');
  const [newImage, setNewImage] = useState(null);
  const [newHistory, setNewHistory] = useState('');
  const [imageList, setImageList] = useState([]);

  const imageListRef = ref(storage, "images/");

  const validateForm = () => {

    if (!newName || !newBreed || newAge <= 0 || !newGender || !newImage || !newHistory) {
      alert("Please fill in all the fields");
      return false;
    }

    // Additional validation for age (numeric value)
    if (isNaN(newAge) || newAge < 0) {
      alert("Please enter a valid age");
      return false;
    }

    return true;
  };

  const uploadImg = () => {
    if (newImage == null) return;
    const imageRef = ref(storage, `images/${newImage.name + v4()}`);
    uploadBytes(imageRef, newImage).then(async () => {
      const imageUrl = await getDownloadURL(imageRef);
      createPost(imageUrl);
    }).catch((error) => {
      console.error("Error uploading image: ", error);
    });
  };

  const createPost = async (imageUrl) => {
    await addDoc(petsCollectionRef, {
      name: newName,
      breed: newBreed,
      age: newAge,
      gender: newGender,
      image: imageUrl,
      history: newHistory,
      email: auth.currentUser.email,
      personId: auth.currentUser.uid,
    });
    navigate('/catalog');
  };

  const handleCombinedButtonClick = () => {
    if (validateForm()) {
      uploadImg();
    }
  };

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div id="creating">
      <div className="post-form">
        <h1>Create Post</h1>

        <label htmlFor="petName">What is the name of the pet?</label>
        <input
          id="petName"
          className="form-control"
          placeholder="Name..."
          onChange={(event) => { setNewName(event.target.value) }}
        />

        <label htmlFor="petBreed">What breed is?</label>
        <input
          id="petBreed"
          className="form-control"
          placeholder="Breed..."
          onChange={(event) => { setNewBreed(event.target.value) }}
        />

        <label htmlFor="petAge">How old is he?</label>
        <input
          id="petAge"
          className="form-control"
          type="number"
          placeholder="Age..."
          onChange={(event) => { setNewAge(event.target.value) }}
        />

        <label>What gender is?</label>
        <div className="gender-options">
          <label>
            <input
              type="radio"
              name="gender"
              value="Male"
              checked={newGender === "Male"}
              onChange={(event) => setNewGender(event.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={newGender === "Female"}
              onChange={(event) => setNewGender(event.target.value)}
            />
            Female
          </label>
        </div>

        <label htmlFor="petImage">Put his picture here.</label>
        <input
          id="petImage"
          className="form-control"
          type="file"
          onChange={(event) => { setNewImage(event.target.files[0]) }}
        />

        <label htmlFor="petHistory">What is his story?</label>
        <input
          id="petHistory"
          className="form-control"
          placeholder="History..."
          onChange={(event) => { setNewHistory(event.target.value) }}
        />

        <button className="btn-create-post" onClick={handleCombinedButtonClick}>
          Create Post
        </button>
      </div>
    </div>
  );
}


export default Create;