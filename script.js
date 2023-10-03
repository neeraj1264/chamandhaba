// navbar
let menubar = document.querySelector("#menu-bars");
let mynav = document.querySelector(".navbar");

menubar.onclick = () => {
  menubar.classList.toggle("fa-times");
  mynav.classList.toggle("active");
};
// Add a click event listener to all navigation bar elements except the menu icon
const navbarItems = document.querySelectorAll(".navbar a:not(#menu-bars)");
navbarItems.forEach(item => {
  item.addEventListener("click", () => {
    if (mynav.classList.contains("active")) {
      menubar.classList.toggle("fa-times");
      mynav.classList.toggle("active");
    }
  });
});

// const sr = ScrollReveal({
//   distance: "45px",
//   duration: 2700,
//   reset: true,
// });

// sr.reveal(".myimage", { delay: 350, origin: "left" });
// sr.reveal(".home .content", { delay: 350, origin: "right" });
// sr.reveal(".speciality", { delay: 350, origin: "top" });
// sr.reveal(".popular", { delay: 350, origin: "bottom" });
// sr.reveal(".review .box", { delay: 350, origin: "top" });
// sr.reveal(".myform", { delay: 350, origin: "bottom" });

// ------------------------------------------Add button Code--------------------------------------------------

var cartData = {};
let cartCount = 0;
let cartCountElement = document.getElementById("cart-count"); // Declare cartCountElement in the global scope

// Event delegation for "Add to Cart" functionality
document.querySelector(".paneer").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".mushroom").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".dal").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".kofta").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".chaap").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".chana").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".vegetable").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".rice").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".naan").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".roti").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".paratha").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".rayta").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".salad").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});

document.querySelector(".chinese").addEventListener("click", (event) => {
  handleAddToCartClick(event);
});


function handleAddToCartClick(event) {
  const button = event.target.closest(".add-to-cart");
  if (button) {
    const GotoCart = button.parentNode.querySelector(".Go-to-Cart");

    button.style.display = "none";
    GotoCart.style.display = "flex";

    // Update cart count only when "Order Now" button is clicked
    cartCount++;
    cartCountElement.textContent = cartCount;
  }
}

// ---------------------cart Data code-----------------------------

function  calculateitemTotal() {
  let Total = 0;
  
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      Total += cartData[itemId].quantity * cartData[itemId].price;
    }
  }
  return `₹ ${Total.toFixed(2)}`;
}

function  calculateTotal() {
  let Total = 20;
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      Total += cartData[itemId].quantity * cartData[itemId].price;
    }
  }
  return `₹ ${Total.toFixed(2)}`;
}
function submitOrder(cartData) {
  // Retrieve the current order number from localStorage
  let currentOrderNumber = localStorage.getItem("currentOrderNumber");

  // If there's no stored order number, start with 1
  if (!currentOrderNumber) {
    currentOrderNumber = 1;
  } else {
    // If there's a stored order number, increment it by 1
    currentOrderNumber = parseInt(currentOrderNumber) + 1;
  }

  const formattedOrderNumber = String(currentOrderNumber).padStart(4, '0');

  localStorage.setItem("currentOrderNumber", currentOrderNumber);

 var message = `Order  : *ORD-${formattedOrderNumber}*\n`;
 var totalAmount =  calculateTotal();
 message  += `Amount :- *${totalAmount}*\n\n`;
 message  += '----------items----------\n\n'
 for (const itemId in cartData) {
   if (cartData.hasOwnProperty(itemId)) {
     const item = cartData[itemId];
     message += `${item.quantity}.0 x   ${item.name} = ₹ ${item.price}\n`;
   }
 }
  message +=  `Service Charge = ₹ 20.00\n`

 // Replace 'YOUR_WHATSAPP_NUMBER' with the actual WhatsApp number
 var whatsappNumber = '+919896755380';

 // Construct the WhatsApp link
 var whatsappLink = "https://api.whatsapp.com/send?phone=" + whatsappNumber + "&text=" + encodeURIComponent(message);

 // Open WhatsApp in a new tab to send the message
 window.open(whatsappLink, '_blank');
 
 location.reload();

}

// -------------------------dropdown_menu_Start-----------------------------------

// const dropdownContent = document.querySelector(".dropdown-content");
// const menuButton = document.querySelector(".dropbtn");

