import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const apiKey='vIk5HjBg2FMCeqryhaithGcjitdJIRWyRT3pooEK'
  const demoKey = 'DEMO_KEY'

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy +'-' + mm + '-' + dd

  const demoDate = '2022-07-18'
  const demoRequestLink ='https://jsonplaceholder.typicode.com/users'
  
  const requestLink = 'https://api.nasa.gov/neo/rest/v1/feed?start_date='+today+ '&end_date='+today+'&api_key=' + apiKey;

  const [data, setData] = useState();
  const[neoInfo, setNeoInfo] = useState({
    neoName: 'loading',
    diameter: 'loading',
    closestLunar: 'loading',
    speedkms: 'loading',
    closestTime:'loading',
  });
  

 
    
    

  useEffect(()=>{
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
      const dataValue = Object.values(data)
      let closest = 0
      for (let i= 1; i< dataValue[0].length; i++){
        if (+dataValue[0][i].close_approach_data[0].miss_distance.lunar < +dataValue[0][closest].close_approach_data[0].miss_distance.lunar){
          closest = i;

        }
      }
      
      const info = dataValue[0][closest]
      setNeoInfo (
        {
          neoName: info.name,
          diameter: info.estimated_diameter.kilometers.estimated_diameter_max,
          closestLunar: info.close_approach_data[0].miss_distance.lunar,
          speedkms: info.close_approach_data[0].relative_velocity.kilometers_per_second,
          closestTime: info.close_approach_data[0].close_approach_date_full,
        }
      )
    }
  },[data])

  
  

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{textDecoration:"underline"}} >What is the Closest Astroid Passing by Our Lovely Planet Today?</h1>
       
      <div className='info'> <h4>NEO Name: {neoInfo.neoName}</h4>
       <h4>Time closest to Earth: {neoInfo.closestTime}</h4>
       <h4>Diameter: {neoInfo.diameter} km</h4>
       <h4>Closest Distance: {neoInfo.closestLunar} Lunars</h4>
       <h4>Speed: {neoInfo.speedkms} km/s</h4></div>
      </header>

    </div>
  );
}

export default App;
