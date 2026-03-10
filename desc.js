document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const index = params.get('index');

  if (!index) {
    document.body.innerHTML = "<h2>Product not found.</h2>";
    return;
  }

  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const product = products[index];
      if (!product) {
        document.body.innerHTML = "<h2>Product not found.</h2>";
        return;
      }

      document.getElementById('product-name').textContent = product.Name;
      document.getElementById('product-price').textContent = product.Price;
      document.getElementById('product-desc').textContent = product.Description;
      document.getElementById('product-skin').textContent = product["Skin Type"] || product["Skin type"];

      const imgElement = document.getElementById('product-image');

      const basePath = `imagesProd/prod${Number(index) + 1}`;
      imgElement.src = `${basePath}.jpeg`;
      imgElement.onerror = () => {
        imgElement.src = `${basePath}.jpg`;
      };
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
      document.body.innerHTML = "<h2>Unable to load product details.</h2>";
    });
});