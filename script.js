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
        li.className = item.purchased ? 'purchased' : '';
        
        // Add event listener for marking as purchased on click
        li.addEventListener('click', () => markPurchased(index));
        
        // Add double-click event listener for editing
        li.addEventListener('dblclick', () => editItem(index));
        
        shoppingList.appendChild(li);
    });
}

// Render selected items
function renderSelectedItems() {
    selectedItemsList.innerHTML = ''; // Clear existing selected items
    selectedItems.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        selectedItemsList.appendChild(li);
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

// Add item from image selection with default quantity of 1
function addItemFromImage(itemName) {
    if (itemName) {
        const existingItem = items.find(item => item.name === itemName);
        
        if (!existingItem) {
            const quantity = parseInt(quantityInput.value) || 1;
            items.push({ name: itemName, quantity, purchased: false });
            selectedItems.push(itemName); // Add to selected items
            renderList();
            renderSelectedItems(); // Update selected items display
            saveItems(); // Save to local storage
        } else {
            alert(`${itemName} is already in the list.`);
        }
    }
}

// Remove item from image selection using splice()
function removeItemFromImage(itemName) {
    const index = selectedItems.indexOf(itemName);
    
    if (index !== -1) {
        selectedItems.splice(index, 1); // Remove from selected items array
        renderSelectedItems(); // Update selected items display

        const mainIndex = items.findIndex(item => item.name === itemName);
        
        if (mainIndex !== -1) {
            items.splice(mainIndex, 1); // Remove from main shopping list array using splice()
            renderList(); // Update main shopping list display
            saveItems(); // Save to local storage
        }
        
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

// Edit an existing item including its quantity
function editItem(index) {
   const newName = prompt("Edit item:", items[index].name);
   const newQuantityString = prompt("Edit quantity:", items[index].quantity);
   const newQuantity = parseInt(newQuantityString);

   if (newName !== null && newName.trim() !== "" && !isNaN(newQuantity) && newQuantity > 0) { 
       const oldName = items[index].name;
       
       const selectedIndex = selectedItems.indexOf(oldName);
       
       if (selectedIndex !== -1) {
           selectedItems[selectedIndex] = newName.trim();
           renderSelectedItems(); // Update displayed selected items.
           
           // Also update the main shopping list.
           items[index].name = newName.trim();
           items[index].quantity = newQuantity;
           renderList();
           saveItems(); // Save to local storage.
       } else { 
           alert("This item is not in your selections.");
       }
   } else { 
       alert("Invalid input. Please provide a valid name and quantity.");
   }
}

// Mark all items as purchased
function markAllPurchased() {
   items.forEach(item => item.purchased = true); // Set all items to purchased
   renderList();
   saveItems(); // Save to local storage
}

// Clear the shopping list and selected items 
function clearList() {
   items = [];
   selectedItems = []; // Clear selected items as well.
   renderList();
   renderSelectedItems(); // Update displayed selected items.
   localStorage.removeItem('shoppingList'); // Clear from local storage.
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

// Initial render of the empty list and selections. 
renderList();
renderSelectedItems();