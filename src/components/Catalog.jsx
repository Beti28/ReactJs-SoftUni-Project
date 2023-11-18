import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore'
import './catalog.css'

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
            <section id="dashboard">
               
                    {pets.length === 0 ? (
                        <div>
                            <p className="no-pets">No pets in dashboard</p>
                        </div>
                    ) : (
                        pets.map(p => (
                            <div key={p.id} className="animals-board">
                                <article className="service-img">
                                    <img className="animal-image-cover" src={p.image} alt={p.name} />
                                </article>
                                <h4 className="name">Name: {p.name}</h4>
                                <h4 className="breed">Breed: {p.breed}</h4>
                                <div className="action">
                                    <a className="btn" href={`/details/${p.id}`}>Details</a>
                                </div>
                            </div>
                        ))
                    )}
              
            </section>
        </section>
    );
}

export default Catalog;
