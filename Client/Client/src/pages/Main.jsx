import React from "react";
import { useTypewriter , Cursor } from "react-simple-typewriter";
import styles from "./Main.module.css";
import {Link} from 'react-router-dom'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
const ZoomInScrollOut = batch(Sticky(), Fade(), ZoomIn());
const FadeUp = batch(Fade(), Move(), Sticky());
import welcome from "../assets/Welcome.png";
import '../components/button.css'



function Main() {
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
       <h1 className={styles.static}>
        LEARN <span className={styles.dynamic}>{typeEffect}</span> <span className={styles.cursor}> <Cursor /></span>
      </h1>
      <hr className={styles.line}/>
      <h3 className={styles.motivation}>
        No need to struggle alone we are here throughout your earning and learning journey
      </h3>
       </div>
    <div className={styles.buttons}>
  
<Link to="/login">  
<button className={styles.login}>Login</button>
</Link>
     <Link to="/signup"><button className={styles.signup}>Signup </button></Link>
      </div>
      <ScrollContainer >
      <ScrollPage>
        <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
          <span style={{ fontSize: "30px", color: "rgb(84,121,247)"}}>Let's start our learning and earning journey!! </span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <span style={{ fontSize: "40px" }}>LEARN2EARN</span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={FadeUp}>
        <img src={welcome} alt="Welcome" style={{ width: "300px" }} />
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={ZoomInScrollOut}>
          <span style={{ fontSize: "40px" }}>Welcome to Intellect Coin..!</span>
        </Animator>
      </ScrollPage>
      <ScrollPage>
        <Animator animation={batch(Fade(), Sticky())}>
          <span style={{ fontSize: "40px" }}>Join our community!!</span>
          <br/>
          <span style={{ fontSize: "30px" }}>
          <Link to="/login">  
<button className={styles.login} style={{backgroundColor:"rgb(84,121,247)",color:"white", marginTop:"10px",marginRight:"10px",marginLeft:"100px"}}>Login</button>
</Link>
     <Link to="/signup"><button className={styles.signup}>Signup </button></Link>
          </span>
        </Animator>
      </ScrollPage>
    </ScrollContainer>
    </>
  );
}

export default Main;
