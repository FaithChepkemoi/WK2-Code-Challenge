// Get references to DOM elements
const itemInput = document.getElementById('item-input');
const addButton = document.getElementById('add-button');
const markPurchasedButton = document.getElementById('mark-purchased-button');
const clearButton = document.getElementById('clear-button');
const shoppingList = document.getElementById('shopping-list');
const itemImages = document.querySelectorAll('.item-image');

// Initialize shopping list array
let items = [];

// Render the shopping list
function renderList() {
    shoppingList.innerHTML = ''; // Clear existing list
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item.name;
        li.className = item.purchased ? 'purchased' : '';
        
        // Add event listener for marking as purchased on click
        li.addEventListener('click', () => markPurchased(index));
        
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
    }
}

// Add item from image selection
function addItemFromImage(itemName) {
    if (itemName) {
        items.push({ name: itemName, purchased: false });
        renderList();
    }
}

// Mark item as purchased
function markPurchased(index) {
    items[index].purchased = !items[index].purchased; // Toggle purchased state
    renderList();
}

// Mark all items as purchased
function markAllPurchased() {
    items.forEach(item => item.purchased = true); // Set all items to purchased
    renderList();
}

// Clear the shopping list
function clearList() {
    items = [];
    renderList();
}

// Event listeners
addButton.addEventListener('click', addItem);
markPurchasedButton.addEventListener('click', markAllPurchased);
clearButton.addEventListener('click', clearList);

// Event listeners for image clicks
itemImages.forEach(image => {
    image.addEventListener('click', () => addItemFromImage(image.dataset.itemName));
});

// Initial render of the empty list
renderList();