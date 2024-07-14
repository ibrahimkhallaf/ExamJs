let rowDataMeals = document.getElementById("rowDataMeals");
let Details_row  = document.getElementById("Details_row");
function OpenNav(){
    $(".toggel-icon").removeClass("fa-bars");
    $(".toggel-icon").addClass("fa-xmark");
    $(".side-nav").animate({
        left:0
    },1000)
    for(let i=0 ; i<5; i++){
      $(".links .list-unstyled li").eq(i).animate({top:0},1100+(i*100));
    }
}
function CloseNav(){
    let hidePart = $(".side-nav .nav-main ").outerWidth();
        $(".side-nav").animate({
            left:-hidePart
        },1000)
        $(".toggel-icon").removeClass("fa-xmark");
        $(".toggel-icon").addClass("fa-bars");
        let liHeight = $(".links").outerHeight()
        $(".links .list-unstyled li").animate({
            top:liHeight
        },500)
}
CloseNav();
$(".side-nav .toggel-icon").on('click',function(){
    if($(".side-nav").css("left")=="0px"){
        CloseNav();
    }else{
       OpenNav();
    }
});

async function SearchByName(Name){
    $(".loading").removeClass("d-none");
    $("#main-section").removeClass("d-none");
    $("#formSec").addClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`);
    let data = await response.json();
    data.meals ? DisplayMeals(data.meals) : DisplayMeals([]);
    $(".loading").addClass("d-none");
};
async function SearchFirstLater(later){
    if(later){
        $(".loading").removeClass("d-none");
    $("#main-section").removeClass("d-none");
    $("#formSec").addClass("d-none");
        rowDataMeals.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${later}`);
        let data = await response.json();
        $(".loading").addClass("d-none");
        DisplayMeals(data.meals);
    }else{
        rowDataMeals.innerHTML = "";
    }

    
};
function DisplayMeals(Meals){
    $("#main-section").removeClass("d-none");
    $("#formSec").addClass("d-none");
    rowDataMeals.innerHTML = "";
    let cartona ='';
    for(let i = 0 ; i < Meals.length ; i++){
        cartona += `
            <div onclick="GetDetails(${Meals[i].idMealٍ})" class="col position-relative col-meal overflow-hidden">
                <div class="col-img w-100 rounded-3 position-relative rounded-2 ">
                    <img src="${Meals[i].strMealThumb}" class="w-100 " alt="meal-photo">
                    <div class="col-layer d-flex align-items-center">
                        <h2 class="ms-2">${Meals[i].strMeal}</h2>
                    </div>
                </div> 
            </div>`
    }
    rowDataMeals.innerHTML = cartona;
};
SearchByName("");

// categories
async function GetAllCategories(){
    $(".inputsCont").html('');
    $("#main-section").removeClass("d-none");
    $("#formSec").addClass("d-none");
    $(".loading").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data = await response.json();
    $(".loading").addClass("d-none");
    displayCategories(data.categories.slice(0, 20));
};
function displayCategories(categories){
    rowDataMeals.innerHTML = "";
    let cartona ='';
    for(let i = 0 ; i < categories.length ; i++){
        cartona += `
            <div class="col position-relative col-meal overflow-hidden cursor-pointer" onclick="getMealByCategory('${categories[i].strCategory}')" >
                <div class="col-img w-100 rounded-3 position-relative rounded-2 ">
                    <img src="${categories[i].strCategoryThumb}" class="w-100 " alt="meal-photo">
                    <div class="col-layer">
                        <h2 class="ms-2 text-center">${categories[i].strCategory}</h2>
                        <p class="text-center">${categories[i].strCategoryDescription}</p>
                    </div>
                </div> 
            </div>`
    }
    rowDataMeals.innerHTML = cartona;
}

async function getMealByCategory(cat){
    $(".inputsCont").html('');
    $("#main-section").removeClass("d-none");
    $("#formSec").addClass("d-none");
    $(".loading").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
    let data = await response.json();
    $(".loading").addClass("d-none");
    DisplayMeals(data.meals.slice(0, 20))
};


