import { useEffect, useState } from "react"
import axios from "axios";
import "./App.css"

export default function App(){

  const [flagsdata , setFlagsData]=useState([]);
  const[searchdata , setSearchData] = useState([]);
  const[searchvalue ,setSearchValue]= useState("");

  useEffect(()=>{
      performAPICall()
    .then((flags) => {
      if(flags.length){
        setFlagsData(flags);
        setSearchData(flags)
      }
      
    })
    .catch(() => {
      console.log('Error occured when fetching flags data');
    });
}, []);


const performAPICall = async()=>{
  try{
      const apiData = await axios.get('https://restcountries.com/v3.1/all');
      console.log(apiData.data)
      
      return apiData.data;

  }catch(e){
    console.log(e.message);

  }
}

const handlesearch=(e)=>{
  
  setSearchValue(e.target.value);
  console.log(e.target.value)
  const arr = flagsdata.filter((item)=>{
    console.log(item.name.common);
    return item.name.common.includes(e.target.value)
  })
console.log(arr);
setSearchData(arr);
}

  return(
      <div className="maincontainer">
      <input type ="text" placeholder="Search for countries" className="search" onChange={handlesearch} value={searchvalue}></input>
      <div className="countriesdiv">
        {searchdata.map((item)=>{
          return(
            <div className="countryCard">
              <img  src={item.flags.png}
              alt={item.flags.alt} className="flagimg"/>
              <h5>{item.name.common}</h5>
          </div>
          )
          
        })}
      </div>
      
      </div>
  )

}