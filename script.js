// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const quantityInput = document.getElementById('quantity-input'); // Reference for quantity input
const addButton = document.getElementById('add-button');
const markPurchasedButton = document.getElementById('mark-purchased-button');
const clearButton = document.getElementById('clear-button');
const shoppingList = document.getElementById('shopping-list');
const selectedItemsList = document.getElementById('selected-items-list'); // Reference for selected items

// Initialize shopping list and selected items array
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
        
        // Display item name and quantity
        li.textContent = `${item.name} (Qty: ${item.quantity})`;
        li.className = item.purchased ? 'purchased' : ''; // Apply 'purchased' class if item is purchased
        
        // Create Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-button'; // Optional class for styling
        
        // Add event listener for editing
        editButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent marking as purchased when clicking edit
            editItem(index);
        });
        
        // Append edit button to list item
        li.appendChild(editButton);

        // Add event listener for marking as purchased on click
        li.addEventListener('click', () => markPurchased(index));
        
        shoppingList.appendChild(li);
    });
}

// Add item from input field with quantity
function addItem() {
    const itemName = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value) || 1; // Default to 1 if no valid quantity is provided

    if (itemName) {
        items.push({ name: itemName, quantity, purchased: false });
        itemInput.value = ''; // Clear input field
        quantityInput.value = '1'; // Reset quantity input to default value
        renderList();
        saveItems(); // Save to local storage
    }
}

// Mark all items as purchased
function markAllPurchased() {
    items.forEach(item => item.purchased = true); // Set all items to purchased
    renderList(); // Re-render the list to reflect changes visually
    saveItems(); // Save to local storage
}

// Clear all items from the list and local storage
function clearList() {
    items = []; // Clear the items array
    renderList(); // Re-render the list to show it is empty
    localStorage.removeItem('shoppingList'); // Clear from local storage
}

// Edit an existing item including its quantity
function editItem(index) {
    const newName = prompt("Edit item name:", items[index].name);
    const newQuantityString = prompt("Edit quantity:", items[index].quantity);
    const newQuantity = parseInt(newQuantityString);

    if (newName !== null && newName.trim() !== "" && !isNaN(newQuantity) && newQuantity > 0) { 
        items[index].name = newName.trim();
        items[index].quantity = newQuantity;
        
        renderList(); // Update displayed list
        saveItems(); // Save to local storage.
    } else { 
        alert("Invalid input. Please provide a valid name and quantity.");
    }
}

// Mark an individual item as purchased or unpurchased
function markPurchased(index) {
   items[index].purchased = !items[index].purchased; // Toggle purchased state
   renderList(); // Re-render the list to reflect changes visually
   saveItems(); // Save to local storage
}

// Save items to local storage 
function saveItems() {
   localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Function to add item from image selection with default quantity of 1
function addItemFromImage(itemName) {
    const existingItemIndex = items.findIndex(item => item.name === itemName);
    
    if (existingItemIndex === -1) {
        const quantity = parseInt(quantityInput.value) || 1; // Use quantity input value or default to 1
        items.push({ name: itemName, quantity, purchased: false });
        
        renderList(); // Update the list display
        saveItems(); // Save to local storage
    } else {
        alert(`${itemName} is already in the list.`);
    }
}

// Function to remove item from image selection
function removeItemFromImage(itemName) {
    const indexToRemove = items.findIndex(item => item.name === itemName);
    
    if (indexToRemove !== -1) {
        items.splice(indexToRemove, 1); // Remove the item from the array
        renderList(); // Update the display after removal
        saveItems(); // Save changes to local storage
    } else {
        alert(`${itemName} is not in the list.`);
    }
}

// Event listeners 
addButton.addEventListener('click', addItem);
markPurchasedButton.addEventListener('click', markAllPurchased); 
clearButton.addEventListener('click', clearList); 

// Load initial items from local storage when the page loads 
loadItems();

// Initial render of the empty list and selections. 
renderList();