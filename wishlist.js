function parsePrice(priceText) {
    const cleanedPrice = priceText.replace(/[^0-9,]/g, '').replace(',', '.');
    const price = parseFloat(cleanedPrice);

    // Debug: tampilkan harga yang diambil
    console.log("Harga yang diambil:", priceText, "-> Harga setelah parsing:", price);

    return isNaN(price) ? 0 : price;
}

// Fungsi untuk menambahkan produk ke wishlist
function addToWishlist() {
    const product = {
        id: document.getElementById("product-detail").dataset.id,
        name: document.getElementById("product-title").textContent,
        price: parsePrice(document.getElementById("product-price").textContent),
        image: document.getElementById("product-image").src
    };

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.some(item => item.id === product.id)) {
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        alert("Produk ditambahkan ke wishlist!");
    } else {
        alert("Produk sudah ada di wishlist.");
    }
}

// Fungsi untuk memformat harga ke dalam format rupiah
function formatPrice(price) {
    if (isNaN(price) || price === 0) { // Harga asli produk
    }
    return "" + price.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

// Fungsi untuk menampilkan produk di wishlist
function loadWishlist() {
    const wishlistContainer = document.getElementById("wishlist-container");
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = "<p class='text-center'>Wishlist Anda kosong.</p>";
        return;
    }

    wishlist.forEach(product => {
        const productElement = document.createElement("div");
        productElement.classList.add("col-md-4", "mb-4");

        productElement.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${formatPrice(product.price)}</p>
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Tambah ke Keranjang</button>
                        <button class="btn btn-danger remove-wishlist" data-id="${product.id}">Hapus</button>
                    </div>
                </div>
            </div>
        `;
        wishlistContainer.appendChild(productElement);
    });

    wishlistContainer.addEventListener("click", handleWishlistActions);
}

function removeFromWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    wishlist = wishlist.filter(item => item.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    loadWishlist();
}

function handleWishlistActions(event) {
    if (event.target.classList.contains("remove-wishlist")) {
        const id = event.target.dataset.id;
        removeFromWishlist(id);
    } else if (event.target.classList.contains("add-to-cart")) {
        // Tambahkan kode untuk menambahkan produk ke keranjang
    }
}
window.onload = loadWishlist;
