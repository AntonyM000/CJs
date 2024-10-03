import { createContext, useEffect, useState } from "react";
import { getDoc, getFirestore, onSnapshot, doc, collection, query, getDocs } from "firebase/firestore";
import { app } from "../firebase"; // Ensure this path is correct

const DataContext = createContext();

function DataProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [products, setProducts] = useState([]);
    const [combos, setCombos] = useState([]);
    const db = getFirestore(app);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsQuery = query(collection(db, 'products'));
                const unsubscribeProducts = onSnapshot(productsQuery, async (snapshot) => {
                    const productData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setProducts(productData);
                    console.log('Product data:', productData); // Debugging line
                    

                    const docRef = doc(db, "products", "BIG ON BREAKFAST");
                    const collectionRef = collection(docRef, "BREAKFAST COMBOS");
      // Fetch all documents from the subcollection
                    const querySnapshot =await getDocs(collectionRef);
      // Map through each document and store its data
                    const fetchedCombos = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                     }));
      // Set the fetched combos to the state
                     setCombos(fetchedCombos);
                    console.log('Fetched Combos', fetchedCombos); // Debugging line




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
        <DataContext.Provider value={{ loading, error, products, combos }}>
            {children}
        </DataContext.Provider>
    );
}

export { DataContext, DataProvider };
