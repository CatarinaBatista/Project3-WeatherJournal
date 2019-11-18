/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = "bf1eadabe68b7dcef6a640d1f7732a51";
let d = new Date();
let todaysDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


/* Function to GET Web API Data */
const getWeather = async(zipCode) => {
    const url = `${baseUrl}zip=${zipCode}&appid=${apiKey}`;

    const result = await fetch(url);
    try {
        const data = await result.json();
        console.log(data);
        return data;
    }
    catch(error) {
        console.log("error", error);
        alert(error);
    }
}

/* Function called by event listener */
const performAction = async () => {
    const zipCode = document.getElementById('zipCode').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(zipCode)
        .then(data => {
            const allData = {
                date: todaysDate,
                temp: data.main.temp,
                content: feelings
            };
            console.log(allData)
            postUserData('/addData', allData);            
        })
        .then(
            updateUI()
        );
};


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function to POST data */
const postUserData = async (url='', data={}) => {    
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
        console.log(userData);
        return userData;
    }
    catch(error) {
        console.log('ERROR: ', error);
        alert(error);
    }
}


/*  */
const updateUI = async() => {
    const request = await fetch('/getData');

    try {
        const data = await request.json;
        
        document.getElementById('date').innerHTML = data.date;
        document.getElementById('temp').innerHTML = data.temp;
        document.getElementById('content').innerHTML = data.content;
    }
    catch (error) {
        console.log('ERROR: ', error);
        alert(error);
    }
}