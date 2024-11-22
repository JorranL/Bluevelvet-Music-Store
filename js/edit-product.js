document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (!productId) {
        alert("Product not found!");
        return;
    }

    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const product = storedProducts.find(p => p.id == productId);

    if (!product) {
        alert("Product not found!");
        return;
    }

    document.getElementById("name").value = product.name || "";
    document.getElementById("shortDescription").value = product.shortDescription || "";
    document.getElementById("fullDescription").value = product.fullDescription || "";
    document.getElementById("brand").value = product.brand || "";
    document.getElementById("category").value = product.category || "";
    document.getElementById("listPrice").value = product.listPrice || "";
    document.getElementById("discountPercent").value = product.discount || "";
    document.getElementById("enabled").checked = product.enabled || false;
    document.getElementById("inStock").checked = product.inStock || false;
    document.getElementById("length").value = product.dimensions?.length || "";
    document.getElementById("width").value = product.dimensions?.width || "";
    document.getElementById("height").value = product.dimensions?.height || "";
    document.getElementById("weight").value = product.dimensions?.weight || "";
    document.getElementById("cost").value = product.cost || "";
    document.getElementById("currentMainImage").src = product.mainImage || "default-image.jpg";

    const detailsContainer = document.getElementById("productDetails");
    detailsContainer.innerHTML = "";
    if (Array.isArray(product.details)) {
        product.details.forEach(detail => {
            const detailDiv = createDetailEntry(detail.name, detail.value);
            detailsContainer.appendChild(detailDiv);
        });
    }

    document.getElementById("addDetail").addEventListener("click", () => {
        const newDetail = createDetailEntry();
        detailsContainer.appendChild(newDetail);
    });

    const mainImageInput = document.getElementById("mainImage");
    mainImageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                document.getElementById("currentMainImage").src = reader.result;
            };
            reader.readAsDataURL(file);
        }
    });

    document.getElementById("editProductForm").addEventListener("submit", event => {
        event.preventDefault();

        product.name = document.getElementById("name").value;
        product.shortDescription = document.getElementById("shortDescription").value;
        product.fullDescription = document.getElementById("fullDescription").value;
        product.brand = document.getElementById("brand").value;
        product.category = document.getElementById("category").value;
        product.mainImage = document.getElementById("currentMainImage").src;
        product.listPrice = document.getElementById("listPrice").value;
        product.discount = document.getElementById("discountPercent").value;
        product.enabled = document.getElementById("enabled").checked;
        product.inStock = document.getElementById("inStock").checked;
        product.dimensions = {
            length: document.getElementById("length").value,
            width: document.getElementById("width").value,
            height: document.getElementById("height").value,
            weight: document.getElementById("weight").value
        };
        product.cost = document.getElementById("cost").value;

        const updatedDetails = [];
        detailsContainer.querySelectorAll(".detail-entry").forEach(entry => {
            const name = entry.querySelector(".detail-name").value;
            const value = entry.querySelector(".detail-value").value;
            if (name && value) {
                updatedDetails.push({ name, value });
            }
        });
        product.details = updatedDetails;

        product.updateTime = new Date().toLocaleString("pt-BR", {
            timeZone: "America/Sao_Paulo",
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const productIndex = storedProducts.findIndex(p => p.id == productId);
        if (productIndex !== -1) {
            storedProducts[productIndex] = product;
            localStorage.setItem("products", JSON.stringify(storedProducts));
        }

        alert("Product updated successfully!");
        window.location.href = "dashboard.html";
    });
});

function createDetailEntry(name = "", value = "") {
    const detailDiv = document.createElement("div");
    detailDiv.classList.add("detail-entry");
    detailDiv.innerHTML = `
        <input type="text" class="detail-name" placeholder="Detail Name" value="${name}">
        <input type="text" class="detail-value" placeholder="Detail Value" value="${value}">
        <button type="button" class="remove-detail">Remove</button>
    `;
    detailDiv.querySelector(".remove-detail").addEventListener("click", () => {
        detailDiv.remove();
    });
    return detailDiv;
}
