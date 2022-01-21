const wrapper = document.querySelector(".wrapper"),
weatherPart = document.querySelector(".weather-part"),
inputPart = document.querySelector(".input-part"),
infoText = document.querySelector(".infotext"),
inputField = document.querySelector("input"),
btn = document.querySelector("button"),
images = document.querySelector("img"),
arrow = document.querySelector("header i");

console.log(wrapper)
console.log(weatherPart)
console.log(inputPart)
console.log(infoText)
console.log(inputField)
console.log(btn)
console.log(images)
console.log(arrow)

let api;


inputField.addEventListener("keyup",e =>{
    if(e.key == "Enter" && inputField.value != "")
    {
        requestApi(inputField.value)
    }
})

btn.addEventListener("click",() => {
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(onSuccess , onError)
    }
    else{
        alert("your browser does not support geolocation api");
    }
})



function requestApi(city)
{
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=4d1162a5d3f65e5c29b17a9af447f52d`;
    fetchData()
}


function onSuccess(position){
    const {latitude,longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=4d1162a5d3f65e5c29b17a9af447f52d`;
    fetchData()
}
//4d1162a5d3f65e5c29b17a9af447f52d
function onError(){
    infoText.innerText = error.message;
    infoText.classList.add("error")
    
}

function fetchData(){
    infoText.innerText = "getting weather details...";
    infoText.classList.add("pending");
    
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(()=>{
        console.log(inputField.value)
        infoText.innerText = "Something went wrong";
        infoText.classList.replace('pending',"error")

    })
}


function weatherDetails(info)
{
    if(info.cod == "404")
    {
        infoText.classList.replace("pending","error");
        infoText.innerText = `${inputField.value} isn't a valid city name`
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description,id} = info.weather[0];
        const {temp,feels_like,humidity} = info.main;

        if(id == 800)
        {
            images.src = "https://cdn-icons-png.flaticon.com/512/6581/6581533.png"
        }
        else if(id >=200 && id <= 232)
        {
            images.src = "https://cdn-icons.flaticon.com/png/512/2864/premium/2864403.png?token=exp=1642751918~hmac=6d2e667defe3d3b85050f4881617a78d"
        }
        else if(id >=600 && id <= 622)
        {
            images.src = "https://cdn-icons.flaticon.com/png/512/2315/premium/2315377.png?token=exp=1642751975~hmac=939869ae211a8c7f1f1b03e97f525a60"
        }
        else if(id >=701 && id <= 781)
        {
            images.src = "https://cdn-icons-png.flaticon.com/512/1779/1779862.png"
        }
        else if(id >= 801 && id <= 804)
        {
            images.src = "https://cdn-icons.flaticon.com/png/512/3093/premium/3093390.png?token=exp=1642752079~hmac=43b76cb1fdc94b4a07089ff487ae503c"
        }
        else if((id >= 500 && id <= 531) || (id >=300 && id<= 321))
        {
            images.src = "https://cdn-icons-png.flaticon.com/512/1146/1146858.png"
        }

        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city} , ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`

        infoText.classList.remove("pending","error");
        infoText.innerText= "";
        inputField.value = "";
        wrapper.classList.add("active")
    }

}

arrow.addEventListener("click",()=>{
    wrapper.classList.remove("active")
})