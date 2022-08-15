import './App.css';
import { useEffect, useState } from 'react';
import Display from './components/Display';
import NeoInfo from './components/NeoInfo';
import Earth from './imgs/Earth.svg'
import Header from './components/Header';

function App() {

  const apiKey='vIk5HjBg2FMCeqryhaithGcjitdJIRWyRT3pooEK'
  const demoKey = 'DEMO_KEY'

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy +'-' + mm + '-' + dd

  const demoRequestLink ='https://jsonplaceholder.typicode.com/users'
  
  const requestLink = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+today+ '&end_date='+today+'&api_key=' + apiKey;

  const [data, setData] = useState();
  const[neoInfo, setNeoInfo] = useState([{
    name: 'loading',
    diameter: 'loading',
    closestLunar: 'loading',
    speedkms: 'loading',
    closestTime:'loading',
  }]);
  const [displayI, setDisplayI]=useState(0)


  
  useEffect(()=>{
    console.log('getting data')
    fetch(requestLink, {
      method:"GET",
    })
    .then((response)=>{
      if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
      .then((actualData) => setData(actualData.near_earth_objects))
  }, [])

  useEffect(()=>{
    
   if (data) 
    {
      console.log('datadata', data)
      const dataValue = Object.values(data)
      const neoData = dataValue[0]
      neoData.sort((a,b)=>{
        return a.close_approach_data[0].miss_distance.lunar -b.close_approach_data[0].miss_distance.lunar
      })
      const lunars = neoData.map(data=>data.close_approach_data[0].miss_distance.lunar)
      console.log('lunars',lunars)
      const neoInfoObjects = neoData.map(info=>({
        neoName: info.name,
        diameter: info.estimated_diameter.kilometers.estimated_diameter_max,
        closestLunar: info.close_approach_data[0].miss_distance.lunar,
        speedkms: info.close_approach_data[0].relative_velocity.kilometers_per_second,
        closestTime: (info.close_approach_data[0].close_approach_date_full.slice(-6,-3) + info.close_approach_data[0].close_approach_date_full.slice(-2)).trim()
      }))
      if(neoInfoObjects.length>5) neoInfoObjects.length=5
      
      setNeoInfo (neoInfoObjects)
      console.log('loaded data')
    }
  },[data])

  return (
    <div className="App">
      <Header/>
      {data&& <div className="display-container">
        <img src={Earth} alt='earth'/>
        {neoInfo.map((neo,i)=><Display handleClick={()=>setDisplayI(i)} selected={i===displayI?true:false} key={i} neoInfo={neo}/>)}
      </div>}
      {data&&<NeoInfo neoInfo={neoInfo[displayI]}/>}
    </div>
  );
}

export default App;