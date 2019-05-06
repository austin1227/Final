
let weatherApp = new Vue({
  el: '#app',
  data: {
    currentTemp: '',
    minTemp: '',
    maxTemp:'',
    sunrise: '',
    sunset: '',
    pressure: '',
    humidity: '',
    wind: '',
    overcast: '',
    icon: '',
    name: '',
    news: ''


  },

  methods: {
    getWeather() {
      let url = "http://api.openweathermap.org/data/2.5/weather?q=Minneapolis&units=imperial&APPID=ffeb6e5ba828e9110a4b21be527debf4";
      axios
        .get(url)
        .then(response => {
          this.name = response.data.name;
          this.currentTemp = response.data.main.temp;
          this.minTemp = response.data.main.temp_min;
          this.maxTemp = response.data.main.temp_max;
          this.pressure = response.data.main.pressure;
          this.humidity = response.data.main.humidity + '%';
          this.wind = response.data.wind.speed + 'm/s';
          this.overcast = response.data.weather[0].description;
          this.icon = "images/" + response.data.weather[0].icon.slice(0, 2) + ".svg";
          this.sunrise = new Date(response.data.sys.sunrise*1000).toLocaleTimeString("en-GB").slice(0,4);
          this.sunset = new Date(response.data.sys.sunset*1000).toLocaleTimeString("en-GB").slice(0,4);
      })

      .catch(error => {
        console.log(error);
      });
    },

    getNews() {
      let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=e21b9521f62e4905b610c90bdf7a67e4";
      axios
        .get(url)
        .then(response => {
          this.news = response.data.articles;
        })

    },


  },
  beforeMount() {
    this.getWeather();
    this.getNews();
  },



  });
