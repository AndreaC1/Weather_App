
let savedLocations = [];
let saveClicked = false;
let selectLocation;
let option;
let para;


class SelectedAreas {
    constructor() {

    }


    addArea(weatherLocation) {
        savedLocations.push(weatherLocation)
    }

    removeArea(weatherLocation) {
        savedLocations = savedLocations.filter((weatherLocation) => {
            return savedLocations != weatherLocation;
        })
    }
}

const locationInput = document.querySelector("#location");
const form = document.querySelector("#form");
const area = new SelectedAreas(locationInput);

function fetchWeather(input) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=754f462c0006b39c60036e9eaeb1fae2&units=imperial`)
        .then((response) => {
            return response.json();

        })
        .then((parsedData) => {
            let data = parsedData[0];
            let lattitude = data.lat;
            let longitude = data.lon
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lattitude}&lon=${longitude}&appid=754f462c0006b39c60036e9eaeb1fae2&units=imperial`)
                .then((response) => {
                    return response.json();
                })

                .then((parsedData2) => {
                    para = document.createElement("p");
                    let weather = parsedData2.weather[0];
                    let description = weather.main
                    para.textContent = `Temp in ${parsedData2.name}: ${parsedData2.main.temp} deg F, ${description}`;
                    document.body.append(para);
                    fetch((`https://api.giphy.com/v1/gifs/translate?apiKey=HjTm6SNTrffuPdwrfl7ZWXC0CcrZNZwe&s=${description}`))
                        .then((response) => {
                            return response.json();
                        })
                        .then((res) => {
                            let image = document.createElement("img");
                            image.src = res.data.images.original.url;
                            let imageContainer = document.createElement("div")
                            imageContainer.id = "imageContainer"
                            document.body.append(imageContainer);
                            imageContainer.append(image);
                        })

                })
        })
        .catch((err) => {
            console.log(err);
        })
}

form.addEventListener("submit", (event) => {
    fetchWeather(locationInput.value);
    const container = document.createElement("div")
    document.body.append(container);
    const saveButton = document.createElement("button");
    saveButton.innerHTML = "Save";
    saveButton.id = "saveBtn"
    container.append(saveButton);
    const clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear";
    clearButton.id = "clearBtn"
    container.append(clearButton);
    let removeClearButton = document.getElementById("clearBtn");
    let removeSaveButton= document.getElementById("saveBtn");
    clearButton.addEventListener("click", () => {

        let clearImage = document.getElementById("imageContainer")
        clearImage.parentNode.removeChild(clearImage);
        para.textContent = " ";
        removeSaveButton.parentNode.removeChild(removeSaveButton);
        removeClearButton.parentNode.removeChild(removeClearButton);
        const input = document.querySelector("#location");
        input.value = " ";
    })
    saveButton.addEventListener("click", () => {
        area.addArea(locationInput.value);
        if (saveClicked === true) {
            clearContainer = document.getElementById("container2")
            clearContainer.parentNode.removeChild(clearContainer);
        }
        let clearImage2 = document.getElementById("imageContainer");
        selectLocation = document.createElement("select");
        selectLocation.id = "selectLoc"
        selectLocation.multiple = true;
        const container2 = document.createElement("div");
        container2.id = "container2"
        document.body.append(container2);
        container2.append(selectLocation);
        saveClicked = true;
        clearImage2.parentNode.removeChild(clearImage2)
        removeClearButton.parentNode.removeChild(removeClearButton);

        for (let i = 0; i < savedLocations.length; i++) {
            option = document.createElement("option");
            option.value = savedLocations[i];
            option.text = savedLocations[i];
            selectLocation.append(option);
        }
        const input = document.querySelector("#location");
        input.value = " ";
        removeSaveButton.parentNode.removeChild(removeSaveButton);
        para.textContent = " ";
        const refetchButton = document.createElement("button");
        refetchButton.innerHTML = "Fetch Weather";
        refetchButton.id = "FetchBtn"
        container2.append(refetchButton);

        refetchButton.addEventListener("click", () => {
            fetchWeather(option.value)
            const clearButton2 = document.createElement("button");
            clearButton2.innerHTML = "Clear";
            clearButton2.id = "clearBtn2"
            const clearAgain = document.createElement("div")
            document.body.append(clearAgain)
            clearAgain.append(clearButton2)

            clearButton2.addEventListener("click", () => {

                let clearImage3 = document.getElementById("imageContainer");
                clearImage3.parentNode.removeChild(clearImage3);
                para.textContent = " ";
                let buttonClear = document.getElementById("clearBtn2");
                buttonClear.parentNode.removeChild(buttonClear);
                const input = document.querySelector("#location");
                input.value = " ";
                para2.textContent = " ";
            })

            let para2 = document.createElement("p");
            let timestamp = new Date().toISOString();
            para2.textContent = timestamp;
            document.body.append(para2);

        })
        const removeButton = document.createElement("button");
        removeButton.innerHTML = "Remove";
        refetchButton.id = "RemoveBtn"
        container2.append(removeButton);
        removeButton.addEventListener("click", () => {
            area.removeArea(option.value)
            let selectionChange = document.getElementById("selectLoc");
            selectionChange.remove(option.value);
        })

    })
    event.preventDefault();
})