// dropdownContent.querySelectorAll("a").forEach((link) => {
//   link.addEventListener("click", () => {
//     // Close the dropdown after an option is clicked
//     dropdownContent.style.display = "none";
//   });
// }); 

// menuButton.addEventListener("click", () => {
//   // Toggle the dropdown when the menu button is clicked
//   if (dropdownContent.style.display === "none") {
//     dropdownContent.style.display = "block";
//   } else {
//     dropdownContent.style.display = "none";
//   }
// });
// menuButton.addEventListener("mouseover", () => {
//   // Open the dropdown when hovering over the menu button
//   dropdownContent.style.display = "block";
// });

// // Close the dropdown when the mouse leaves the dropdown area
// dropdownContent.addEventListener("mouseleave", () => {
//   dropdownContent.style.display = "none";
// });

// -------------------------dropdown_menu_End----------------------------------
let isCartModalOpen = false;
// -------------------------Cart_data_Start------------------------------------

function showCartModal() {

  if (Object.keys(cartData).length === 0) {
    closeCartModal(); // Close the modal
    return;
  }

  document.getElementById("cartModal").style.display = "block";
  isCartModalOpen = true;
  document.getElementById("dark-mode-toggle").style.display = "none";

  if (cartCount < 1) {
    alert("Please add items to the cart first.");
    closeCartModal();
    return;
  }
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "block";

  const cartItemsContainer = document.getElementById("cartItems");
  cartItemsContainer.innerHTML = "";

   // Apply a max-height and overflow-y style to create a scrollbar
   cartItemsContainer.style.maxHeight = "500px"; // Adjust the value as needed
   cartItemsContainer.style.overflowX = "auto";

  const table = document.createElement("table");
  table.classList.add("cart-table");

  const headerRow = document.createElement("tr");
  const headerNames = ["Image", "Name", "Quantity", "Price"];
  for (const headerName of headerNames) {
    const headerCell = document.createElement("th");
    headerCell.textContent = headerName;
    if (
      headerName === "Name" ||
      headerName === "Quantity" ||
      headerName === "Image" ||
      headerName === "Price" 
      ) {
      headerCell.classList.add("header-spaced"); // Add the class for spacing
    }
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);

  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      const item = cartData[itemId];
      const cartRow = document.createElement("tr");

      const imageCell = document.createElement("td");
      imageCell.classList.add("center-align");
      const itemImage = document.createElement("img");
      itemImage.src = item.image;
      itemImage.alt = item.name;
      imageCell.appendChild(itemImage);
      cartRow.appendChild(imageCell);

      const nameCell = document.createElement("td");
      nameCell.classList.add("center-align");
      nameCell.textContent = item.name;
      cartRow.appendChild(nameCell);

      const quantityCell = document.createElement("td");
      quantityCell.classList.add("center-align");
      
      const minusIcon = document.createElement("i");
      minusIcon.classList.add("fas", "fa-minus", "quantity-icon");
      minusIcon.setAttribute("data-item-id", itemId);
      minusIcon.addEventListener("click", () => {
        // Decrement the quantity when the minus icon is clicked
        if (item.quantity > 1) {
          item.quantity--;
          quantityValue.textContent = item.quantity;
          updatePrice(item, priceCell);
           Itemtotalcell.textContent = `${ calculateitemTotal()}` ; // Update the total amount
           totalcell.textContent = `${ calculateTotal()}` ; // Update the total amount

        }
        else {
          // Remove the item from the cart when quantity is less than one
          delete cartData[itemId];
          showCartModal(); // Refresh the cart modal after deleting an item
          updateCartCount(); // Update the cart count
           Itemtotalcell.textContent = `${ calculateitemTotal()}`; // Update the total amount
           totalcell.textContent = `${ calculateTotal()}` ; // Update the total amount

              }
      });
      quantityCell.appendChild(minusIcon);
      
      const quantityValue = document.createElement("span");
      quantityValue.classList.add("item-quantity")
      quantityValue.textContent = item.quantity;
      quantityCell.appendChild(quantityValue);
      
      const plusIcon = document.createElement("i");
      plusIcon.classList.add("fas", "fa-plus", "quantity-icon");
      plusIcon.setAttribute("data-item-id", itemId);
      plusIcon.addEventListener("click", () => {
        // Increment the quantity when the plus icon is clicked
        item.quantity++;
        quantityValue.textContent = item.quantity;
        updatePrice(item, priceCell);
         Itemtotalcell.textContent = `${ calculateitemTotal()}`; // Update the total amount
         totalcell.textContent = `${ calculateTotal()}` ; // Update the total amount
      });
      quantityCell.appendChild(plusIcon);
      
      cartRow.appendChild(quantityCell);

      const priceCell = document.createElement("td");
      priceCell.classList.add("center-align");
      priceCell.textContent = `₹ ${item.price * item.quantity}`;
      cartRow.appendChild(priceCell);

      table.appendChild(cartRow);

     }
  }
