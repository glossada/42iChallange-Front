import React, { useState, useRef  } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import styles from './Main.module.css'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import { validationsPS,validateAllPS,validationsNCC, validateAllNCC } from './validations'
import axios from 'axios';


function Main() {
  ///PairWithSum///---------------------------------------------------------------------------------------
  const [parameterPS,setParametersPS]=useState({
    number:'',
    numbers:[],
    targetSum:'',
})

const [resultPS, setResultPS] = useState([]);
const [resultHistoryPS, setResultHistoryPS] = useState([]);
const [errorsPS, setErrorsPS] = useState({});

  const handleChangePS = (event) =>{
    const property = event.target.name;
    const value = event.target.value;

    setParametersPS({ ...parameterPS, [property]: value });
    setErrorsPS(validationsPS({ ...parameterPS, [property]: value }));
    
  }

    const addNumbersPS = () =>{
      const { number, numbers } = parameterPS;

    if (!isNaN(number) && number.trim() !== '') {
      // Agrega el número actual al arreglo de números
      setParametersPS({ ...parameterPS, numbers: [...numbers, Number(number)], number: '' });
    }
  }


  const handleSubmitPS = async (e) => {
    e.preventDefault();

    const emptyErrors=validateAllPS(parameterPS);

    if (Object.keys(errorsPS).length > 0) {
      const errorMessages = Object.values(errorsPS).join('\n');
      alert('The following errors were found:\n' + errorMessages);
      return;
    }

    if(emptyErrors.exist===true){
      const errorMessages = Object.values(emptyErrors).join('\n');
        alert('The following errors were found:\n' + errorMessages);
        return;
    }
    

    const queryString = new URLSearchParams({ numbers: parameterPS.numbers, targetSum: parameterPS.targetSum }).toString();

    const {data}= await axios.get(`http://localhost:3001/pairwithsum?${queryString}`)
    setResultPS(data);
    setResultHistoryPS(prevResultHistory => prevResultHistory.concat(data));
    setParametersPS({ ...parameterPS, numbers: [], number:'' });

  }

  ///nonConstructibleChange///---------------------------------------------------------------------------------------

  const [parameterNCC,setParametersNCC]=useState({
    coin:'',
    coins:[],
})

const [resultNCC, setResultNCC] = useState([]);
const [errorsNCC, setErrorsNCC] = useState({});

  const handleChangeNCC = (event) =>{
    const property = event.target.name;
    const value = event.target.value;

    setParametersNCC({ ...parameterNCC, [property]: value });
    setErrorsNCC(validationsNCC({ ...parameterNCC, [property]: value }));
    
  }

    const addNumbersNCC = () =>{
      const { coin, coins } = parameterNCC;

    if (!isNaN(coin) && coin.trim() !== '') {
      // Agrega el número actual al arreglo de números
      setParametersNCC({ ...parameterNCC, coins: [...coins, Number(coin)], coin: '' });
    }
  }

  const handleSubmitNCC = async (e) => {
    e.preventDefault();

    const emptyErrors=validateAllNCC(parameterNCC);

    if (Object.keys(errorsNCC).length > 0) {
      const errorMessages = Object.values(errorsNCC).join('\n');
      alert('The following errors were found:\n' + errorMessages);
      return;
    }

    if(emptyErrors.exist===true){
      const errorMessages = Object.values(emptyErrors).join('\n');
        alert('The following errors were found:\n' + errorMessages);
        return;
    }
    

    const queryString = new URLSearchParams({ coins: parameterNCC.coins }).toString();

    const {data}= await axios.get(`http://localhost:3001/nonconstructiblechange?${queryString}`)
    setResultNCC(data);
  }



  return (
    <div className={styles.container} style={{ height: '100vh' }}> 
      <NavBar/>
      <div className={styles.containerTab}>
      <Tabs isFitted variant='enclosed'>
  <TabList mb='1em'>
    <Tab className={styles.tabs}>Find Pair With Sum</Tab>
    <Tab className={styles.tabs}>Non Constructible Change</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <form onSubmit={handleSubmitPS}>
       <div>
      <label className={styles.label} htmlFor="number">Numbers: </label>
      <input className={styles.input} type="text" name='number' value={parameterPS.number} onChange={handleChangePS} />
      <Button className={styles.Button} colorScheme='beige' variant='outline' borderColor='beige' onClick={addNumbersPS}>
        +
      </Button>
      <span className={styles.numbersList}>{parameterPS.numbers.join(', ')}</span>
      <p className={styles.error}>{errorsPS.number}</p>
      </div>
      <div>
      <label className={styles.label} htmlFor="targetSum">Target Sum: </label>
      <input className={styles.input} type="text" name='targetSum' value={parameterPS.targetSum} onChange={handleChangePS} />
      <span className={styles.numbersList}>{parameterPS.targetSum}</span>
      <button className={styles.submitButton} type="submit">Submit</button>
      {errorsPS.targetSum && <p className={styles.error}>{errorsPS.targetSum}</p>}
      </div>
      </form>
      {resultPS.length!==0 && <p className={styles.result}>Result:{resultPS}</p>}

      <h3>Result History:</h3>
      {resultHistoryPS.length!==0 && <p className={styles.result}>{resultHistoryPS.join(', ')}</p>}
    </TabPanel>
    <TabPanel>
    <form onSubmit={handleSubmitNCC}>
       <div>
      <label className={styles.label} htmlFor="coin">Coins: </label>
      <input className={styles.input} type="text" name='coin' value={parameterNCC.coin} onChange={handleChangeNCC} />
      <Button className={styles.Button} colorScheme='beige' variant='outline' borderColor='beige' onClick={addNumbersNCC}>
        +
      </Button>
      <span className={styles.numbersList}>{parameterNCC.coins.join(', ')}</span>
      <p className={styles.error}>{errorsNCC.coin}</p>
      </div>
      <div>
      <button className={styles.submitButton} type="submit">Submit</button>
      </div>
      </form>
      {resultNCC.length!==0 && <p className={styles.result}>Result:{resultNCC}</p>}

      <h3>Result History:</h3>
    </TabPanel>
  </TabPanels>
</Tabs>
    </div>

    </div>
  );
}

export default Main;