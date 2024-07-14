import React from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import styles from "./HeroSection.module.css";
import { Link } from 'react-router-dom';

function HeroSection() {
  const [typeEffect] = useTypewriter({
    words: [
      "as if you'll EARN forever...",
      "to unlock the key to EARN...",
      "from yesterday and EARN for tomorrow...",
      "to unlearn, It's the pathway to EARN...",
      "to EARN..."
    ],
    loop: true,
    typeSpeed: 100,
    delaySpeed: 100
  });

  return (
    <>
      <div className={styles.main}>
        <h3> Enrich your Learning and earning journey with Intellect Coin</h3>
        <h1 className={styles.static}>
          LEARN <span className={styles.dynamic}>{typeEffect}</span> <span className={styles.cursor}> <Cursor /></span>
        </h1>
        <hr className={styles.line} />
        <h3 className={styles.motivation}>
          No need to struggle alone we are here throughout your earning and learning journey
        </h3>
      </div>
      <div className={styles.buttons}>
        <Link to="/login" className={styles.login}>Login</Link>
        <Link to="/signup" className={styles.signup}>Signup</Link>
      </div>
    </>
  );
}

export default HeroSection;
