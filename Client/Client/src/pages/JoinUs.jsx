import React from 'react';
import styles from './JoinUs.module.css';

const JoinUs = () => {
  return (
    <>
      <div className={styles.joinUsContainer}>
        <div className={styles.Card1}>
        <h1>
            Choose your field
            
          </h1>
          <p>
            First decide in which field you want to work. And show your talent while learning and earning.
          </p>
        </div>
         

        <div className={styles.Card2}>
          <h1>
          Sign Up/Register
          </h1>
          <p>
          Look for a "Sign Up" or "Register" button on the website's homepage. Click on it to begin the registration process.
          </p>

        </div>

        <div className={styles.Card3}>
          <h1>
          Explore the website
          </h1>
          <p>
          Once you have registered, you can explore the website. You can learn more about the company and its services.

          </p>

        </div>

        <div className={styles.Card4}>
          <h1>
          Complete Your Profile
          </h1>
          <p>
            Complete your profile to showcase your talent. Provide necessary information regarding that.
          </p>

        </div>

        <div className={styles.Card5}>
          <h1>
            Learn and Earn
          </h1>
         <p>
          Learn and Earn with Intellect Coin.
         </p>

        </div>

      </div>

    </>
  )
}

export default JoinUs