//Area
async function GetAllArea(){
    $(".inputsCont").html('');
    $("#main-section").removeClass("d-none");
    $(".loading").removeClass("d-none");
    $("#formSec").addClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data = await response.json();
    $(".loading").addClass("d-none");

    displayArea(data.meals.slice(0, 20));
};
function displayArea(Area){
    rowDataMeals.innerHTML = "";
    let cartona ='';
    for(let i = 0 ; i < Area.length ; i++){
        cartona += `
            <div class="col position-relative col-meal overflow-hidden" onclick="getMealByArea('${Area[i].strArea}')" >
                <div class="col-img w-100 text-center py-3 ">
                    <i class="fa-solid fa-house-laptop fa-5x"></i>
                    <h2 class="ms-2 text-center">${Area[i].strArea}</h2>
                </div> 
            </div>`
    }
    rowDataMeals.innerHTML = cartona;
}

async function getMealByArea(Area){
    $(".inputsCont").html('');
    $("#main-section").removeClass("d-none");
    $("#formSec").addClass("d-none");

    $(".loading").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Area}`);
    let data = await response.json();
    $(".loading").addClass("d-none");
    DisplayMeals(data.meals.slice(0, 20))
};

//Ingredients
async function GetAllIngredients(){
    $(".inputsCont").html('');
    $("#main-section").removeClass("d-none");
    $(".loading").removeClass("d-none");
    $("#formSec").addClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data = await response.json();
    $(".loading").addClass("d-none");

    displayIngredients(data.meals.slice(0, 20));
};
function displayIngredients(ingreds){
    console.log(ingreds);
    $("#main-section").removeClass("d-none");
    rowDataMeals.innerHTML = "";
    let cartona ='';
    for(let i = 0 ; i < ingreds.length ; i++){
        cartona += `
            <div class="col position-relative col-meal overflow-hidden cursor-pointer "onclick="getMealByIngredients('${ingreds[i].strIngredient}')">
                <div class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h2>${ingreds[i].strIngredient}</h2>
                    ${ingreds[i].strDescription ? ingreds[i].strDescription.split(" ").slice(0,15).join(" ") : ""}
                </div>
            </div>`
    }
    rowDataMeals.innerHTML = cartona;
}

async function getMealByIngredients(ingred){
    $("#main-section").removeClass("d-none");
    $(".inputsCont").html('');
    $("#formSec").addClass("d-none");
    $(".loading").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingred}`);
    let data = await response.json();
    $(".loading").addClass("d-none");
    DisplayMeals(data.meals.slice(0, 20))
};

