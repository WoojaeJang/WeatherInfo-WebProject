// select 태그 불러오기
const citySelect = document.querySelector('.city-select');

// 배경 및 이미지 관련 태그 불러오기
const descriptionIcon = document.querySelector('#bg2');

citySelect.addEventListener('change', () => {

    const selectedIndex = citySelect.selectedIndex;
    let selectedCity = citySelect.options[selectedIndex].value;

    if (selectedCity === 'unselected') {
        location.reload();
    }

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
            let divBgTag = document.getElementById("div-bg")
            divBgTag.setAttribute('class', 'full-bg')
            divBgTag.setAttribute('style', 'left: 0px; top: 0px; overflow: hidden; margin: 0px; padding: 0px; height: 100%; width: 100%; z-index: -999999; position: fixed;')
            
            let divBgItemTag = document.getElementById("div-bg-item")
            divBgItemTag.setAttribute('class', 'full-bg-item')
            divBgItemTag.setAttribute('style', 'position: absolute; margin: 0px; padding: 0px; border: none; width: 100%; height: 100%; z-index: -999999;')
            
            let imgTag = document.getElementById("bgImg")
            let imageName = '맑음'

            let weather = data.weather[0]['main']; // JSON 파일에서 해당 도시의 weather 받아오기

            if (weather === 'Clouds') {
                descriptionIcon.classList.add('fas', 'fa-cloud-sun', 'fa-5x');
                imageName = '구름';
            } else if (weather === 'Clear') {
                descriptionIcon.classList.add('fas', 'fa-sun', 'fa-5x');
                imageName = '맑음';
            } else if (weather === 'Mist') {
                descriptionIcon.classList.add('fas', 'fa-bolt', 'fa-5x');
                imageName = '안개';
            } else if (weather === 'Rain') {
                descriptionIcon.classList.add('fas', 'fa-umbrella', 'fa-5x');
                imageName = '비';
            } else if (weather === 'Snow') {
                descriptionIcon.classList.add('fas', 'fa-snowflake', 'fa-5x');
                imageName = '눈';
            } else if (weather === 'Atmosphere') {
                descriptionIcon.classList.add('fas', 'fa-smog', 'fa-5x');
                imageName = '구름';
            } else {
                descriptionIcon.classList.add('fas', 'fa-cloud', 'fa-5x');
                imageName = '맑음';
            }

            let imageUrl = './../img/' + imageName + '.jpg';
            imgTag.setAttribute('alt', '')
            imgTag.setAttribute('src', imageUrl);
            divBgItemTag.appendChild(imgTag);    
            
            
        }

        // 함수 실행
        changeBackGroundPicture(data);  
        
        
        const getRatio = function (callback) {
            
            const wr = window.innerWidth/window.innerHeight;
            let img = new Image();
            img.src = document.getElementById("bgImg").getAttribute('src');
            const ir = img.width/img.height;
    
            const myRatio = wr/ir;
            
            callback(myRatio)
        };
    
        getRatio( (data) => {
            let imgTag = document.getElementById("bgImg")
            let bgTrans = document.getElementById("bgTrans");
            if (data > 1) {
                imgTag.setAttribute('class', 'bg-img-big');
                bgTrans.setAttribute('class', 'bg-trans-big');
            } else {
                imgTag.setAttribute('class', 'bg-img-small');
                bgTrans.setAttribute('class', 'bg-trans-small');
            }
        });


    });


});

window.addEventListener('resize', () => {
    
    const resizeWeb = function() {
        const selectedIndex = citySelect.selectedIndex;
        let selectedCity = citySelect.options[selectedIndex].value;

        if (selectedCity != 'unselected'){
            
            let wr = window.innerWidth/window.innerHeight;
            
            let img = new Image();
            img.src = document.getElementById("bgImg").getAttribute('src');
            let ir = img.width/img.height;
        
            let imgTag = document.getElementById("bgImg");
            let bgTrans = document.getElementById("bgTrans");
        
            if (wr > ir) {
                imgTag.className = 'bg-img-big';
                bgTrans.className = 'bg-trans-big';
            } else {
                imgTag.className = 'bg-img-small';
                bgTrans.className = 'bg-trans-small';
            }
        }
    };

    resizeWeb();

});


// 시간
var TargetDay = document.getElementById("currentDayValue");
var TargetTime = document.getElementById("currentTimeValue");

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

