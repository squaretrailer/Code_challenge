# Shopping List App

A simple interactive shopping cart application where users can browse products, add items to a cart, adjust quantities, and persist cart data using localStorage.

## Features
Display products dynamically from a products.json file

Add products to shopping cart

Increase / decrease item quantities directly in the cart

Remove items when quantity reaches zero

View total item count on cart icon badge

Cart sidebar slides in/out with smooth CSS transition

Cart data is saved in browser’s localStorage – persists after page refresh

### Project Structure
text
project-folder/
│
├── index.html          # Main HTML structure
├── style.css           # All styles (layout, cart sidebar, responsive)
├── app.js              # JavaScript logic (cart, localStorage, fetching)
├── products.json       # Product data (id, name, price, image, description)
└── images/             # Folder containing product images
    ├── t-shirt.webp
    ├── shirt.avif
    ├── milk.avif
    ├── hoodie-jumper.webp
    └── blender.jpg
#### How to Run
Clone or download all files into a folder.

Make sure the images/ folder contains the product images referenced in products.json.

Open index.html in a modern web browser.

For full functionality (fetching products.json), use Live Server or serve the folder via a local HTTP server (e.g., npx serve .). Opening the file directly via file:// may cause CORS issues.

##### Technologies Used
HTML5

CSS3 (Grid, Flexbox, transitions)

Vanilla JavaScript (ES6)

localStorage for data persistence

Fetch API to load products.json

###### How It Works
Load products – app.js fetches products.json and renders product cards.

Add to cart – Click “Add to Cart” → item is added to carts array.

View cart – Click the cart icon → sidebar slides in.

Change quantity – Use + / - buttons inside the cart.

Save data – Every cart change updates localStorage.

Persist – On page reload, the cart is restored from localStorage.

 Example products.json Entry
json
{
    "id": 1,
    "name": "T-shirt",
    "price": 19.99,
    "description": "A comfortable cotton t-shirt.",
    "image": "images/t-shirt.webp"
}
####### Testing
Click the cart icon – sidebar should appear.

Add several products – badge count updates.

Increase / decrease quantity – total price updates and item removes when quantity reaches 0.

Refresh the page – cart stays as it was.

