// Random Food Generator

async function randomFood() {
  url = "https://www.themealdb.com/api/json/v1/1/random.php";
  let neededData = [];
  let response = await axios
    .get(url)
    .then((res) => {
      //   Adding the Image and name to HTML

      neededData.push(res.data.meals[0]);
      let randomName = neededData[0]["strMeal"];
      let randomImg = neededData[0]["strMealThumb"];

      $("#randomDishImg").attr("src", randomImg);
      $("#randomDishName").html(randomName);

      // Adding ingredients and tutorial to youtube
      let ingredients = document.getElementById("ingredients");
      let tutorial = neededData[0]["strYoutube"];
      $("#tutorial").attr("href", tutorial);

      for (let i = 1; i < 21; i++) {
        if (neededData[0]["strIngredient" + [i]].trim() != "") {
          ingredients.innerHTML += `<li>${
            neededData[0]["strIngredient" + [i]]
          }</li>`;
        }
      }
    })

    .catch((err) => console.error(err));
}

randomFood();

// Default Category

async function results(
  url = "https://www.themealdb.com/api/json/v1/1/categories.php"
) {
  let card = "";
  let loader = document.getElementById("loader");
  loader.style.display = "block";
  let response = await axios

    .get(url)
    .then((res) => {
      loader.style.display = "none";

      data = res.data.categories;
      for (let i = 0; i < data.length; i++) {
        card += `<div class="result" onclick="getCat(this)">
                <img src="${data[i]["strCategoryThumb"]}" alt="" class="resultImg">
                <h2 class="resultTitle">${data[i]["strCategory"]}</h2>
            </div>`;
      }
      $(".results").html("");
      $(".results").append(card);
    })
    .catch((err) => console.error(err));
}

results();

// Category Search Result

async function searchResults(query) {
  inputValue = query;
  navigator();
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
  let card = "";
  let loader = document.getElementById("loader");
  loader.style.display = "block";
  closeButton.style.display = "inline";

  let response = await axios
    .get(url)
    .then((res) => {
      loader.style.display = "none";
      $("#categoryHeading").html(inputValue);

      data = res.data.meals;
      for (let i = 0; i < data.length; i++) {
        card += `<div class="Meal">
                <img src="${data[i]["strMealThumb"]}" alt="" class="mealImg">
                <h2 class="mealTitle">${data[i]["strMeal"]}</h2>
            </div>`;
      }

      $(".results").html("");
      $(".results").append(card);
    })
    .catch((err) => console.error(err));
}

// Input Function

var searchInput = document.getElementById("search");
var inputValue = "";
var searchButton = document.getElementById("searchIcon");
var closeButton = document.getElementById("closeButton");

// Using search button
searchButton.onclick = () => {
  if (searchInput.value == "") {
    results();
    alert("Please enter a category!");
  } else {
    inputValue = searchInput.value;
    $("#categoryHeading").html(inputValue);
    closeButton.style.display = "inline";
    searchResults(searchInput.value);
    console.log(searchInput.value);
  }
};
searchInput.addEventListener("input", function (event) {
  inputValue = event.target.value;

  if (searchInput.value == "") {
    closeButton.style.display = "none";
  } else {
    searchResults(searchInput.value);
    closeButton.style.display = "inline";
  }
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    searchResults(inputValue);
  }
});

// Click function in available categories
function getCat(element) {
  var mealTitle = element.querySelector(".resultTitle").innerText;
  inputValue = mealTitle;
  searchResults(inputValue);
  closeButton.style.display = "inline";
}

// Close Function

function closeCategory() {
  results();
  closeButton.style.display = "none";
  inputValue = "";
  $("#categoryHeading").html("AVAILABLE CATEGORIES");
}

// Smooth Navigation

function navigator() {
  let resultDiv = document.getElementById("resultsDiv");
  resultDiv.scrollIntoView({ behavior: "smooth" });
}
