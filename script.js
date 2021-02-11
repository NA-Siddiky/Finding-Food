const searchButton = document.getElementById("search-button");
const showItem = document.getElementById("item")

function getMealItem() {
    let searchItem = document.getElementById('search-input').value;

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showItem.innerHTML = ''
            data.meals.forEach(item => {
                const foodItem = `       
                <div class = "meal-item w-25" onclick = "foodDetails(${item.idMeal})">
                    <div class="meal-img">
                        <img src="${item.strMealThumb}" alt="meal">
                    </div>
                    <div class="meal-name">
                        <h3>${item.strMeal}</h3>
                    </div>
                </div>
                `
                // showItem.append(foodItem.join(''));
                // showItem.innerHTML= foodItem
                showItem.insertAdjacentHTML('beforeend', foodItem);
            });
        });
    searchButtonAction();
}

const showItemDetails = document.getElementById('food-details')

const foodDetails = idMeal => {
    // console.log(idMeal);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
        .then(response => response.json())
        .then(data => displayFoodDetails(data.meals[0]));
}

const displayFoodDetails = (singleItem) => {
    // const ingredientsList = data.meals[0];
    const newIngredientsList = [];
    for (let i = 5; i <= 15; i++) {
        if (singleItem[`strIngredient${i}`]) {
            newIngredientsList.push(
                `<li class="list-group-item">• ${singleItem[`strMeasure${i}`]} ${singleItem[`strIngredient${i}`]
                }</li>`
            );
        }
    }

    const singleItemViewer = `
            <div class="card" style="width: 18rem;">
                <img src="${singleItem.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${singleItem.strMeal}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    ${newIngredientsList.join('')}
                </ul>
                <div class="card-body">
                    <a href="#" class="card-link">Card link</a>
                    <a href="#" class="card-link">Another link</a>
                </div>
            </div>
    `
    showItemDetails.innerHTML = singleItemViewer
}

const searchButtonAction = () => {
    showItemDetails.innerHTML = '';
}