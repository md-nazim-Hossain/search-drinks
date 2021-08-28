const clearData = (id) =>{
    const clearData = document.getElementById(id);
    const clear = clearData.textContent = '';
    return clear;
}


const search = () =>{
    const inputFiled = document.getElementById('input-field');
    const errorMessage = document.getElementById('error-message');

    const inputValue = inputFiled.value;
    if(inputValue.length == 0){
        clearData('cant-find');
        clearData('load-spinner');
        errorMessage.innerText = 'Please Write Some Items Name';
    }
    else{
        document.getElementById('details-item').textContent = '';
        errorMessage.textContent = '';
        getItemsSearch(inputValue);
    }
    inputFiled.value = '';
    
}
const getItemsSearch = itemName =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${itemName}`;
    fetch(url)
    .then(res => res.json())
    .then(items => displayAPi(items));
}
const displayAPi = items =>{
    // console.log(items)
    const itemsPosition = items.drinks;
    const showItems = document.getElementById('show-items');
    const loadSpinner = document.getElementById('load-spinner');

    // data clear from contents
    clearData('cant-find');
    showItems.textContent = '';

    if(itemsPosition == null){
        loadSpinner.innerHTML = `
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;
        setTimeout(function(){
            clearData('load-spinner')
            document.getElementById('cant-find').innerText = `Items Not Found`;
        },3000) ;   
    }
    else{
        loadSpinner.innerHTML = `
        <div class="text-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
        `;
        itemsPosition.forEach(item => {
        setTimeout(function(){
            clearData('load-spinner');
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
                <div class="card h-100">
                    <a href="#details-item"><img onclick="itemDetails('${item.idDrink}')" src="${item.strDrinkThumb}" class="card-img-top" alt="..."></a>
                    <div class="card-body">
                        <h5 class="card-title">${item.strDrink}</h5>
                        <p class="card-text">${item.strInstructions.slice(0,100)}</p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted pt-5">Click Image For More Details</small>
                    </div>
                </div>
            `;
            showItems.appendChild(div);
        },3000);
        });
    }
}

const itemDetails = itemId =>{
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`
    fetch(url)
    .then(res => res.json())
    .then(id => displayDetails(id));
}

const displayDetails = itemId =>{
    const drinksId = itemId.drinks[0];
    const detailsItem = document.getElementById('details-item');
    detailsItem.textContent = "";
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="card h-100">
            <img src="${drinksId.strDrinkThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center"> ${drinksId.strDrink}</h5>
                <h5 class="card-title text-center">Drink Id: ${drinksId.idDrink}</h5>
                <h5 class="card-title text-center">Category: ${drinksId.strCategory}</h5>
                <h5 class="card-title text-center">Alcoholic: ${drinksId.strAlcoholic}</h5>
                <p class="card-text">${drinksId.strInstructions}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted text-center">Last Modified: ${drinksId.dateModified}</small>
            </div>
        </div>
    `;
    detailsItem.appendChild(div);
}

