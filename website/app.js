/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = "bf1eadabe68b7dcef6a640d1f7732a51";


/* Function to GET Web API Data */
const getWeather = async(zipCode) => {
    const url = `${baseUrl}zip=${zipCode}&appid=${apiKey}`;

    const res = await fetch(url);
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

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
const performAction = async () => {
    const zipCode = document.getElementById('zipCode').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(zipCode)
        .then(data => {
            const allData = {
                date: formatDate(new Date()),
                temperature: data.main.temp,
                userInfo: feelings
            };
            postUserData('/addData', allData)
        })
        .then(updateUI)
};


/* Function to POST user data */
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
        return userData;
    }
    catch(error) {
        console.log('ERROR: ', error);
        alert(error);
    }
}


/* Function to post Data */
const updateUI = () => {

}