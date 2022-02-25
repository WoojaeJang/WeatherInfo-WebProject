// select 태그 불러오기
const citySelect = document.querySelector('.city-select');

// 배경 및 이미지 관련 태그 불러오기
const html = document.querySelector('#bg1');
const descriptionIcon = document.querySelector('#bg2');

citySelect.addEventListener('change', () => {

    const selectedIndex = citySelect.selectedIndex;
    let selectedCity = citySelect.options[selectedIndex].value;
    const frontURI = "http://api.openweathermap.org/data/2.5/weather?q=";
    const backURI = "&appid=";
    let appid = "4db58425e72adb13e8a66add8c65143e"; // dotenv
    let tempType = "&units=metric" // 미국 API의 화씨 온도를 섭씨 온도로 변경

    let apiURI = frontURI + selectedCity + backURI + appid + tempType;

    const getWeather = function (url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                callback(xhr.response)
            }
        }
        xhr.send();
    };

    getWeather(apiURI, (data) => {
        const currentTemp = data.main.temp;
        const currentHum = data.main.humidity;
        const maxTemp = data.main.temp_max;
        const minTemp = data.main.temp_min;
        const weatherDescription = data.weather[0].description; //날씨에 대한 상세한 설명
        const weatherImage = data.weather[0].icon;
        const windSpeed = data.wind.speed;
        const windDegree = data.wind.deg
        const country = data.sys.country;   // 나라이름이 영문으로 출력
        const visibility = data.visibility; // 가시거리가 모두 다 동일하게 측정되어 제거
        const latitude = data.coord.lat;
        const longitude = data.coord.lon;
        const name = data.name;
        const clouds = (data.clouds.all) + "%";
        const feelsLikeTemp = data.main.feels_like

        if (windDegree >= 22.5 && windDegree < 67.5) { //불러온 windDegree가 360° 기준으로 설정되어 있어 8방향계로 설정
            windDegree1 = "북동풍"
        } else if (windDegree >= 67.5 && windDegree < 112.5) {
            windDegree1 = "동풍"
        } else if (windDegree >= 112.5 && windDegree < 157.5) {
            windDegree1 = "남동풍"
        } else if (windDegree >= 157.5 && windDegree < 202.5) {
            windDegree1 = "남풍"
        } else if (windDegree >= 202.5 && windDegree < 247.5) {
            windDegree1 = "남서풍"
        } else if (windDegree >= 247.5 && windDegree < 292.5) {
            windDegree1 = "서풍"
        } else if (windDegree >= 292.5 && windDegree < 337.5) {
            windDegree1 = "북서풍"
        } else {
            windDegree1 = "북풍"
        }

        const currentTempValue = document.querySelector('.currentTempValue');
        const maxMinTempValue = document.querySelector('.maxMinTempValue'); // 하루의 최고 기온, 최저 기온이 X
        const humidityValue = document.querySelector('.humidityValue');
        const windValue = document.querySelector('.windValue');
        const cloudsValue = document.querySelector('.cloudsValue');
        const visibilityValue = document.querySelector('.visibilityValue'); // 가시거리 
        const lonLatValue = document.querySelector('.lonLatValue');
        const feelsLikeTempValue = document.querySelector('.feelsLikeTempValue');
        const weatherDescriptionValue = document.querySelector('.weatherDescriptionValue');

        currentTempValue.textContent = currentTemp + "℃";
        maxMinTempValue.textContent = maxTemp + "℃   /   " + minTemp + "℃";
        humidityValue.textContent = currentHum + "%";
        windValue.textContent = windDegree1 + "   /   " + windSpeed + "m/s";
        cloudsValue.textContent = clouds;
        lonLatValue.textContent = longitude + "°   /   " + latitude + "°";
        feelsLikeTempValue.textContent = feelsLikeTemp + "℃";
        weatherDescriptionValue.textContent = weatherDescription; // 영어로 출력, 한글로 
        visibilityValue.textContent = visibility / 1000 + "km"; // 최대치가 10km, 더 높은 경우 모두 10km로 처리

        // 배경 변경
        function changeBackGroundPicture(data) {
            let weather = data.weather[0]['main']; // JSON 파일에서 해당 도시의 weather 받아오기
            // console.log(weather);
            html.classList.remove(...html.classList);   
            descriptionIcon.classList.remove(...descriptionIcon.classList); 

            if (weather === 'Clouds') {
                descriptionIcon.classList.add('fas', 'fa-cloud-sun', 'fa-5x');  // 날씨의 이미지
                html.classList.add('weather-clouds');   // 배경이미지의 CSS파일
            } else if (weather === 'Clear') {
                descriptionIcon.classList.add('fas', 'fa-sun', 'fa-5x');
                html.classList.add('weather-clear');
            } else if (weather === 'Mist') {
                descriptionIcon.classList.add('fas', 'fa-bolt', 'fa-5x');
                html.classList.add('weather-mist');
            } else if (weather === 'Rain') {
                descriptionIcon.classList.add('fas', 'fa-umbrella', 'fa-5x');
                html.classList.add('weather-rain');
            } else if (weather === 'Snow') {
                descriptionIcon.classList.add('fas', 'fa-snowflake', 'fa-5x');
                html.classList.add('weather-snow');
            } else if (weather === 'Atmosphere') {
                descriptionIcon.classList.add('fas', 'fa-smog', 'fa-5x');
                html.classList.add('weather-clouds');
            } else {
                descriptionIcon.classList.add('fas', 'fa-cloud', 'fa-5x');
                html.classList.add('weather-default');
            }
        }

        // 함수 실행
        changeBackGroundPicture(data);  

    });
});


// 시간
var TargetDay = document.getElementById("currentDayValue");
var TargetTime = document.getElementById("currentTimeValue");
// console.log(Target);
function clock() {
    var time = new Date();

    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var year = time.getFullYear();
    var week = ['일', '월', '화', '수', '목', '금', '토'];

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    TargetDay.innerText = `${year}년 ${month + 1}월 ${date}일 ${week[day]}요일 `;
    TargetTime.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;

}
clock();
setInterval(clock, 1000); // 1초마다 실행

