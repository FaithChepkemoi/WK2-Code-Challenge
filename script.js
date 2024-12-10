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
let selectedItems = [];

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

// Save items to local storage 
function saveItems() {
   localStorage.setItem('shoppingList', JSON.stringify(items));
}

// Event listeners 
addButton.addEventListener('click', addItem);
markPurchasedButton.addEventListener('click', markAllPurchased); // Ensure this works correctly
clearButton.addEventListener('click', clearList); // Ensure this works correctly

// Load initial items from local storage when the page loads 
loadItems();

// Initial render of the empty list and selections. 
renderList();