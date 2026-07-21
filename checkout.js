// ===============================
// LOAD CART
// ===============================

const orderItems = document.getElementById("orderItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("coffeeCart")) || [];

let total = 0;

// Empty Cart
if(cart.length === 0){

    orderItems.innerHTML = `
        <p>Your cart is empty.</p>
    `;

}else{

    cart.forEach(item=>{

        const subtotal = item.price * item.quantity;

        total += subtotal;

        orderItems.innerHTML += `

            <div class="order-item">

                <div>

                    <h4>${item.name}</h4>

                    <small>
                        ₹${item.price} × ${item.quantity}
                    </small>

                </div>

                <strong>

                    ₹${subtotal}

                </strong>

            </div>

        `;

    });

}

totalPrice.textContent = total;

// ===============================
// CHECKOUT
// ===============================

document
.getElementById("checkoutForm")
.addEventListener("submit",function(e){

    e.preventDefault();

    const payment =
    document.querySelector(
        'input[name="payment"]:checked'
    ).value;

    const order = {

        customer:{

            name:document.getElementById("name").value,

            email:document.getElementById("email").value,

            phone:document.getElementById("phone").value,

            address:document.getElementById("address").value

        },

        payment,

        items:cart,

        total,

        orderId:
        "CH" +
        Math.floor(
            Math.random()*1000000
        ),

        date:new Date().toLocaleString()

    };

    localStorage.setItem(
        "coffeeOrder",
        JSON.stringify(order)
    );

    // Clear cart

    localStorage.removeItem("coffeeCart");

    // Go to success page
    

    window.location.href = "success.html";

});