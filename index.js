function weatherApp() {
    return {
        apiKey: "aa6ea938956a570b463fa4a1a58898b7",
        city: '',
        weatherData: null,
        error: '',
        async fetchWeather() {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`);
                const data = await response.json();
                if (data.cod === 200) {
                    this.weatherData = data;
                    this.error = '';
                } else {
                    this.error = 'City not found. Please try again.';
                    this.weatherData = null;
                }
            } catch (error) {
                this.error = 'An error occurred. Please try again.';
                this.weatherData = null;
            }
        }
    }
}