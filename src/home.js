import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './style.css'

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',        
        humidity: 10,        
        speed: 2,
        image: '/Images/clouds.png'   
    })
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const handleClick = () =>{
        if (name !== ""){
        const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=8a1cb805f22b49f8de01896cf3c5f208&units=metric`;
        axios.get(apiurl)
        .then(res => {
            let imagepath ='';
            if(res.data.weather[0].main == "Clouds") {                    
                imagepath = "/Images/clouds.png"                
            } else if(res.data.weather[0].main == "Clear") {                    
                imagepath = "/Images/clear.png"                
            }else if(res.data.weather[0].main == "Rain") {                    
                imagepath = "/Images/rain.png"                
            }else if(res.data.weather[0].main == "Drizzle") {                    
                imagepath = "/Images/Drizzle.png"                
            }else if(res.data.weather[0].main == "Mist") {                    
                imagepath = "/Images/mist.png"                
            }else {                    
                imagepath = '/Images/clouds.png'                
            }
            console.log(res.data);
            console.log(res.data);
           setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed,
        image:imagepath})
        setError('');
        })
        .catch( err => {
            if (err.response.status == 404){
                setError("Invalid city Name")
            }else{
                setError('');
            }
            console.log(err);
        })
        }
    }

    return(
        <div className='container'> 
           <div className="weather">
              <div className="search">
                 <input type="text" placeholder='Enter city name' onChange={e => setName(e.target.value)}/>
                 <button><img src="/Images/1.png" onClick={handleClick} alt=""/></button>
 
              </div>
              <div className="error">
                <p>{error}</p>
              </div>
              <div className="winfo">
                  <img src={data.image} alt="" />  
                  <h1>{Math.round(data.celcius)}°c</h1>
                  <h2>{data.name}</h2>
                  <div className="details">
                    <div className="col-1">
                        <img src="/Images/humidity.png" alt="" />
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col-1">
                        <img src="/Images/wind.png" alt="" />
                        <div className='wind'>
                            <p>{Math.round(data.speed)} km/h</p>
                            <p>wind</p>
                        </div>
                    </div>
                  </div>
              </div>
           </div>
        </div>
    )
}

export default Home