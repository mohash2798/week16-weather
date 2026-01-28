  let city=[]
  async function getWeather(Find){
      var res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d74bc15762b946bca73194337262501&q=${Find}&days=3`)
      var data =await res.json()
      
    city= data 
    console.log(city);
    display()
  }
  getWeather("alexandria")
  document.querySelector("#inputSearch").addEventListener("input",function(e){
if (e.target.value.trim() !== "") {
    getWeather(e.target.value)
} else {
    getWeather("alexandria")
}
  })

  function display(){
      var box=""
      var forecast =city.forecast.forecastday
      for(var i =0 ;i<forecast.length;i++){
           var dateName =new Date(forecast[i].date)
           var dayDateName=dateName.toLocaleString("en-us",{weekday:"long"})
           var monthName=dateName.toLocaleString("en-us",{month:"long"})
           var dayNum=dateName.getDate()
                box +=`
        <div class="day big ${i==1?"bg-coustm2":"bg-coustm"}">
            <div class="d-flex ${i==0?"justify-content-between":"justify-content-center"} "><span>${dayDateName}</span><span>${i==0 ? dayNum:""} ${i==0? monthName:""}</span></div>
            <h3 class="city">${i==0?city.location.name:""}</h3>
            <div class="temp">${forecast[i].day.maxtemp_c}<sup>o</sup>c</div>
            <div class="status"><img src="${forecast[i].day.condition.icon}"><br />${forecast[i].day.condition.text}</div>
          ${i==0?`  <div class="info">
              <span>💧 ${city.current.humidity}%</span>
              <span>🌬 ${city.current.wind_kph} km/h</span>
              <span>🧭 ${city.current.wind_dir}</span>
            </div>`:""}
          </div>`
          console.log();
          
      }
      
          document.getElementById("container-weather").innerHTML=box
  }
