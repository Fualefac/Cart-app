import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"



const appSettings = {
    databaseURL: "https://new-database-b4797-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "cart")


const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value

    push(shoppingListInDB, inputValue)

    console.log(`${inputValue} added to database`)

    //clears field after value is added
    cleartheinputfield()


})
onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()) {
                    //using Object.values() to convert snapshot.val() from an object to an array
        let itemsArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()

        // Using a for loop to iterate on itemsArray 
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            appendlist(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = ""
    }

        
    
})
function clearShoppingListEl() {
    shoppingListEl.innerHTML=""
}

function cleartheinputfield() {
    inputFieldEl.value = ""
}

function appendlist(item) {
    //shoppingListEl.innerHTML += `<li>${itemValue}</li>`

    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")

    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database,`cart/${itemID}` )

        remove(exactLocationOfItemInDB)
    })

    newEl.textContent = itemValue

    shoppingListEl.append(newEl)
}

