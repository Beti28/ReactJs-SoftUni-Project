import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore'


const Catalog = () => {
    const [pets, setPets] = useState([])
   const petsCollectionRef = collection(db, "pets");
    useEffect(() =>{

        const getPets = async () =>{
            const data = await getDocs(petsCollectionRef);
            setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getPets()
    }, [])
    return (
        <section>
            {pets.map((pets) =>{
                return <div key={pets.id}>
                    <h1>Name: {pets.name}</h1>
                    <h1>Breed: {pets.breed}</h1>
                    <h1>Age: {pets.age}</h1>
                    <h1>Gender: {pets.gender}</h1>
                    <img src={pets.image} />
                </div>
            })}

    </section>
    );
}

export default Catalog;