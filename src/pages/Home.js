import { useState , useEffect } from 'react';
import { db } from '../firebase';
import '../App.css';
import { doc, getDoc } from "firebase/firestore";
import { slideInUp } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Form from '../components/Form';

function Home() {
  const [weddingId, setWeddingId] = useState(null);
  const [idExists, setIdExists] = useState(false);
  const [name, setName] = useState(null);
  const [error, setError] = useState(false);

  const styles = {
    slideInUp: {
      animation: 'x 2s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    },
  }

  useEffect(() => {
    const form = document.querySelector('form');
    const p = document.querySelector('p');

    setTimeout(() => {
      form.style.opacity = 1;
      p.style.opacity = 1;
    }, 3000);
  }, []);

  async function checkWeddingId(e) {
    e.preventDefault();
    const docRef = doc(db, "Wedding_ID", weddingId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setIdExists(true);
      setName(docSnap.data().name);
    } else {
      setError(true);
    }

  }

  return (
    <StyleRoot>
      <div className="App">
        {idExists ?
          <Form weddingId={weddingId} name={name} styles={styles} />
          :
          <>
            <h1 style={styles.slideInUp}>Sean & Michaela</h1>
            <h2 style={styles.slideInUp}>cordially invite you</h2>
            <p style={{opacity: '0'}}>Please enter your Wedding ID to continue RSVP</p>
            <form class="id-form" style={{opacity: '0'}} onSubmit={(e) => checkWeddingId(e)}>
              <input type="number" onChange={(e) => setWeddingId(e.target.value)} placeholder="Enter Wedding ID" />
              <button class="submit" type="submit">Enter</button>
              {error && <p className="error">Error: Ensure your ID Number is correct</p>}
            </form>
          </>
        }
      </div>
    </StyleRoot>
  );
}

export default Home;
