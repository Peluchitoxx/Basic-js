// Variables
const cartContainer = document.querySelector('#lista-carrito tbody');
const clearCartBtn = document.querySelector('#vaciar-carrito');
let cartItems = [];

// Events
loadEventListeners();

function loadEventListeners() {
  // Add course to cart
  document.querySelector('#lista-cursos').addEventListener('click', addCourses);

  // Remove course from cart
  cartContainer.addEventListener('click', removeProduct);

  // Clear cart
  clearCartBtn.addEventListener('click', () => {
    cartItems = []; // Empty the array
    syncStorage();
    updateCart();
  });

  // Load cart from localStorage
  document.addEventListener('DOMContentLoaded', loadCartFromStorage);
}

function addCourses(e) {
  e.preventDefault();
  if (e.target.classList.contains('agregar-carrito')) {
    const selectedCourse = e.target.parentElement.parentElement;
    const courseInfo = readCourseData(selectedCourse);

    // Check if the product already exists in the cart
    const productExists = cartItems.some(product => product.id === courseInfo.id);
    if (productExists) {
      // Update the quantity
      const products = cartItems.map(product => {
        if (product.id === courseInfo.id) {
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      cartItems = [...products];
    } else {
      // Add a new product
      cartItems = [...cartItems, courseInfo];
    }

    syncStorage();
    updateCart();
  }
}

function readCourseData(course) {
  const courseInfo = {
    image: course.querySelector('img').src,
    title: course.querySelector('h4').textContent,
    price: course.querySelector('.precio span').textContent,
    id: course.querySelector('a').getAttribute('data-id'),
    quantity: 1
  };
  return courseInfo;
}

function updateCart() {
  clearHTML();

  cartItems.forEach(product => {
    const { image, title, price, quantity, id } = product;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <img src="${image}" width="100">
      </td>
      <td>${title}</td>
      <td>${price}</td>
      <td>${quantity}</td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}"> X </a>
      </td>
    `;
    cartContainer.appendChild(row);
  });
}

function removeProduct(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const productId = e.target.getAttribute('data-id');

    // Remove from the cartItems array
    cartItems = cartItems.filter(product => product.id !== productId);

    syncStorage();
    updateCart();
  }
}

function clearHTML() {
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }
}

function syncStorage() {
  localStorage.setItem('cart', JSON.stringify(cartItems));
}

function loadCartFromStorage() {
  if (localStorage.getItem('cart')) {
    cartItems = JSON.parse(localStorage.getItem('cart'));
    updateCart();
  }
}