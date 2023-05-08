const form = document.querySelector("#item-form");
const itemList = document.querySelector(".items");
const clearBtn = document.querySelector(".btn-clear");
const filter = document.querySelector("#filter");
const itemInput = document.querySelector("#item-input");

// Load items from localStorage on page load
document.addEventListener("DOMContentLoaded", loadItemsFromStorage);

// Add item to the list
form.addEventListener("submit", addItem);

// Remove item from the list
itemList.addEventListener("click", removeItem);

// Clear all items from the list
clearBtn.addEventListener("click", clearItems);

// Filter the items
filter.addEventListener("keyup", filterItems);

// Edit item in the list
itemList.addEventListener("click", editItem);

// Function to add item to the list
function addItem(e) {
  e.preventDefault();
  // Get the input value
  const newItem = itemInput.value.trim();
  if (newItem !== "") {
    // Create a new li element
    const li = document.createElement("li");
    li.className = "item-list";
    li.appendChild(document.createTextNode(newItem));

    // Add a delete button
    const button = document.createElement("button");
    button.className = "remove-item btn-link text-red";

    button.appendChild(document.createTextNode("X"));
    li.appendChild(button);

    itemList.style.display = "flex";
    clearBtn.style.display = "Block";
    filter.style.display = "Block";

    // Add li to the ul
    itemList.appendChild(li);
    // Save to localStorage
    saveItemToStorage(newItem);
    // Clear the input field
    itemInput.value = "";
  }
}

// Function to remove item from the list
function removeItem(e) {
  if (e.target.classList.contains("btn-link")) {
    if (confirm("Are you sure? ")) {
      const li = e.target.parentElement;
      itemList.removeChild(li);
      // Remove from localStorage
      removeItemFromStorage(li.textContent);
    }
  }
}

// Function to clear all items from the list

function clearItems() {
  // const list = document.getElementById("item-list");
  // const clearAllButton = document.getElementById("clear");

  // Hide the list items
  const items = itemList.querySelectorAll(".item-list");
  items.forEach(function (item) {
    item.style.display = "none";
    clearBtn.style.display = "none";
    filter.style.display = "none";

    // // clearAllButton.addEventListener("click", () => list.innerHTML = "";
  });

  // Clear localStorage
  localStorage.clear();
}

// Function to filter the items
function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll(".item-list");
  items.forEach(function (item) {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

// // Function to edit item in the list
// function editItem(e) {
//   if (e.target.classList.contains("item-list")) {
//     // Put item in edit mode
//     const li = e.target;
//     const itemText = li.textContent;
//     itemInput.value = itemText;
//     // Remove the li from the list
//     itemList.removeChild(li);
//     // Remove from localStorage
//     removeItemFromStorage(itemText);
//   }
// }

function editItem(e) {
  if (e.target.classList.contains("item-list")) {
    // Put item in edit mode
    const li = e.target;
    const itemText = li.textContent;
    itemInput.value = itemText;
    // Remove the li from the list
    itemList.removeChild(li);
    // Remove from localStorage
    removeItemFromStorage(itemText);

    // Change text and style of Add Item button
    const addItemBtn = document.querySelector(".btn-add");
    addItemBtn.textContent = "Update Item";
    addItemBtn.style.backgroundColor = "green";
    addItemBtn.style.color = "white";
  }
}

// Function to save item to localStorage
function saveItemToStorage(item) {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
  items.push(item);
  localStorage.setItem("items", JSON.stringify(items));
}

// Function to load items from localStorage
function loadItemsFromStorage() {
  let items;
  if (localStorage.getItem("items") === null) {
    items = [];
  } else {
    items = JSON.parse(localStorage.getItem("items"));
  }
}
items.forEach(function (item) {});

// // Get all the remove buttons
// const removeButtons = document.querySelectorAll("#item-list");

// // Loop through each remove button and add a click event listener

// const itemtoremove = document.getElementById("item-list");
// itemList.remove();
