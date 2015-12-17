$(document).ready(function () {
    function getWeatherByCity(lang, fnOK, fnError, cityName) {
        $.getJSON(
            'http://api.openweathermap.org/data/2.5/forecast/daily?q=' 
            + cityName + '&APPID=85dd9ac97b8b9d0cbc5f814a5b96ffa6&cnt=7&units=metric' + '&lang=' + lang + '&callback=?',
            function (data) {
                fnOK.call(this, data);
            }
        );
    }
    
    var functionOk = function (data) {
        console.log(data);
        
        //Connected elements: images, air temperature, max temperature, 
        //min temperature, main, speed wind, humidity to the data that 
        //came from the site 'OpenWeatherMap'  on current day!
        var iconSrc = 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
        $('#icon-current-time').html('<img src="' + iconSrc + '" alt="Weather icon" title="' + data.list[0].weather[0].description + '" >');
        $('#current-temperature').html(Math.round(data.list[0].temp.morn) + '&deg;C');
        $('#main-current').html(data.list[0].weather[0].main);
        $('#min-temperature').html('Min:' + '&nbsp;' + Math.round(data.list[0].temp.min));
        $('#max-temperature').html('Max:' + '&nbsp;' + Math.round(data.list[0].temp.max));
        $('#humidity-day').html('humidity:'+ '&nbsp;' + data.list[0].humidity + '%');
        $('#wind-day').html('Windy:' + '&nbsp;' + data.list[0].speed + '&nbsp;' + 'm/s');

        //Connected elements: air temperature, description for the current day afternoon!
        $('#afternoon').html(Math.round(data.list[0].temp.day) + '&deg;C');
        $('#main-afternoon').html(data.list[0].weather[0].main);
        
        //Connected elements: air temperature, description for the current day evening!
        $('#evening').html(Math.round(data.list[0].temp.eve) + '&deg;C');
        $('#main-evening').html(data.list[0].weather[0].main);
        
        //Connected elements: air temperature, description for the current day night!
        $('#night').html(Math.round(data.list[0].temp.night) + '&deg;C');
        $('#main-night').html(data.list[0].weather[0].main);
        
        var date = new Date();
        
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        
        var weatherForDay = '';
        var weatherContainer = $('#weather-container');
        
        for(var i = 1; i < data.list.length; i++) {
            
            date.setDate(date.getDate() + 1);
    
            weatherForDay += '<div>' +
                '<h1 class="day-week">' + getDayNameByNumber(date.getDay()) + '</h1>' +
                '<h2 class="month-dat"> ' + monthNames[date.getMonth()] + '&nbsp;' + date.getDate() + '</h2>' +
                '<div id="iconWeek">' + ('<img src="http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png" alt="Icon afternoon" title="' + data.list[1].weather[0].description + '" >') +'</div>' +
                '<span>' + Math.round(data.list[i].temp.min) + '&deg;C &nbsp;' + Math.round(data.list[i].temp.max) + '&deg;C</span>' +
                '<div id="main-week">' + (data.list[i].weather[0].main) +'</div>' +
                '<a href="/vasylyna199377/weather/page2.html">More</a>' +
            '</div>';
        }
        weatherContainer.html(weatherForDay);
    };

    function getDayNameByNumber(numberOfDay) {
        var days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

        return days[numberOfDay];
    }

    var functionError = function (msg) {
        $('#error').html('An error has occurred: ' + msg);
    };
    
    getWeatherByCity('eng', functionOk, functionError, 'Lviv');
    
})
