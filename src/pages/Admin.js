import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from '../firebase';

function Admin() {
  const [pending, setPending] = useState(null);
  const [attending, setAttending] = useState(null);
  const [notAttending, setNotAttending] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getAttending() {
      const q = query(collection(db, "Wedding_ID"), where("rsvp_status", "==", "Yes"));
      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const obj = doc.data();
        obj["id"] = doc.id;
        arr.push(obj)
      });
      setAttending(arr);
    }

    async function getPending() {
      const q = query(collection(db, "Wedding_ID"), where("rsvp_status", "==", "Pending"));
      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const obj = doc.data();
        obj["id"] = doc.id;
        arr.push(obj)
      });
      setPending(arr);
    }

    async function getNotAttending() {
      const q = query(collection(db, "Wedding_ID"), where("rsvp_status", "==", "No"));
      const arr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const obj = doc.data();
        obj["id"] = doc.id;
        arr.push(obj);
      });
      setNotAttending(arr);
    }

    getAttending();
    getPending();
    getNotAttending();
  }, [loading]);

  async function addNameToList(e) {
    setLoading(true);
    e.preventDefault();
    let lastId = 0;

    if (name === "") {
      return;
    }

    const q = query(collection(db, "Wedding_ID"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      lastId = parseInt(doc.id);
    });

    await setDoc(doc(db, "Wedding_ID", (lastId + 1).toString()), {
      name: name,
      rsvp_status: "Pending",
    });
    setName(null);
    setLoading(false);
  }

  async function deleteGuest(id) {
    setLoading(true);
    await deleteDoc(doc(db, "Wedding_ID", id.toString()));
    setLoading(false);
  }

  return (
    <div>
      <div>
        <h2>Add a person to the guest list</h2>
        <form className="add_form" onSubmit={(e) => addNameToList(e)}>
          <input defaultValue={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" type="test" name="name" />
          <button className="submit" type="submit">Add to Guest List</button>
        </form>
      </div>
      <div className="rsvp_table">
        <h3>Pending RSVP (Count: {pending && pending.length})</h3>
        <div>
          {pending && pending.map((att) => (
            <div key={att.id}>
              <span>ID: {att.id}</span>
              <span>Name: {att.name}</span>
              <button onClick={() => deleteGuest(att.id)} className="delete">Delete Guest</button>
            </div>
          ))}
        </div>
      </div>
      <div className="rsvp_table">
        <h3>Attending (Count: {attending && attending.length})</h3>
        <div>
          {attending && attending.map((att) => (
            <div key={att.id}>
              <span>ID: {att.id}</span>
              <span>Name: {att.name}</span>
              <span>Guest Count: {att.guest_count}</span>
              <button onClick={() => deleteGuest(att.id)} className="delete">Delete Guest</button>
            </div>
          ))}
        </div>
      </div>
      <div className="rsvp_table">
        <h3>Not Attending (Count: {notAttending && notAttending.length})</h3>
        <div>
          {notAttending && notAttending.map((att) => (
            <div key={att.id}>
              <span>ID: {att.id}</span>
              <span>Name: {att.name}</span>
              <button onClick={() => deleteGuest(att.id)} className="delete">Delete Guest</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;