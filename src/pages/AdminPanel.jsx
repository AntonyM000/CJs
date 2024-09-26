import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoImagesOutline } from 'react-icons/io5';
import Header from '../components/Header';
import { app } from '../firebase';
import DisplayMenu from '../components/DisplayMenu';
// import { useAuth } from './useAuth'; 

const AdminPanel = () => {
  const [itemValue, setItemValue] = useState('');
  const [itemContent, setItemContent] = useState('');
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState('');
  const db = getFirestore(app);
  const storage = getStorage(app);
  const navigate = useNavigate();
  // const { currentUser } = useAuth(); 

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
      await setDoc(doc(db, 'products', new Date().getTime().toString()), {
        Product: itemContent,
        value: itemValue,
        imageUrl,
        // userId: currentUser.uid,
        createdAt: new Date(),
      });
      setItemContent('');
      setItemValue('');
      setFile(null);
      setImageSrc('');
      console.log('Product added successfully');
    } catch (error) {
      console.error('Error adding product: ', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <p className="text-xl font-xl">Add new items</p>
        <div className="flex">
          <div className="flex-1 px-2 pt-2 mt-2">
            <input
              value={itemValue}
              onChange={(e) => setItemValue(e.target.value)}
              type="number"
              placeholder="Value"
            />
            <input
              type="text"
              className="bg-transparent text-gray-400 font-medium text-lg w-full"
              placeholder="Add new item?"
              value={itemContent}
              onChange={(e) => setItemContent(e.target.value)}
            />
            {imageSrc && <img src={imageSrc} className="max-w-60 rounded" alt="" />}
            <input
              type="file"
              className="invisible"
              id="imageupload"
              onChange={handleFileChange}
            />
            <div className="flex-1 -ml-72 text-center px-1 py-1 m-2">
              <label
                htmlFor="imageupload"
                className="mt-1 flex items-center bg-red-200  text-blue-400 ml-3 px-2 py-2 text-base font-medium rounded-full hover:bg-blue-800 hover:text-blue-300"
              >
                <IoImagesOutline />Add image
              </label>
            </div>
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
