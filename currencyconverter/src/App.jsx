import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react'
function App() {
 const [Rates, setRates] = useState({});
 const [value, setValue] = useState();
 const [currency, setCurrency] = useState(null)

 useEffect(()=>{

  console.log('effect run, currency is now', currency)
        if(currency){
          axios
          .get(`https://open.er-api.com/v6/latest/${currency}`)
        .then(response => {
          setRates(response.data.rates)
        })
        .catch((error)=>{
                 console.log(error);             
        })
        }
 },[currency])

 const handleInput = (e)=>{
     setValue(e.target.value)
 }
 const handleOnSubmit =(e)=>{
  event.preventDefault()
  setCurrency(value)
 }
  return (
        <>
       <h1>Currency Display</h1>
       <form action="" onSubmit={handleOnSubmit}>
         Currency: <input type="text" value={value} placeholder='Currency' onChange={handleInput}/>
         <button type='submit'>exchange rate</button>
       </form>
       <pre>
        {JSON.stringify(Rates, null, 2)}
      </pre>
    </>
  )
}

export default App
