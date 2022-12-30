import React, { useState, useContext } from 'react'
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from "../context/AuthContext"

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setErr(err);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  }
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }
    // create user chats
    setUser(null)
    setUsername("")
  }

  return (
    <div className='bg-[#5C4F82] h-fit w-[90%] md:w-3/4 mt-14 rounded-3xl'>
      <div className="searchBox flex items-center">
        <span className='md:flex-initial flex-1 flex items-center'>
          <i className="bi bi-search text-[#979797] ml-3 md:ml-8 text-[25px] relative"></i>
        <input type="text" className='md:flex-initial flex-1 bg-transparent
         outline-none py-3 md:py-5 uppercase text-sm font-bold text-white pl-5 w-full' placeholder='Type name here' 
         onKeyDown={handleKey} value={username} onChange={e => setUsername(e.target.value)} />
        </span>
       <span className='md:hidden flex'><i onClick={handleSearch} 
       className="bi  bi-arrow-right flex-1 bg-[#382ba6] text-white 
       rounded-tr-3xl rounded-br-3xl py-3 md:py-5 px-6"></i></span>
      </div>

      {user && <div className="user empty:hidden cursor-pointer flex justify-start 
      items-center h-[80px] pl-[10px] w-[100%] hover:bg-[#40375a] hover:rounded-b-3xl" onClick={handleSelect}>
        <div className="userPic">
          <img src={user.photoURL} alt="user" className='w-14 rounded-full mr-[10px]' />
        </div>
        <div className="userInfo flex items-center flex-col text-white">
          <span className='text-2xl'>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default Search
