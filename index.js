const apiKey = "aa6ea938956a570b463fa4a1a58898b7"

const datasValue = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => funtion(data)).catch(error => console.log(error))

}

const funtion = (data) => {
    const cityName = document.getElementById('city')
    const wather = document.getElementById('wather')
    const watherSetuation = document.getElementById('wather-setuation')


    if (typeof data.name === "undefined") {
        cityName.innerText = 'Sorry No Result Found'
        wather.innerText = ''
        watherSetuation.innerText = ''
    }
    else {

        cityName.innerText = data.name
        wather.innerHTML = `${data.main.temp}  &deg;C`
        watherSetuation.innerText = data.weather[0].description

    }



}

const common = () => {

    const inputFild = document.getElementById('input-field')
    datasValue(inputFild.value)
    console.log(inputFild.value)

}




// When I Click In A button 
document.getElementById('input-field').addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        common()

    }
});


document.getElementById('button').addEventListener('click', function () {
    common()
})