// ------------------------------------horizontal-line start------------------------------------

const emptyFooterRow1 = document.createElement("tr");

const emptyFooterCell1 = document.createElement("td");
emptyFooterCell1.classList.add("footer-hr-cell"); // Add a class to this cell
emptyFooterRow1.appendChild(emptyFooterCell1);

const emptyFooterCell2 = document.createElement("td");
emptyFooterCell2.classList.add("footer-hr-cell"); // Add a class to this cell
emptyFooterRow1.appendChild(emptyFooterCell2);

const emptyFooterCell3 = document.createElement("td");
emptyFooterCell3.classList.add("footer-hr-cell"); // Add a class to this cell
emptyFooterRow1.appendChild(emptyFooterCell3);

const emptyFooterCell4 = document.createElement("td");
emptyFooterCell4.classList.add("footer-hr-cell"); // Add a class to this cell
emptyFooterRow1.appendChild(emptyFooterCell4);

table.appendChild(emptyFooterRow1);

// ------------------------------------Empty-row------------------------------------

const emptyFooterRow = document.createElement("tr");
const emptyFooterCell = document.createElement("td");
emptyFooterCell.setAttribute("colspan", headerNames.length);
emptyFooterRow.appendChild(emptyFooterCell);
table.appendChild(emptyFooterRow);

// ------------------------------------itemtotal-row------------------------------------

const itemtotal = document.createElement("tr");

const emptyCell3 = document.createElement("td");
      emptyCell3.textContent = ("Item-Total");
      emptyCell3.classList.add("cart-footer");
      itemtotal.appendChild(emptyCell3);

const emptyCell4 = document.createElement("td");
  emptyCell4.setAttribute("colspan", "2"); 
  itemtotal.appendChild(emptyCell4);

  const  Itemtotalcell = document.createElement("td");
   Itemtotalcell.textContent = `${ calculateitemTotal()}`  ;
   Itemtotalcell.classList.add("cart-footer");
  itemtotal.appendChild( Itemtotalcell);

  table.appendChild(itemtotal);

// ------------------------------------delivery-row------------------------------------

const delivery = document.createElement("tr");

const emptyCell5 = document.createElement("td");
      emptyCell5.textContent = ("Delivery");
      emptyCell5.classList.add("cart-footer");
      delivery.appendChild(emptyCell5);

const emptyCell6 = document.createElement("td");
  emptyCell6.setAttribute("colspan", "2"); 
  delivery.appendChild(emptyCell6);

  const deliverycell = document.createElement("td");
  deliverycell.textContent = ("₹ 20")  ;
  deliverycell.classList.add("cart-footer");
  delivery.appendChild(deliverycell);

  table.appendChild(delivery);
  
// ------------------------------------Total-row------------------------------------

const Total = document.createElement("tr");

const emptyCell7 = document.createElement("td");
      emptyCell7.textContent = ("Total");
      emptyCell7.classList.add("cart-footer");
      Total.appendChild(emptyCell7);

const emptyCell8 = document.createElement("td");
  emptyCell8.setAttribute("colspan", "2"); 
  Total.appendChild(emptyCell8);

  const  totalcell = document.createElement("td");
   totalcell.textContent = `${ calculateTotal()}`  ;
   totalcell.classList.add("cart-footer");
   Total.appendChild( totalcell);

  table.appendChild(Total);
