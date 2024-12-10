// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const markPurchasedButton = document.getElementById('mark-purchased-button');
const clearButton = document.getElementById('clear-button');
const shoppingList = document.getElementById('shopping-list');

// Initialize shopping list array
let items = [];

// Load items from local storage
function loadItems() {
    const storedItems = JSON.parse(localStorage.getItem('shoppingList'));
    if (storedItems) {
        items = storedItems;
        renderList();
    }
}

// Render the shopping list
function renderList() {
    shoppingList.innerHTML = ''; // Clear existing list
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.className = item.purchased ? 'purchased' : '';
        
        // Add event listener for marking as purchased on click
        li.addEventListener('click', () => markPurchased(index));
        
        // Add double-click event listener for editing
        li.addEventListener('dblclick', () => editItem(index));
        
        shoppingList.appendChild(li);
    });
}

// Add item from input field
function addItem() {
    const itemName = itemInput.value.trim();
    if (itemName) {
        items.push({ name: itemName, purchased: false });
        itemInput.value = ''; // Clear input field
        renderList();
        saveItems(); // Save to local storage
    }
}

// Add item from image selection
function addItemFromImage(itemName) {
    if (itemName) {
        // Check if the item already exists
        const existingItem = items.find(item => item.name === itemName);
        
        if (!existingItem) {
            items.push({ name: itemName, purchased: false });
            renderList();
            saveItems(); // Save to local storage
        } else {
            alert(`${itemName} is already in the list.`);
        }
    }
}

// Remove item from image selection
function removeItemFromImage(itemName) {
    const index = items.findIndex(item => item.name === itemName);
    
    if (index !== -1) {
        items.splice(index, 1); // Remove the item from the array
        renderList();
        saveItems(); // Save to local storage
    } else {
        alert(`${itemName} is not in the list.`);
    }
}

// Mark item as purchased
function markPurchased(index) {
    items[index].purchased = !items[index].purchased; // Toggle purchased state
    renderList();
    saveItems(); // Save to local storage
}

// Edit an existing item
function editItem(index) {
    const newName = prompt("Edit item:", items[index].name);
    if (newName !== null && newName.trim() !== "") {
        items[index].name = newName.trim();
        renderList();
        saveItems(); // Save to local storage
    }
}

// Mark all items as purchased
function markAllPurchased() {
    items.forEach(item => item.purchased = true); // Set all items to purchased
    renderList();
    saveItems(); // Save to local storage
}

// Clear the shopping list
function clearList() {
    items = [];
    renderList();
    localStorage.removeItem('shoppingList'); // Clear from local storage
}

// Save items to local storage
function saveItems() {
    localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Event listeners
addButton.addEventListener('click', addItem);
markPurchasedButton.addEventListener('click', markAllPurchased);
clearButton.addEventListener('click', clearList);

// Load initial items from local storage when the page loads
loadItems();

// Initial render of the empty list
renderList();