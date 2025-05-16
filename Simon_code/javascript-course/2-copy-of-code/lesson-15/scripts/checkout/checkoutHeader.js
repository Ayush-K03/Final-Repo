export function renderCheckoutHeader(cart){
    let total=0;
    cart.forEach((value) => {
        total=total+value.quantity;
    });

    document.querySelector('.checkout-header').innerHTML=`      
        <div class="header-content">
            <div class="checkout-header-left-section">
            <a href="amazon.html">
                <img class="amazon-logo" src="images/amazon-logo.png">
                <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
            </a>
            </div>

            <div class="checkout-header-middle-section">
            Checkout (<a class="return-to-home-link"
                href="amazon.html">${total} items</a>)
            </div>

            <div class="checkout-header-right-section">
            <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>`
    
}
