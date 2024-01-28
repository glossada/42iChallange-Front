import styles from './Landing.module.css'
// import image from '../../Images/WhatsApp Image 2023-09-29 at 11.57-PhotoRoom (1)-modified.png'


function Landing() {
  return (
    <div className={styles.container} style={{ height: '100vh' }}> 
    <div className={styles.textContainer}>
    <div className={styles.titleContainer}>
    <h1 className={styles.title}>Welcome to 42i Tech-Challenge</h1>
    </div>
      <p className={styles.par}>Here you will find the resolution for the 42i Tech-Challenge</p>
      <p className={styles.par}>Each Challenge will be displayed in different Tabs. Navigate between the Tabs and try them!</p>
    </div>
      <a href="bio" className={styles.myButton}>get started!</a>
    </div>
  );
}

export default Landing;