'use client'
import React, {useState, useEffect} from "react";
//firebase add data 
import { collection, addDoc, getDocs, querySnapshot, query, onSnapshot, doc, deleteDoc } from "firebase/firestore"; 
import { db } from "./firebase";
export default function Home() {
  const [items, setItems] = useState([
    // {name: 'Coffe', price: 10.12},
    // {name: 'Movie', price: 10.12},
    // {name: 'Candy', price: 10.12}

  ])

  const [newItems, setNewItems] = useState({name: '', price: ''});
  const [total, setTotal] = useState(0);
  // add items to database

  const addItems = async (e) =>{
    e.preventDefault();
    if(newItems.name !== '' && newItems.price !== '') {
      // setItems([...items, newItems]);
      await addDoc(collection(db, 'items'),{
        name: newItems.name.trim(),
        price: newItems.price,
      })
      setNewItems({name: '', price: ''})

      
    }
  }

  //red data from database
  useEffect(() => {
    const q = query(collection(db, 'items'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id});
      });
      setItems(itemsArr)

      //Red total from itemsArr
      const calculateTotal = () =>{
          const totalPrice = itemsArr.reduce((previous, current) => {
            const priceNumber = Number(current.price);

            if(!isNaN(priceNumber)) {
              return previous + priceNumber;
            }else{
              console.log('Skipping invalid price ${current.price}');
              return previous;
            }

          },0)
          console.log(totalPrice);
          setTotal(totalPrice);
      }
     calculateTotal();
     return () => unsubscribe();
    })
  },[])
  //delete data from database 
  const deleteItem = async (id)  =>{
    await deleteDoc(doc(db, "items", id));
    // console.log('clicked')
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm ">
        <h1 className="text-4xl p-4 text-center">Cost Tracker</h1>
        <div className="bg-slate-800 p-4 rounded-lg">
          <form className="grid grid-cols-6 items-center text-black">
            <input 
            className="col-span-3 p-3"
            type="text" 
            placeholder="Enter Item" 
            value={newItems.name}  
            onChange={(e) => setNewItems({...newItems, name: e.target.value})}
            />

            <input 
            className="col-span-2 p-3 mx-3" 
            type="number" 
            placeholder="Enter Item" 
            value={newItems.price}
            onChange={(e) => setNewItems({...newItems, price: e.target.value})}
            />
            

            <button onClick={addItems} className="bg-slate-900 text-white p-3 text-xl" type="submit">+</button>
          </form>

          <ul>
            {items.map((item, id) =>(
              <li key={id} className="my-4 w-full flex justify-between bg-slate-900 ">
                <div className="p-4 w-full flex justify-between">
                  <span className="capitalize">{item.name}</span>
                  <span>{item.price}</span>
                </div>
                <button onClick={() => deleteItem(item.id)}  className="ml-8 p-4 border-l-2 hover:border-slate-900 w-16">X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ("") : (
            <div className="flex justify-between p-3">
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
