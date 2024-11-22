document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        alert("Product not found!");
        return;
    }

    const productData = localStorage.getItem('products');

    if (!productData) {
        alert("No products found in localStorage.");
        return;
    }

    const products = JSON.parse(productData);
    const product = products.find(p => p.id == productId);
    if (!product) {
        alert("Product not found!");
        return;
    }

    console.log("Product loaded:", product);

    document.getElementById('product-id').textContent = product.id || 'N/A';
    document.getElementById('product-name').textContent = product.name || 'N/A';
    document.getElementById('category').textContent = product.category || 'N/A';
    document.getElementById('short-description').textContent = product.shortDescription || 'N/A';
    document.getElementById('full-description').textContent = product.fullDescription || 'N/A';
    document.getElementById('brand').textContent = product.brand || 'N/A';
    document.getElementById('main-image').src = product.mainImage || product.image || 'default-image.jpg';
    document.getElementById('list-price').textContent = product.listPrice ? `$${product.listPrice}` : 'N/A';
    document.getElementById('discount').textContent = product.discount ? `${product.discount}%` : 'N/A';
    document.getElementById('enabled').textContent = product.enabled ? 'Yes' : 'No';
    document.getElementById('in-stock').textContent = product.inStock ? 'Yes' : 'No';
    document.getElementById('creation-time').textContent = product.creationTime || 'N/A';
    document.getElementById('update-time').textContent = product.updateTime || 'N/A';
    document.getElementById('dimensions').textContent =  
    `Length: ${product.dimensions.length || 'N/A'}, ` +
    `Width: ${product.dimensions.width || 'N/A'}, ` +
    `Height: ${product.dimensions.height || 'N/A'}, ` +
    `Weight: ${product.dimensions.weight || 'N/A'}`;
    document.getElementById('cost').textContent = product.cost ? `$${product.cost}` : 'N/A';

    const detailsList = document.getElementById('product-details-list');
    detailsList.innerHTML = '';

    if (Array.isArray(product.details)) {
        product.details.forEach(detail => {
            const listItem = document.createElement('li');

            if (typeof detail === 'object') {
                listItem.textContent = detail.info || Object.values(detail).join(': ');
            } else {
                listItem.textContent = detail;
            }

            detailsList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "No details.";
        detailsList.appendChild(listItem);
    }
});
