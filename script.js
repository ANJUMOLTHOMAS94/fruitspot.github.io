// Load products dynamically on homepage
if (document.getElementById("products")) {
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            let container = document.getElementById("products");
            data.forEach(product => {
                container.innerHTML += `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p>${product.price}</p>
                        <button onclick="viewProduct(${product.id})">View Details</button>
                    </div>
                `;
            });
        });
}

// View product details
function viewProduct(id) {
    localStorage.setItem("selectedProduct", id);
    window.location.href = "product.html";
}

// Load product details page
if (document.getElementById("product-details")) {
    let id = localStorage.getItem("selectedProduct");
    fetch("products.json")
        .then(res => res.json())
        .then(data => {
            let product = data.find(p => p.id == id);
            document.getElementById("product-details").innerHTML = `
                <img src="${product.image}" style="width:100%;max-width:500px;">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <p><strong>${product.price}</strong></p>
                <button onclick="orderProduct('${product.name}')">Order Now</button>
            `;
        });
}

// Order product
function orderProduct(name) {
    localStorage.setItem("orderProduct", name);
    window.location.href = "order.html";
}

// Fill order form
if (document.getElementById("orderForm")) {
    document.getElementById("productName").value = localStorage.getItem("orderProduct");
    document.getElementById("orderForm").addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("orderConfirmation").innerText =
            `✅ Thank you! Your order for ${localStorage.getItem("orderProduct")} has been placed.`;
        this.reset();
    });
}