// ------------------------------------submit-row------------------------------------

  const submitrow = document.createElement("tr");

  const emptyCell = document.createElement("td");
  emptyCell.setAttribute("colspan", "3"); 
 submitrow.appendChild(emptyCell);

  // const emptyCell2 = document.createElement("td");
  // emptyCell2.setAttribute("colspan", "1"); 
  //submitrow.appendChild(emptyCell2);

    const submitCell = document.createElement("td");
    submitCell.setAttribute("colspan", "1"); // Span 3 columns for the submit button
    submitCell.classList.add("submit-cell"); // Add a custom class to style the submit cell
   submitrow.appendChild(submitCell);
      // Create the "Submit Order" button
   const submitButton = document.createElement("button");
   submitButton.textContent = "Place Order";
   submitButton.classList.add("submit-button");
   submitButton.addEventListener("click", () => {
    submitOrder(cartData);
   });
   submitCell.appendChild(submitButton); // Append the button to the submit cell

   table.appendChild(submitrow);
   
const emptyFooterRow2 = document.createElement("tr");
const emptyFooterCell5 = document.createElement("td");
emptyFooterCell5.setAttribute("colspan", headerNames.length);
emptyFooterRow2.appendChild(emptyFooterCell5);
table.appendChild(emptyFooterRow2);

   cartItemsContainer.appendChild(table);
}
function updatePrice(item, priceCell) {
  // Update the price cell with the new calculated price
  priceCell.textContent = `₹ ${item.price * item.quantity}`;
}
// -------------------------Cart_data_End------------------------------------

function closeCartModal() {
  document.getElementById("cartModal").style.display = "none";
  isCartModalOpen = false;
  document.getElementById("dark-mode-toggle").style.display = "block";
  const cartModal = document.getElementById("cartModal");
  cartModal.style.display = "none";
  location.reload();
}

function addToCart(id, name, price, image, quantity) {
  if (cartData.hasOwnProperty(id)) {
    cartData[id].quantity += 1;
  } else {
    cartData[id] = {
      name: name,
      price: price,
      image: image,
      quantity: +1,
    };
  }

  updateCartCount();
}

function showDropdown(itemId) {
  const dropdown = document.getElementById(`dropdown-${itemId}`);
  dropdown.style.display = "block";
}

function hideDropdown(itemId) {
  const dropdown = document.getElementById(`dropdown-${itemId}`);
  dropdown.style.display = "none";
}

function addToCartWithSize(id, name, image) {
  const dropdown = document.getElementById(`dropdown-options-${id}`);
  const selectedOption = dropdown.options[dropdown.selectedIndex].text;
  const size = selectedOption.split("-")[0].trim();
  const price = parseInt(selectedOption.split("₹")[1]);

  // You can add the selected size and price to the cartData object
  addToCart(id, `${name} (${size})`, price, image);
  // hideDropdown(id);
}


function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  let cartItemCount = 0;
  for (const itemId in cartData) {
    if (cartData.hasOwnProperty(itemId)) {
      cartItemCount += cartData[itemId].quantity;
    }
  }
  cartCountElement.textContent = cartItemCount;
}
// ------------------- fetching json data------------------------------------

let http = new XMLHttpRequest();

http.open("get", "products.json", true);

http.send();

http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
let products = JSON.parse(this.responseText);
function customize(item) {
  return `
    <div class="box" >
    <span class="dis product-price"><b>${Math.round((item.mrp - item.price.Half) / item.mrp * 100)}</b>% off</span>
    <img src="${item.image}" alt="img" onclick="zoomImage(this)">
    <h3 class="product-name" >${item.name}</h3>
     <div class="stars"></div>
    <div class="dropdownn" id="dropdown-${item.id}" style="display: flex;">
    <select class="size" id="dropdown-options-${item.id}">
      <option value="Half">Half - ₹${item.price.Half}</option>
      <option value="Full">Full - ₹${item.price.Full}</option>
    </select><br><br>
  </div>
  <button class="btn btn-ok add-to-cart" onclick="addToCartWithSize('${item.id}', '${item.name}', '${item.image}')">Add</button>
        <div class="Go-to-Cart" style="display: none;">
    <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
    </div>
    </div>
    `;
}

