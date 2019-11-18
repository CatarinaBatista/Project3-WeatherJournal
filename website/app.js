/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = "bf1eadabe68b7dcef6a640d1f7732a51";
let date = new Date();
let todaysDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();


/* Function to GET Web API Data */
const getWeather = async(zipCode) => {
    const url = `${baseUrl}zip=${zipCode}&appid=${apiKey}`;

    const result = await fetch(url);
    try {
        const data = await result.json();
        return data;
    }
    catch(error) {
        console.log("error", error);
        alert(error);
    }
}

/* Function called by event listener */
const performAction = async () => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(zipCode)
        .then(data => {
            const allData = {
                date: todaysDate,
                temp: data.main.temp,
                content: feelings
            };
            postData('/addData', allData);            
        })
        .then(
            updateUI
        );
};


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function to POST data */
const postData = async (url='', data={}) => {    
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    try {
        const userData = await response.json();
        return userData;
    }
    catch(error) {
        console.log('ERROR: ', error);
        alert(error);
    }
}


/* Function to update UI */
const updateUI = async() => {
    const req = await fetch('/getData')
        .then(Response => Response.json());

    try { 
        document.getElementById('date').innerHTML = req.date;
        document.getElementById('temp').innerHTML = 'Celsius: ' + Math.round(Number(req.temp) - 273.15) + 'ºC <br><br> ' + 
        'Fahrenheit: ' + (Math.round(Number(req.temp) - 273.15) * 9/5 + 32) + 'ºF';
        document.getElementById('content').innerHTML = req.content;
    }
    catch (error) {
        console.log('ERROR: ', error);
        alert(error);
    }
}