    import { CountyDataList } from './dataset.js'

    let alertprop = null

    fetchWeatherAPI();

    function success(position) {
        FindCounty(position.coords.latitude, position.coords.longitude);
    }

    function error() {
        console.log("error")
    }

    function getLocation(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);

        } else { 
            console.log("geolocation isn't supported");
        }
    }

    async function FindCounty(lat, lon) {
        const result = await fetch("https://api.geoapify.com/v1/geocode/reverse?lat="+lat+"&lon="+lon+"&apiKey=8c0038a78d7c443faff594bbc7177339")
           .then(response => response.json())
           .then(data => {
                let county = data.features[0].properties.county.replace(" County", "")
                let SAMEcode = CountyDataList.get(county)

                console.log("Your SAME code is: "+SAMEcode)

                alertprop.forEach(CurrentElement => {
                    CurrentElement.properties.geocode.SAME.forEach(CurrentElement2 => {
                        //Uncomment to test Alert System
                        
                        //SAMEcode = "053013"
                        
                        if (SAMEcode == CurrentElement2) {
                            console.log("ALERT")
                            const alertText = document.getElementById("ALERtext");
                            alertText.textContent = "WARNING A NATURAL DISASTER IS IN YOUR COUNTY";

                            
                        }
                    })
                });
           });
    }


    async function fetchWeatherAPI() {
       const result = await fetch("https://api.weather.gov/alerts?active=true&area=WA&limit=500")
           .then(response => (response.json()))
           .then(data => {
                alertprop = data.features
                getLocation();
           });
    }