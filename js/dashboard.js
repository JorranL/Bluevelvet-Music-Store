document.addEventListener("DOMContentLoaded", () => {
    const nome = localStorage.getItem("rememberedName")
    const role = localStorage.getItem("rememberedRole")
    
    document.getElementById("userName").textContent = nome;
    document.getElementById("userRole").textContent = role;

    initializeProducts();
});

let currentPage = 1;
const productsPerPage = 10;

function initializeProducts() {
    const productList = document.getElementById("productList");
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    const productsToShow = storedProducts.slice(startIndex, endIndex);

    productList.innerHTML = "";

    productsToShow.forEach((product, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${startIndex + index + 1}</td>
            <td><img src="${product.mainImage || product.image}" alt="${product.name}" style="width: 100px; height: 100px;"></td>
            <td>${product.name}</td>
            <td>${product.brand}</td>
            <td>${product.category}</td>
            <td>
                <button onclick="viewDetails(${startIndex + index})">View Details</button>
                <button onclick="editProduct(${startIndex + index})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${startIndex + index})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });

    setupPagination(storedProducts.length);
}

function setupPagination(productCount) {
    const paginationDiv = document.getElementById("pagination");
    paginationDiv.innerHTML = "";

    const totalPages = Math.ceil(productCount / productsPerPage);

    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener("click", () => changePage(currentPage - 1));
    paginationDiv.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.textContent = i;
        pageButton.className = i === currentPage ? "active" : "";
        pageButton.addEventListener("click", () => changePage(i));
        paginationDiv.appendChild(pageButton);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => changePage(currentPage + 1));
    paginationDiv.appendChild(nextButton);

    paginationDiv.style.display = totalPages > 1 ? "block" : "none";
}

function changePage(pageNumber) {
    currentPage = pageNumber;
    initializeProducts();
}

function deleteProduct(index) {
    const role = localStorage.getItem("rememberedRole")
    if(role === "admin" || role === "editor"){
        const confirmation = confirm("Are you sure you want to delete this product?");
    if (confirmation) {
        let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        storedProducts.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(storedProducts));
        
        const totalProducts = storedProducts.length;
        if (currentPage > Math.ceil(totalProducts / productsPerPage)) {
            currentPage = Math.ceil(totalProducts / productsPerPage);
        }
        initializeProducts();
    }
    }else{
        alert("Only administrators or editors have access to this function");
    }
    
}

document.getElementById("addProductBtn").addEventListener("click", () => {
    const role = localStorage.getItem("rememberedRole")
    if(role === "admin" || role === "editor"){
        window.location.href = "create-product.html";
    }else{
        alert("Only administrators or editors have access to this page");
    }
});

document.getElementById("resetProductsBtn").addEventListener("click", () => {
    const initialProducts = [
        { id: 0, name: "Guided by Voices - Bee Thousand", brand: "Matador Records", category: "CD", image: "images/gbv-bee-thousand-cover.jpeg" },
        { id: 1, name: "Pavement - Slanted and Enchanted", brand: "Domino Recording Co", category: "MP3", image: "images/pavment-slanted-and-enchanted-cover.jpeg" },
        { id: 2, name: "Neutral Milk Hotel T-Shirt", brand: "Merge Records", category: "T-Shirt", image: "images/neutral-milk-hotel-in-the-aeroplane-over-the-sea-tshirt.jpeg" },
        { id: 3, name: "Indie Rock 101", brand: "Music Books", category: "Book", image: "images/indie-101-book.jpg" },
        { id: 4, name: "The Jesus and Mary Chain Poster", brand: "Art & Prints", category: "Poster", image: "images/jamc-poster.png" },
        { id: 5, name: "My Bloody Valentine - Loveless", brand: "Creation Records", category: "CD", image: "images/mbv-loveless-cd.jpeg" },
        { id: 6, name: "Yo La Tengo - I Can Hear the Heart Beating as One", brand: "Matador Records", category: "MP3", image: "images/yo-la-tengo-you-can-hear-heart-beating-as-one-mp3.jpeg" },
        { id: 7, name: "Sonic Youth T-Shirt", brand: "Geffen Records", category: "T-Shirt", image: "images/sonic-youth-washing-machine-tshirt.jpeg" },
        { id: 8, name: "Our Band Could Be Your Life", brand: "Indie Publishing", category: "Book", image: "images/our-band-could-be-your-life-book.jpeg" },
        { id: 9, name: "The Velvet Underground Poster", brand: "Classic Prints", category: "Poster", image: "images/velvet-underground-poster.jpeg" }
    ];

    localStorage.setItem("products", JSON.stringify(initialProducts));
    initializeProducts();
});

function editProduct(productId) {
    const role = localStorage.getItem("rememberedRole")
    if(role === "admin" || role === "editor"){
        window.location.href = `edit-product.html?productId=${productId}`;
    }else{
        alert("Only administrators or editors have access to this page");
    }

}

document.addEventListener('DOMContentLoaded', () => {
    const productTableBody = document.getElementById('productList');
    const sortSelect = document.getElementById('sortSelect');

    sortSelect.addEventListener('change', (event) => {
        const sortBy = event.target.value;
        sortTable(sortBy);
    });

    function sortTable(sortBy) {
        const rows = Array.from(productTableBody.rows);

        rows.sort((a, b) => {
            let valueA, valueB;

            switch (sortBy) {
                case 'name':
                    valueA = a.cells[2].innerText.toLowerCase();
                    valueB = b.cells[2].innerText.toLowerCase();
                    break;
                case 'id':
                    valueA = parseInt(a.cells[0].innerText, 10);
                    valueB = parseInt(b.cells[0].innerText, 10);
                    break;
                case 'brand':
                    valueA = a.cells[3].innerText.toLowerCase();
                    valueB = b.cells[3].innerText.toLowerCase();
                    break;
                case 'category':
                    valueA = a.cells[4].innerText.toLowerCase();
                    valueB = b.cells[4].innerText.toLowerCase();
                    break;
                default:
                    return 0;
            }

            if (valueA < valueB) return -1;
            if (valueA > valueB) return 1;
            return 0;
        });

        rows.forEach(row => productTableBody.appendChild(row));
    }
});

const searchInput = document.getElementById('searchInput');
const productList = document.getElementById('productList');

searchInput.addEventListener('input', function () {
    const searchValue = searchInput.value.toLowerCase();
    const rows = productList.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const cells = row.getElementsByTagName('td');
        let match = false;

        for (let j = 0; j < cells.length - 1; j++) {
            if (cells[j].textContent.toLowerCase().includes(searchValue)) {
                match = true;
                break;
            }
        }

        row.style.display = match ? '' : 'none';
    }
});

function viewDetails(productId) {
    window.location.href = `view-product.html?id=${productId}`;
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}

document.getElementById("logoutBtn").addEventListener("click", logout);

const redirectRegister = document.getElementById("redirect-register");
const role = localStorage.getItem("rememberedRole")
    if (redirectRegister) {
        redirectRegister.addEventListener("click", function () {
            if (role == "admin") {
                location.href = "register.html"; 
            } else {
                alert("Only administrators have access to this page"); 
            }
        });
    }
