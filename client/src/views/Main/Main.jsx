import React, { useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import styles from './Main.module.css'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Button} from '@chakra-ui/react'
import { validationsPS,validateAllPS,validationsNCC, validateAllNCC } from './validations'
import axios from 'axios';
import URL from '../../URL'


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
    const numberString = parameterPS.numbers.join(', ');
    
    try {
      const {data}= await axios.get(`${URL}/pairwithsum?${queryString}`)
    const resultString = data.join(', ');
    const historyPs = {
      numbers:numberString,
      targetSum:parameterPS.targetSum,
      result:resultString
    }
    setResultPS(resultString);
    setResultHistoryPS(prevResultHistory => prevResultHistory.concat(historyPs));
    setParametersPS({ ...parameterPS, numbers: [], number:'', targetSum:'' });
    } catch (error) {
      setResultPS('Check the entered parameters.');
      setParametersPS({ ...parameterPS, numbers: [], number:'', targetSum:'' });
    }

  }

  ///nonConstructibleChange///---------------------------------------------------------------------------------------

  const [parameterNCC,setParametersNCC]=useState({
    coin:'',
    coins:[],
})

const [resultNCC, setResultNCC] = useState([]);
const [resultHistoryNCC, setResultHistoryNCC] = useState([]);
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
      if(coin<0){
        alert('The coin cant have negative value');
        return;
      }

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
    const numberString = parameterNCC.coins.join(', ');
    try {
      const {data}= await axios.get(`${URL}/nonconstructiblechange?${queryString}`)
    const historyNCC = {
      numbers:numberString,
      result:data
    }
    setResultNCC(data);
    setResultHistoryNCC(prevResultHistory => prevResultHistory.concat(historyNCC));
    setParametersNCC({ ...parameterNCC, coins: [], coin:''});
    } catch (error) {
      setResultNCC('The are negative values in the array');
      setParametersNCC({ ...parameterNCC, coins: [], coin:''});
    }

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
      <div className={styles.containerTabContent}>
      <div className={styles.boxTabContent}>
      <div className={styles.content}>
        <h3>Summary</h3>
        <p className={styles.paragraph}>Given an array of integers, no number in this array is repeated, and an integer representing the target sum, te program will find whether there's a pair of numbers in the array that adds up to the target sum. If such pair does not exist, return an empty array.</p>
        <h5>Intructions:</h5>
        <div className={styles.intructionsList}>
        <li>Enter the numbers one by one in te 'Numbers' field and click in the '+' button to add them into an array</li>
        <li>Enter the target sum in te 'Target Sum' field and click in the 'Submit' button </li>
        </div>
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
      {resultHistoryPS.length!==0 && resultHistoryPS.map((item,index) =>{
                return <li key={index}>Numbers: {item.numbers}  TgSum: {item.targetSum}  Result: {item.result}</li>
            })}
      </div>
      </div>
      </div>
    </TabPanel>
    <TabPanel>
    <div className={styles.containerTabContent}>
      <div className={styles.boxTabContent}>
      <div className={styles.content}>
      <h3>Summary</h3>
        <p className={styles.paragraph}>Given an array of positive integers representing the values of coins in your possession, the program will returns the minimum amount of change (the minimum sum of money) that you cannot create.</p>
        <h5>Intructions:</h5>
        <div className={styles.intructionsList}>
        <li>Enter the vule of coins one by one in te 'Coins' field and click in the '+' button to add them into an array</li>
        <li>Clik in the 'Submit' button</li>
        </div>
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
      {resultHistoryNCC.length!==0 && resultHistoryNCC.map((item,index) =>{
                return <li key={index}>Coins: {item.numbers} - Result: {item.result}</li>
            })}
            </div>
            </div>
      </div>
    </TabPanel>
  </TabPanels>
</Tabs>
    </div>

    </div>
  );
}

export default Main;