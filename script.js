function searchRecipes() {
    let query = document.getElementById("searchBox").value;
    let recipeContainer = document.getElementById("recipeContainer");
    recipeContainer.innerHTML = ""; 

    if (!query) {
        alert("Please enter a recipe name!");
        return;
    }

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            if (data.meals) {
                data.meals.forEach(meal => {
                    let recipeDiv = document.createElement("div");
                    recipeDiv.classList.add("recipe");

                    recipeDiv.innerHTML = `
                        <h3>${meal.strMeal}</h3>
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <p><strong>Category:</strong> ${meal.strCategory}</p>
                        <p><strong>Area:</strong> ${meal.strArea}</p>
                        <p><strong>Recipe:</strong> ${meal.strInstructions}</p>
                        <a href='${meal.strYoutube}'><strong>Youtube Tutorial</strong></a>
                          
                    `
                    console.log(data["meals"][0]["strInstructions"])
                    console.log(data["meals"][0]["strYoutube"])
                    ;

                    recipeContainer.appendChild(recipeDiv);
                });
            } else {
                recipeContainer.innerHTML = "<p>No recipes found.</p>";
            }
        })
        .catch(error => console.log("Error fetching recipes:", error));
}
