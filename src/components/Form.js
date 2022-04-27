import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
import { bounce, slideInUp, fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';


function Form(props) {
  const { weddingId, name } = props;
  const [guestCount, setGuestCount] = useState(0);
  const [attendanceStatus, setAttendanceStatus] = useState("Yes");
  const [formSuccess, setFormSuccess] = useState(false);

  const styles = {
    slideInUp: {
      animation: 'x 2s',
      animationName: Radium.keyframes(slideInUp, 'slideInUp')
    },
  }

  useEffect(() => {
    setTimeout(() => {
      const form = document.querySelector('form');
      const p = document.querySelector('p');
      form && (form.style.opacity = 1);
      p && (p.style.opacity = 1);
    }, 2000);
  }, [formSuccess]);

  async function submitForm(e) {
    e.preventDefault();
    const weddingRef = doc(db, "Wedding_ID", weddingId);

    // Set the "capital" field of the city 'DC'
    await updateDoc(weddingRef, {
      rsvp_status: attendanceStatus,
      guest_count: guestCount,
    });

    setFormSuccess(true);
  }

  if (formSuccess) {
    return (
      <StyleRoot>
        <h1 style={styles.slideInUp}>Thank You for your Submission!</h1>
        {attendanceStatus === "Yes" ?
          <p style={{opacity: 0}}>We can't wait to see you there!</p>
          :
          <p style={{opacity: 0}}>You suck!</p>
        }
      </StyleRoot>
    )
  }

  return (
    <StyleRoot>
      <h1 style={styles.slideInUp}>Hi {name}</h1>
      <form style={{ opacity: 0 }} onSubmit={(e) => submitForm(e)}>
        <label>
          RSVP Status
          <ul onChange={(e) => setAttendanceStatus(e.target.value)}>
            <li>
              <input
                checked={attendanceStatus === "Yes"}
                type="radio"
                value="Yes"
                name="rsvp" />
              <label>Yes</label>
            </li>
            <li>
              <input
                type="radio"
                value="No"
                checked={attendanceStatus === "No"}
                name="rsvp" />
              <label>No</label>
            </li>
          </ul>
        </label>
        {attendanceStatus === "Yes" &&
          <label>
            Guest Count
            <input required={attendanceStatus === "Yes"} type="number" onChange={(e) => setGuestCount(e.target.value)} placeholder="Enter Guest Count" />
          </label>
        }
        <button class="submit" type="submit">Enter</button>
      </form>
    </StyleRoot>
  )
}

export default Form;