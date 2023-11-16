import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase-config";
import {useNavigate} from 'react-router-dom';

function Create (){
    const navigate = useNavigate ();
    const petsCollectionRef = collection(db, "pets");
    const [newName, setNewName] = useState('');
    const [newBreed, setNewBreed] = useState('');
    const [newAge, setNewAge] = useState(0);
    const [newGender, setNewGender] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newHistory, setNewHistory] = useState('');
    const createPost = async () => {
    await addDoc(petsCollectionRef, { name: newName, breed: newBreed, age: newAge, gender: newGender, image: newImage, history: newHistory});
    navigate('/catalog');
};


    return (
        <div>
            <input placeholder='Name...' onChange={(event) => { setNewName(event.target.value) }} />
            <input placeholder='Breed...' onChange={(event) => { setNewBreed(event.target.value) }} />
            <input type='number' placeholder='Age...' onChange={(event) => { setNewAge(event.target.value) }} />
            <input placeholder='Gender...' onChange={(event) => { setNewGender(event.target.value) }} />
            <input placeholder='Image...' onChange={(event) => { setNewImage(event.target.value) }} />
            <input placeholder='History...' onChange={(event) => { setNewHistory(event.target.value) }} />
            <button onClick={createPost}>Create Post</button>

        </div>
    )
}
export default Create;