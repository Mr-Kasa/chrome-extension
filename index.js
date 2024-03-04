// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue ,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js" // import to call functions with .ref together from different js file  // ddescribe where you are calling from //in this case from a link// push to add items to database
const appSettings = {
    databaseURL: "https://playground-5051a-default-rtdb.asia-southeast1.firebasedatabase.app/"   //declaring database  my database url
}
const app = initializeApp(appSettings)       //calling database function for initializing app and equating its output to app 
const database = getDatabase(app)           //call database and store output in var database
const shoppingListInDB = ref(database, "shoppingList")   //call function ref with values database and identifier shopping list referenced "movies"
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() { 
    let inputValue = inputFieldEl.value              
    push(shoppingListInDB, inputValue)  //push items to database
    clearInputFieldEl()
   console.log(inputValue)   
})



onValue(shoppingListInDB, function(snapshot) {  // call onvalue function and set its stored shopping list values into an array    // snapshot function helps give a snapshot of our database
 if (snapshot.exists()){// function that brings t/f depending on wether the snapshot exists

let itemsArray = Object.entries(snapshot.val()) //create var and set it to be the database items
 clearShoppingListEl() //recent updates clear//could use object.value or object.id
 
 for (let i = 0; i < itemsArray.length; i++)
 {
 let currentItem = itemsArray[i]  //create var and store array values
 let currentItemID = currentItem[0]  //set current item id to be the array value for id
 let currentItemValue = currentItem[1]  //set current item value to value of item in database
  appendItemToShoppingListEl(currentItem)     //add items to the shopping list app       
 }
 }
 else {
     shoppingListEl.innerHTML = "Add items to shopping cart"
 }


})
function clearInputFieldEl() {   //create funtion to clear input bar
    inputFieldEl.value = ""
}
function clearShoppingListEl(){       //clear shopping list items
      shoppingListEl.innerHTML = ""
 }
 
function appendItemToShoppingListEl(item) {        //create function to list items added returns  the var item value
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li") //create var and set it to be a list html tag
    newEl.textContent = itemValue//overwrite text content
      newEl.addEventListener("dblclick", function() {  //when item double clicked it must be deleted from database
      let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)   //create to target specific item in database
      remove(exactLocationOfItemInDB)  //call remove function
        console.log(itemID)
    })
    shoppingListEl.append(newEl)// append to app display bottom
}



    /* let scrimbaUsers = {       // turning an object into an array
    "00": "sindre@scrimba.com",
    "01": "per@scrimba.com",
    "02": "frode@scrimba.com"
}

// Challenge: Create a let variable called 'scrimbaUsersEmails' and use one of Object methods to set it equal to an array with the values
let scrimbaUsersEmails = Object.values(scrimbaUsers)

// Challenge: Create a let variable called 'scrimbaUsersIDs' and use one of Object methods to set it equal to an array with the keys
let scrimbaUsersIDs = Object.keys(scrimbaUsers)

// Challenge: Create a let variable called 'scrimbaUsersEntries' and use one of Object methods to set it equal to an array with the both the keys and values
let scrimbaUsersEntries = Object.entries(scrimbaUsers)

console.log(scrimbaUsersEntries)*/
