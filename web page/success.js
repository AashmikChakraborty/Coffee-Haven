// ===============================
// Coffee Haven - Success Page
// ===============================

// Get order details from localStorage
const orderId = localStorage.getItem("orderId") || "CH100001";
const total = localStorage.getItem("orderTotal") || "0";
const payment = localStorage.getItem("paymentMethod") || "Cash on Delivery";

// Current Date
const today = new Date();

const formattedDate = today.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric"
});

// Display data
document.getElementById("orderId").textContent = orderId;
document.getElementById("orderTotal").textContent = total;
document.getElementById("paymentMethod").textContent = payment;
document.getElementById("orderDate").textContent = formattedDate;

// ===============================
// Download Receipt
// ===============================

const receiptBtn = document.getElementById("downloadReceipt");

receiptBtn.addEventListener("click", () => {

    const receipt = `
========================================

        COFFEE HAVEN

========================================

Order ID : ${orderId}

Payment  : ${payment}

Total    : ₹${total}

Date     : ${formattedDate}

========================================

Thank you for choosing Coffee Haven!

Visit Again ❤️

========================================
`;

    const blob = new Blob([receipt], { type: "text/plain" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = `Receipt-${orderId}.txt`;

    a.click();

    URL.revokeObjectURL(url);

});

// ===============================
// Success Animation
// ===============================

window.addEventListener("load", () => {

    const card = document.querySelector(".success-card");

    card.style.transform = "scale(0.95)";

    setTimeout(() => {

        card.style.transition = "0.4s ease";

        card.style.transform = "scale(1)";

    }, 200);

});