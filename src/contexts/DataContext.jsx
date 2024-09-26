import { createContext, useEffect, useState } from "react";
import { getDoc, getFirestore, onSnapshot, doc, collection, query } from "firebase/firestore";
import { app } from "../firebase"; // Ensure this path is correct

const DataContext = createContext();

function DataProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsQuery = query(collection(db, 'products'));
                const unsubscribeProducts = onSnapshot(productsQuery, (snapshot) => {
                    const productData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    console.log('Product data:', productData); // Debugging line
                    setProducts(productData);
                });

                return () => {
                    unsubscribeProducts();
                };
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [db]);

    return (
        <DataContext.Provider value={{ loading, error, products }}>
            {children}
        </DataContext.Provider>
    );
}

export { DataContext, DataProvider };