async function GetDetails(id){
    $(".inputsCont").html('');
    $(".loading").removeClass("d-none");
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772`);
    let data = await response.json();
    $(".loading").addClass("d-none");
    DisplayDetails(data.meals[0]);
    console.log(data.meals[0])
};

function DisplayDetails(meal){
    $("#detailSec").removeClass("d-none");
    $("#main-section").addClass("d-none");
    $("#btn-close").click(()=>{
        $("#detailSec").addClass("d-none");
        $("#main-section").removeClass("d-none");
    })

    
    let ingredientsList = '';
    for (let i = 1; i <= 20; i++) {
        let ingredient = meal[`strIngredient${i}`];
        let measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim() !== "") {
            ingredientsList += `<li class="alert alert-info m-2 p-1">${measure} ${ingredient}</li>`;
        }
    }
    let tags = meal.strTags ? meal.strTags.split(',').map(tag => `<li class="alert alert-danger m-2 p-1">${tag.trim()}</li>`).join('') : '';

    let content = `
    <div class="col-4">
                <img src="${meal.strMealThumb}" alt="Meal-photo" class="w-100 rounded-3">
                <h2>corba</h2>
             </div>
             <div class="col-8">
               <h2>Instructions</h2>
               <p>Preheat the oven to 150C/300F/Gas 2. Toss the beef and flour together in a bowl with some salt and black pepper. Heat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole. Fry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef. Return the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper. Cover with a lid and place in the oven for two hours. Remove from the oven, check the seasoning and set aside to cool. Remove the thyme. When the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6. Transfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg. Trim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through. For the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender. Drain and toss with the butter, then season with black pepper. To serve, place a large spoonful of pie onto each plate with some green beans alongside.
               </p>
               <h3>
                 Area : ${meal.strArea}
               </h3>
               <h3>
                Category : ${meal.strCategory}
              </h3>
              <h3>
                Recipes:
              </h3>
              <ul class="recipesUl d-flex list-unstyled flex-wrap g-3">
                ${ingredientsList}
              </ul>
              <h3 class="py-1">
                Tages:
              </h3>
              <ul class="recipesUl d-flex list-unstyled flex-wrap g-3 py-1">
                ${tags}
              </ul>
               <a class="btn btn-success" target="_blank" href="${meal.strSource}">Source</a>
               <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">Youtube</a>
             </div>`
             Details_row.innerHTML = content;
}

function SearchInput(){
    $("#main-section").removeClass("d-none");
    rowDataMeals.innerHTML = '';
    $(".inputsCont").html(
        `<div class="row row-col-md-2 py-5" id="inputs">
            <div class="col">
                <div class="mb-3">
                    <input type="text" onkeyup="SearchByName(this.value)" class="form-control text-white bg-transparent" id="exampleInputEmail1" placeholder="Search By Name">
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <input type="text" onkeyup="SearchFirstLater(this.value)" maxlength=1 class="form-control  text-white bg-transparent" id="exampleInputEmail1" placeholder="Search By First Latter">
                </div>
            </div>
        </div>`);
}
function DisplayContact(){
    $(".inputsCont").html('');
    $("#detailSec").addClass("d-none");
    $("#main-section").addClass("d-none");
    $("#formSec").removeClass("d-none");
}

let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let NumberInput = document.getElementById("NumberInput");
let Ageinput = document.getElementById("Ageinput");
let passInput = document.getElementById("passInput");
let RepassInput = document.getElementById("RepassInput");
let btnsub = document.getElementById("btn-sub");


function NameValidation(){
    let text = nameInput.value;
    const nameregex = /^[a-zA-Z]{3,}$/;
    if(nameregex.test(text)){
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        document.getElementById("nameAlert").classList.add("d-none");

        return true;
    }else{
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
        document.getElementById("nameAlert").classList.remove("d-none");
        return false;
    }
}
function EmailAvailabilty(){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value)) {
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        document.getElementById("emailAlert").classList.replace("d-block", "d-none");

        return true;
    } else {
        emailInput.classList.remove("is-valid");
        emailInput.classList.add("is-invalid");
        document.getElementById("emailAlert").classList.replace( "d-none","d-block");

        return false;
    }
}
function phoneAvailabilty(){
    const phoneRegex=/^0\d{10}$|^\+?\d{1,4}?[-.\s]?(\d{3}[-.\s]?){2}\d{4}$/;
    if (phoneRegex.test(NumberInput.value)) {
        NumberInput.classList.add("is-valid");
        NumberInput.classList.remove("is-invalid");
        document.getElementById("numAlert").classList.add("d-none");
        return true;
    } else {
        NumberInput.classList.remove("is-valid");
        NumberInput.classList.add("is-invalid");
        document.getElementById("numAlert").classList.remove("d-none");
        return false;
    }
}
function ageAvailabilty(){
    const ageRegex = /^(?:1[01][0-9]|120|[1-9][0-9]?)$/;
    if (ageRegex.test(Ageinput.value)) {
        Ageinput.classList.add("is-valid");
        Ageinput.classList.remove("is-invalid");
        document.getElementById("ageAlert").classList.add("d-none");

        return true;
    } else {
        Ageinput.classList.remove("is-valid");
        Ageinput.classList.add("is-invalid");
        document.getElementById("ageAlert").classList.remove("d-none");

        return false;
    }
}
function passAvailabilty(){
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (passRegex.test(passInput.value)) {
        passInput.classList.add("is-valid");
        passInput.classList.remove("is-invalid");
        document.getElementById("passAlert").classList.add("d-none");

        return true;
    } else {
        passInput.classList.remove("is-valid");
        passInput.classList.add("is-invalid");
        document.getElementById("passAlert").classList.remove("d-none");
        return false;
    }
}
function repassAvailabilty(){
    if (passInput.value === RepassInput.value) {
        RepassInput.classList.add("is-valid");
        RepassInput.classList.remove("is-invalid");
        document.getElementById("repassAlert").classList.add("d-none");
        return true;
    } else {
        RepassInput.classList.remove("is-valid");
        RepassInput.classList.add("is-invalid");
        document.getElementById("repassAlert").classList.remove("d-none");
        return false;
    }
}