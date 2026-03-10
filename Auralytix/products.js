document.getElementById("skinType").addEventListener("change", function () {
    const selected = this.value;
    const allProducts = document.querySelectorAll(".product-box");

    allProducts.forEach(product => {
        const typeList = product.getAttribute("data-skintype");

        if (!typeList) {
            product.parentElement.style.display = "none"; // Hide if no type
            return;
        }

        const types = typeList.split(" ");
        const shouldShow = selected === "0" || types.includes(selected);

        product.parentElement.style.display = shouldShow ? "block" : "none";
    });
});