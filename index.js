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
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        card += `<div class="result">
                <img src="${data[i]["strCategoryThumb"]}" alt="" class="resultImg">
                <h2 class="resultTitle">${data[i]["strCategory"]}</h2>
            </div>`;
      }
      $(".results").append(card);
    })
    .catch((err) => console.error(err));
}

results();

async function searchResults(query) {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${query}`;
  let card = "";
  let loader = document.getElementById("loader");
  loader.style.display = "block";

  let response = await axios
    .get(url)
    .then((res) => {
      loader.style.display = "none";
      $("#categoryHeading").css("display", "none");

      data = res.data.meals;
      console.log(data);
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

searchButton.onclick = () => {
  if (inputValue == "") {
    alert("Please enter a category!");
    results();
  } else {
    searchResults(searchInput.value);
  }
};
searchInput.addEventListener("input", function (event) {
  inputValue = event.target.value;
  searchResults(inputValue);
});

searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    inputValue = event.target.value;
    searchResults(inputValue);
  }
});
