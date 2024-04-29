import React from 'react'
import styles from './Categories.module.css'



const Categories = () => {
  return (
    <div className={styles.container}>
         <div className={styles.categoryTitle}>
      
           <p className={styles.title}>Know our Categories</p>
           <p className={styles.subtitle}>Here are the different categories that you can explore and know about.</p>
         </div>
         <div className={styles.cardlist}>
         <div className={styles.Card1}>
       
         <img src="https://www.businessoutreach.in/wp-content/uploads/2023/05/Indian-hospitality-investments-to-exceed-2.3-billion-over-the-next-two-to-five-years.jpg" alt="" className={styles.image}/>
       <h4>App for Hospitality</h4>
     </div>
     <div className={styles.Card2}>
    
     <img src="https://images.pexels.com/photos/57690/pexels-photo-57690.jpeg?cs=srgb&dl=pexels-knownasovan-57690.jpg&fm=jpg" alt="" className={styles.image} />
       <h4>App for Designing</h4>
 
     </div>
     <div className={styles.Card3}>

     <img src="https://www.mckinsey.com/~/media/mckinsey/business%20functions/mckinsey%20digital/our%20insights/unleashing%20developer%20productivity%20with%20generative%20ai/thumb-gettyimages-1395344871.jpg" alt="" className={styles.image} />
       <h4>App for Developers</h4>
       
     </div>
     <div className={styles.Card4}>

     <img src="https://anydayguide.com/uploads/events/holidays/professional/forensic-expert-day.jpg" alt="" className={styles.image}/>
       <h4>App for Health Science</h4>
     </div>
         </div>
    </div>
  )
}

export default Categories