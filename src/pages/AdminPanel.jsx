import { doc, setDoc, getFirestore, collection } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoImagesOutline } from 'react-icons/io5';
import Header from '../components/Header';
import { app } from '../firebase';
import DisplayMenu from '../components/DisplayMenu';
import  { SidebarWithContentSeparator } from '../components/sidebar';
import toast, { Toaster } from 'react-hot-toast';
// import { useAuth } from './useAuth'; 

const AdminPanel = () => {
  const [itemValue, setItemValue] = useState('');
  const [itemContent, setItemContent] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const db = getFirestore(app);
  const storage = getStorage(app);
  const navigate = useNavigate();
  // const { currentUser } = useAuth(); 
  const [category, setCategory] = useState(''); // Initialize with empty value
  const [subCategory, setSubCategory] = useState(''); // Sub-category state
  const [customSubCategory, setCustomSubCategory] = useState(''); // To handle typed sub-category

  // Handler for changing the category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory(''); // Reset sub-category when category changes
  };

  // Predefined options based on category
  const subCategoryOptions = {
    'BIG ON BREAKFAST': ['BREAKFAST COMBOS', 'RANGER BREAKFAST','WONDERFUL WAFFLES','FLUFFY PANCAKES','PASTRIES','DESIGNER OMELETTES','FRUITFUL MORNINGS','AMAZING MUFFINS','EXTRAS'],
    'GENEROUS BIG MEALS': ['BIG MEAL COMBO', 'STARTERS AND APPETIZERS','BITS & BITES','SOUPS','SALADS','SANDWICHES','BURGERS','CHICKEN','FISH','CHIPS','BEEF','CURRIES','PASTA','MEX-FIX','PIZZA','KIDDIE MEALS','EXTRAS'],
    'PERFECTED DRINKS': ['DAWA TEAS', 'KIDDIE DRINKS','CREAMY MILKSHAKES','REAL FRUIT-SMOOTHIES','FRUIT BOOSTERS','SPECIALTY JUICES','REFRESHING ICED TEAS','HANDCRAFTED LEMONADES','COLADAS','NOJITOS','CHOCOLATE','TEA','ICED MOCHA','MOCHA','ICED LATTE','LATTE','CAPPUCCINO','COFFEE'],
    'DECADENT DESSERTS': ['AMAZING MUFFINS', 'PASTRIES','FRUITFUL DELIGHT','SUNDAES','A LA MODE','PREMIUM ICE CREAM','CAKE SLICES'],
  };

  // Render sub-category datalist based on the selected category
  const renderSubCategoryDatalist = () => {
    const options = subCategoryOptions[category] || [];
    return (
      <datalist id="sub-categories">
        {options.map((option, index) => (
          <option key={index} value={option} />
        ))}
      </datalist>
    );
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    }
  };

  const uploadFile = async (file) => {
    const storageRef = ref(storage, 'uploads/' + file.name);
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Upload failed', error);
    }
  };
  
  // console.log (category)
  // console.log (subCategory)
  // console.log (customSubCategory)
  const updateFunction = async () => {
    console.log('uploading');

    if (!itemContent || !itemValue) {
      alert('Please enter a product and its Value');
      return;
    }

    let imageUrl = '';
    if (file) {
      imageUrl = await uploadFile(file);
    }
    
    try {
      const docRef =doc(db,"products", category)
      const collectionRef = collection(docRef, subCategory);
      await setDoc(doc(collectionRef), {
        Product: itemContent,
        Description:itemDescription,
        value: itemValue,
        imageUrl,
        // userId: currentUser.uid,
        createdAt: new Date(),
      });
      setItemContent('');
      setItemDescription('');
      setItemValue('');
      setFile(null);
      setImageSrc('');
      toast.success('Product added successfully');
    } catch (error) {
      toast.error('Error adding product: ', error);
      console.error('Error adding product: ', error);
    }
  };
  

  return (
    <div className="flex">
      {/* <Header /> */}
      <SidebarWithContentSeparator/> 
      <div className="flex flex-col ">
      <Toaster position="top-right" reverseOrder={true}/>
        <p className="text-xl font-xl">Add new items</p>
        <div className="flex flex-col bg-slate-200 rounded-xl max-w-[500px] max-h-[500px]">
        <label htmlFor="collection">Category</label>
      <select
        name="collection"
        id="collection"
        value={category}
        onChange={handleCategoryChange}
      >
        <option value="">-- Select Category --</option>
        <option value="BIG ON BREAKFAST">BIG ON BREAKFAST</option>
        <option value="GENEROUS BIG MEALS">GENEROUS BIG MEALS</option>
        <option value="PERFECTED DRINKS">PERFECTED DRINKS</option>
        <option value="DECADENT DESSERTS">DECADENT DESSERTS</option>
      </select>

      {/* Sub-Category Input with Datalist */}
      <label htmlFor="sub-category">Sub-Category</label>
      <input
        list="sub-categories"
        id="sub-category"
        name="sub-category"
        value={subCategory}
        onChange={(e) => {
          setSubCategory(e.target.value);
          setCustomSubCategory(e.target.value);
        }}
        placeholder="Type or select a sub-category"
      />
      {renderSubCategoryDatalist()}

      {/* Show typed new item */}
      {customSubCategory && !subCategoryOptions[category]?.includes(customSubCategory) && (
        <p>You're adding a new sub-category: {customSubCategory}</p>
      )}   

          <div className="flex-1 px-2 pt-2 mx-auto  mt-2">
            
              <label
                htmlFor="imageupload"
                className={imageSrc? "invisible":"m-3 flex items-center  gap-x-4 justify-center bg-white  text-black  px-2 py-2 text-base font-medium rounded hover:bg-blue-800 hover:text-blue-300" }
              >
                <IoImagesOutline />Add image
              </label>
            <input
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
              className="mt-2  px-2 items-center text-center justify-center rounded text-gray-400 font-medium text-lg "
              type="number"
              placeholder="Value"
            />
            <input
              type="text"
              className="mt-2 px-2 items-center text-center justify-center rounded text-gray-400 font-medium text-lg "
              placeholder="Add new product"
              value={itemContent}
              onChange={(e) => setItemContent(e.target.value)}
            />
             <input
              type="text"
              className="mt-2 px-2 items-center text-center justify-center rounded text-gray-400 font-medium text-lg "
              placeholder="Add product description"
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
            />
            {imageSrc && <label
                htmlFor="imageupload"><img src={imageSrc} className="max-w-60 mx-auto mt-4 rounded" alt="" /></label>}
            <input
              type="file"
              className="invisible"
              id="imageupload"
              onChange={handleFileChange}
              
            />
            
          </div>
        </div>
        <button
          onClick={updateFunction}
          className="bg-blue-400 mt-5 hover:bg-blue-600 text-black font-bold py-2 px-8 rounded-full mr-8 float-right"
        >
          Add product
        </button>
      </div>
      <DisplayMenu/>
    </div>
  );
};

export default AdminPanel;
