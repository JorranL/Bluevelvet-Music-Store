document.addEventListener("DOMContentLoaded", function () {
    const mainImageInput = document.getElementById("mainImage");
    const productMainImage = document.getElementById("productMainImage");

    mainImageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = function () {
                productMainImage.src = reader.result;
                productMainImage.style.display = 'block';
                console.log('Image loaded in src:', productMainImage.src);
            };
            reader.onerror = function () {
                console.error("Error loading image.");
            };
            reader.readAsDataURL(file);
        } else {
            console.warn("No file selected.");
        }
    });

    const addDetailBtn = document.getElementById("addDetailBtn");
    addDetailBtn.addEventListener("click", function () {
        const productDetails = document.getElementById("productDetails");

        const detailNameInput = productDetails.querySelector("input[placeholder='Detail Name']");
        const detailValueInput = productDetails.querySelector("input[placeholder='Detail Value']");

        const detailName = detailNameInput.value.trim();
        const detailValue = detailValueInput.value.trim();

        if (detailName && detailValue) {
            const detailDiv = document.createElement("div");
            detailDiv.className = "detail-pair";
            detailDiv.innerHTML = `
                <input type="text" value="${detailName}" placeholder="Detail Name" readonly>
                <input type="text" value="${detailValue}" placeholder="Detail Value" readonly>
            `;
            productDetails.appendChild(detailDiv);

            detailNameInput.value = "";
            detailValueInput.value = "";
        } else {
            alert("Please fill in both fields before adding a detail.");
        }
    });

    document.getElementById("createProductForm").addEventListener("submit", function (event) {
        event.preventDefault();

        let list = JSON.parse(localStorage.getItem('products')) || [];

        const nextId = list.length > 0 ? list[list.length - 1].id + 1 : 1;

        const product = {
            id: nextId,
            name: document.getElementById("name").value,
            shortDescription: document.getElementById("shortDescription").value,
            fullDescription: document.getElementById("fullDescription").value,
            brand: document.getElementById("brand").value,
            category: document.getElementById("category").value,
            mainImage: productMainImage.src,
            listPrice: parseFloat(document.getElementById("listPrice").value),
            discount: document.getElementById("discountPercent").value,
            enabled: document.getElementById("enabled").checked,
            inStock: document.getElementById("inStock").checked,
            dimensions: {
                length: parseFloat(document.getElementById("length").value),
                width: parseFloat(document.getElementById("width").value),
                height: parseFloat(document.getElementById("height").value),
                weight: parseFloat(document.getElementById("weight").value)
            },
            cost: parseFloat(document.getElementById("cost").value),
            details: [],
            creationTime: new Date().toLocaleString("pt-BR", {
                timeZone: "America/Sao_Paulo",
                hour12: false,
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            })
        };

        const detailPairs = document.querySelectorAll("#productDetails .detail-pair");
        detailPairs.forEach(pair => {
            const detailName = pair.querySelector("input[placeholder='Detail Name']").value;
            const detailValue = pair.querySelector("input[placeholder='Detail Value']").value;
            if (detailName && detailValue) {
                product.details.push({ name: detailName, value: detailValue });
            }
        });

        list.push(product);
        localStorage.setItem("products", JSON.stringify(list));

        alert("Product added successfully!");
        document.getElementById("createProductForm").reset();
        productMainImage.src = "";
        productMainImage.style.display = 'none';
        document.querySelectorAll("#productDetails .detail-pair").forEach(pair => pair.remove());
    });
});
