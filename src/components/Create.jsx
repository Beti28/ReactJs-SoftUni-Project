import { collection, addDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db, storage } from "../firebase-config";
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid';

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

    const imageListRef = ref(storage, "images/")
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
            history: newHistory
        });
        navigate('/catalog');
    };

    const handleCombinedButtonClick = () => {
        uploadImg();
    };
    useEffect(() =>{
        listAll(imageListRef).then((response) =>{
            response.items.forEach((item) =>{
                getDownloadURL(item).then((url) =>{
                    setImageList((prev) =>[...prev,url]);
                })
            })
        })
    }, [])

    return (
        <div>
            <input placeholder='Name...' onChange={(event) => { setNewName(event.target.value) }} />
            <input placeholder='Breed...' onChange={(event) => { setNewBreed(event.target.value) }} />
            <input type='number' placeholder='Age...' onChange={(event) => { setNewAge(event.target.value) }} />
            <input placeholder='Gender...' onChange={(event) => { setNewGender(event.target.value) }} />
            <input type='file' onChange={(event) => { setNewImage(event.target.files[0]) }} />
            <input placeholder='History...' onChange={(event) => { setNewHistory(event.target.value) }} />
            <button onClick={handleCombinedButtonClick}>Create Post</button>
            </div>
           //{//imageList.map((url, index) => (<img key={index} src={url} alt={`Image ${index}`} />))}//
        
    )
}
export default Create;
