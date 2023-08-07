const init = () => {
    // Load Content

    function render(data) {
        for (let i=0; i<data.length; i++) {
            const div = document.createElement("div")
            const p1 = document.createElement("p")
            const p2 = document.createElement("p")
            const p3 = document.createElement("p")
            p1.textContent = data[i].name;
            p1.style.color = "red"
            p2.textContent = data[i].age;
            p3.textContent = data[i].description;
            div.append(p1, p2, p3)
            monstersDiv.append(div)
        }
    }

    let offset = 1

    function loadContent() {
        monstersDiv.innerHTML = "";

        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${offset}`, {
        method: "GET"
    })
    .then((response)=> response.json())
    .then(data => render(data))
    .catch((error) => {
        console.error("Error fetching data:", error);
      });

      offset++
      console.log(offset)
    }

    loadContent()

    forward = document.getElementById("forward")
    forward.addEventListener("click", loadContent)
}

document.addEventListener("DOMContentLoaded", init);

// Form Creation

const monstersDiv = document.getElementById("monster-container")

    const formDiv = document.getElementById("create-monster");

    const formElement = document.createElement("form")

    const nameInput = document.createElement('input')
    nameInput.setAttribute("type", "text")
    nameInput.setAttribute("name", "name")
    nameLabel = document.createElement("label")
    nameLabel.innerText = "Name: "
    nameLabel.setAttribute("for", "name")

    const ageInput = document.createElement('input')
    ageInput.setAttribute("type", "text")
    ageInput.setAttribute("name", "age")
    ageLabel = document.createElement("label")
    ageLabel.innerText = "Age: "
    ageLabel.setAttribute("for", "age")

    const descriptionInput = document.createElement('input')
    descriptionInput.setAttribute("type", "text")
    descriptionInput.setAttribute("name", "description")
    descriptionLabel = document.createElement("label")
    descriptionLabel.innerText = "Description: "
    descriptionLabel.setAttribute("for", "description")

    const submitButton = document.createElement("input")
    submitButton.setAttribute("type", "submit")

    formElement.append(nameLabel, nameInput, ageLabel, ageInput, descriptionLabel, descriptionInput, submitButton)
    formDiv.append(formElement)

// Add Content to Database

formElement.addEventListener("submit", function(event) {
    const string1 = event.target.name.value
    const number = event.target.age.value
    const string2 = event.target.description.value

    event.preventDefault()
    fetch("http://localhost:3000/monsters", {
    method: "POST",
    headers:{
        "Content-Type": "application/json",
        Accept: "application/json"
    },
    body: JSON.stringify({
        name: string1,
        age: number,
        description: string2
    })
})
})