function uncustomize(item) {
  return `
  <div class="box" >
  <span class="dis product-price"><b>${Math.round((item.mrp - item.price) / item.mrp * 100)}</b>% off</span>
  <img src="${item.image}" alt="img" onclick="zoomImage(this)">
  <h3 class="product-name" >${item.name}</h3>
  <span class="pricee product-price"> <b>₹ ${item.price}</b> 
  <del class="mrp">₹ ${item.mrp}</del>
   <span class="rev"> 4.7 <i class="fas fa-star"></i></span>
   </span>
   <div class="stars"></div>
  
  <h2 class="btn add-to-cart "  onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${item.image}') ">ADD</h2>
  <div class="Go-to-Cart" style="display: none;">
  <h2 class="go" onclick="showCartModal()">GO <i class="fas fa fa-shopping-cart"></i></h2>
  </div>
  
  </div>
  </div>
  </div>
  `;
}
let paneer = "";
let mushroom = "";
let dal = "";
let kofta = "";
let chaap = "";
let chana = "";
let vegetable = "";
let rice = "";
let naan = "";
let roti = "";
let paratha = "";
let rayta = "";
let salad = "";
let chinese = "";
let Momos = "";
for (let i = 0; i < products.length; i++) {
const item = products[i];
if (i < 12) {
  paneer += customize(item);

  paneer += `
<div class="image-zoom-container" id="image-zoom-container">
  <span class="close-zoom" onclick="closeZoomImage()">&times;</span>
  <img class="zoomed-image" id="zoomed-image">
</div>
`;
}
if (i >= 12 && i < 17) {
  mushroom += customize(item);
}
if (i >= 17 && i < 24) {
  dal += customize(item);
}
if (i >= 24 && i < 26) {
  kofta += customize(item);
}
if (i >= 26 && i < 28) {
  chaap += customize(item);
}
if (i >= 28 && i < 32) {
  chana += customize(item);
}
if (i >= 32 && i < 41) {
    vegetable += customize(item);
}
if (i >= 41 && i < 43) {
  rice += customize(item);
}
if (i >= 43 && i < 46) {
  rice += uncustomize(item);
}
if (i >= 47 && i < 53) {
  naan += uncustomize(item);
}
if (i >= 53 && i < 59) {
roti += uncustomize(item);
}
if (i >= 59 && i < 65) {
  paratha += uncustomize(item);
}
if (i >= 66 && i < 71) {
rayta +=  customize(item);
}
if (i >= 71 && i < 74) {
  salad += uncustomize(item);
}
if (i >= 74 && i < 77) {
  chinese += customize(item);
}
}
document.querySelector(".paneer").innerHTML = paneer;
document.querySelector(".mushroom").innerHTML = mushroom;
document.querySelector(".dal").innerHTML = dal;
document.querySelector(".kofta").innerHTML = kofta;
document.querySelector(".chaap").innerHTML = chaap;
document.querySelector(".chana").innerHTML = chana;
document.querySelector(".vegetable").innerHTML = vegetable;
document.querySelector(".rice").innerHTML = rice;
document.querySelector(".naan").innerHTML = naan;
document.querySelector(".roti").innerHTML = roti;
document.querySelector(".paratha").innerHTML = paratha;
document.querySelector(".rayta").innerHTML = rayta;
document.querySelector(".salad").innerHTML = salad;
document.querySelector(".chinese").innerHTML = chinese;
}
};

//  ------------------Function to toggle dark mode-----------------------------
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");

  // Get the mode icon element
  const modeIcon = document.getElementById("mode-icon");

  // Toggle the icon between moon and sun based on the dark mode class
  if (body.classList.contains("dark-mode")) {
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");

    localStorage.setItem("darkMode", "enabled");
  } else {
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");

    localStorage.setItem("darkMode", "disabled");

  }
}
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const modeIcon = document.getElementById("mode-icon");

  // Check if the user has a preference in localStorage
  const darkModePreference = localStorage.getItem("darkMode");

  if (darkModePreference === "enabled") {
    body.classList.add("dark-mode");
    modeIcon.classList.remove("fa-moon");
    modeIcon.classList.add("fa-sun");
  } else {
    body.classList.remove("dark-mode");
    modeIcon.classList.remove("fa-sun");
    modeIcon.classList.add("fa-moon");
  }
});

// JavaScript function to zoom in on an image
function zoomImage(image) {
  const zoomedImage = document.getElementById('zoomed-image');
  const imageZoomContainer = document.getElementById('image-zoom-container');
  
  zoomedImage.src = image.src;
  imageZoomContainer.style.display = 'block';
}

// JavaScript function to close the zoomed-in image
function closeZoomImage() {
  const imageZoomContainer = document.getElementById('image-zoom-container');
  imageZoomContainer.style.display = 'none';
}