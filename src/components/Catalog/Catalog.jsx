import { useState, useEffect } from 'react';
import { db } from '../../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import './catalog.css';

const Catalog = () => {
    const [pets, setPets] = useState([]);
    const petsCollectionRef = collection(db, 'pets');

    useEffect(() => {
        const getPets = async () => {
            const data = await getDocs(petsCollectionRef);
            setPets(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPets();
    }, []);

    return (
        <div id='catalog'>
        <section className='catalog'>
            <section className="animals-dashboard">
                {pets.length === 0 ? (
                    <div>
                        <p className="no-pets">No pets in dashboard</p>
                    </div>
                ) : (
                    pets.map((p) => (
                        <div key={p.id} className="animals-board"> 
                                <img className="animal-image-cover" src={p.image} alt={p.name} />
                            <h4 className="name">Name: {p.name}</h4>
                            <h4 className="breed">Breed: {p.breed}</h4>
                            <h4 className="breed">Gender: {p.gender}</h4>
                            <div className="action">
                                <a className="btn" href={`/details/${p.id}`}>
                                    Details
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </section>
        </section>
        </div>
    );
};

export default Catalog;