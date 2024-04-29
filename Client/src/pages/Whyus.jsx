import React from 'react'
import WhyUs from '../../images/whyUs.png'
import styles from './Whyus.module.css'


function Whyus() {
  const h1Style = {
    fontSize: '90px',
    color: 'rgb(84,121,247,0.4)',
    WebkitTextStroke: '1.7px rgb(84,121,247)', 
    textStroke: '4px black',
    animation: 'pulse 2s infinite',
    
  };
  return (
    <div className={styles.whyUsContainer}>

        <img src={WhyUs} alt="" />

     <div>
     <h1 style={h1Style}>Why Us?</h1>
       <div className={styles.container}>
       
         <div className={styles.card}>
          <p className={styles.title}>
          <h4>Practical Learning:</h4> Intellect Coin provides hands-on learning opportunities. 
          </p>

        </div>
        <div className={styles.card}>
          <p className={styles.title}>
          <h4>Earn While You Learn:</h4>Intellect Coin rewards users for their participation and achievements.
          </p>

        </div>
        <div className={styles.card}>
          <p className={styles.title}>
          <h4>Community Engagement:</h4> Intellect Coin fosters a vibrant community of learners and experts.
          </p>

        </div>
        <div className={styles.card}>
          <p className={styles.title}>
          <h4>Track Record of Success:</h4> Intellect Coin has a proven track record of learners to achieve their goals.
          </p>

        </div>
         </div>
    

       </div>
     </div>
 
  )
}

export default Whyus