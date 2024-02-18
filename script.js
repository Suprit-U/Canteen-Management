document.addEventListener("DOMContentLoaded", function()
{
    class Node
    {
        constructor(item)
        {
            this.item = item;
            this.next = null;
        }
    }

    class LinkedList
    {
        constructor()
        {
            this.head = new Node(null);
        }

        addToCart(item)
        {
            const newNode = new Node(item);
            newNode.next = this.head.next;
            this.head.next = newNode;
        }

        removeFromCart(itemId)
        {
            let current = this.head;
            while (current.next !== null && current.next.item.id !== itemId)
            {
                current = current.next;
            }

            if (current.next !== null)
            {
                current.next = current.next.next;
            }
        }

        getCartItems()
        {
            const cartItems = [];
            let current = this.head.next;
            while (current !== null)
            {
                cartItems.push(current.item);
                current = current.next;
            }
            return cartItems;
        }

        getTotalPrice()
        {
            let totalPrice = 0;
            let current = this.head.next;
            while (current !== null)
            {
                totalPrice += current.item.price;
                current = current.next;
            }
            return totalPrice;
        }
    }

    const itemsContainer = document.getElementById("items-container");
    const cartItemsList = document.getElementById("cartItemsList");
    const totalPriceValue = document.querySelector(".total-price-value");
    const cartButton = document.getElementById("cart-button");
    const closeCartButton = document.getElementById("close-cart-button");
    const buyNowBtn = document.getElementById("buy-now-btn");
    let cartList = new LinkedList();

    const itemMap = new Map();
    const itemsData = [
    { id: '1', name: 'Samosa', description: ' ', price: 15.00, image: '(1).jpg' },
    { id: '2', name: 'Tea', description: ' ', price: 10.00, image: '(2).jpg' },
    { id: '3', name: 'Coffee', description: ' ', price: 10.00, image: '(3).jpg' },
    { id: '4', name: 'Badam Milk', description: ' ', price: 15.00, image: '(4).jpg' },
    { id: '5', name: 'Gobi Manchurian', description: ' ', price: 50.00, image: '(5).jpg' },
    { id: '6', name: 'Gulab Jamun', description: ' ', price: 30.00, image: '(6).jpg' },
    { id: '7', name: 'South Indian Meals', description: ' ', price: 70.00, image: '(7).jpg' },
    { id: '8', name: 'Pulao', description: ' ', price: 40.00, image: '(8).jpg' },
    { id: '9', name: 'Fried Rice', description: ' ', price: 50.00, image: '(9).jpg' },
    { id: '10', name: 'Manchurian', description: ' ', price: 60.00, image: '(10).jpg' },
    { id: '11', name: 'Dahi Puri', description: ' ', price: 35.00, image: '(11).jpg' },
    { id: '12', name: 'Masala Dosa', description: ' ', price: 40.00, image: '(12).jpg' },
    { id: '13', name: 'Set Dosa', description: ' ', price: 40.00, image: '(13).jpg' },
    { id: '14', name: 'Idli', description: ' ', price: 40.00, image: '(14).jpg' },
    { id: '15', name: 'Noodles', description: ' ', price: 50.00, image: '(15).jpg' },
    { id: '16', name: 'Lays', description: ' ', price: 20.00, image: '(16).jpg' },
    { id: '17', name: 'Pepsi', description: ' ', price: 20.00, image: '(17).jpg' },
    { id: '18', name: 'PaperBoat', description: ' ', price: 20.00, image: '(18).jpg' },
    { id: '19', name: 'PaperBoat Swing', description: ' ', price: 20.00, image: '(19).jpg' },
    { id: '20', name: 'Mangalore Buns', description: ' ', price: 30.00, image: '(20).jpg' },
    { id: '21', name: 'Chocolate Ice Cream Cone', description: ' ', price: 35.00, image: '(21).jpg' },
    { id: '22', name: 'Mountain Dew', description: ' ', price: 20.00, image: '(22).jpg' },
    { id: '23', name: 'Rajasthani Kulfi', description: ' ', price: 20.00, image: '(23).jpg' },
    { id: '24', name: 'Chaat', description: ' ', price: 35.00, image: '(24).jpg' },
    { id: '25', name: 'Unibic Choco Nut Cookies', description: ' ', price: 10.00, image: '(25).jpg' },
    { id: '26', name: 'Hide & Seek', description: ' ', price: 30.00, image: '(26).jpg' },
    { id: '27', name: 'JimJam', description: ' ', price: 10.00, image: '(27).jpg' },
];


    function addToCart(itemId)
    {
        const item = itemMap.get(itemId);
        cartList.addToCart(item);
        updateCart();
    }

    function updateCart()
    {
        cartItemsList.innerHTML = "";
        const cartItems = cartList.getCartItems();
        let totalPrice = 0;

        cartItems.forEach((item) =>
        {
            const cartItem = document.createElement("li");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <span class="cart-item-name">${item.name}</span>
                <span class="cart-item-price">₹${item.price.toFixed(2)}</span>
                <button class="remove-from-cart" data-id="${item.id}">Remove</button>
            `;
            cartItemsList.appendChild(cartItem);
            totalPrice += item.price;
        });

        totalPriceValue.textContent = `₹${totalPrice.toFixed(2)}`;
        attachRemoveEventListeners();
    }

    function removeFromCart(itemId)
    {
        cartList.removeFromCart(itemId);
        updateCart();
    }

    function toggleCart()
    {
        const cartElement = document.getElementById("cart");
        cartElement.classList.toggle("open");
    }

    function attachRemoveEventListeners()
    {
        const removeButtons = document.querySelectorAll(".remove-from-cart");

        removeButtons.forEach((button) =>
        {
            button.addEventListener("click", () =>
            {
                const itemId = button.getAttribute("data-id");
                removeFromCart(itemId);
            });
        });
    }

    function processOrder(order)
    {
        localStorage.setItem("cartItems", JSON.stringify(order));

        setTimeout(() =>
        {
            window.location.href = "receipt.html";
        }, 500);
    }

    function getOrderReceipt(order)
    {
        let receipt = "Items:\n";

        order.forEach((item, index) =>
        {
            receipt += `${item.name} - ₹${item.price.toFixed(2)}`;
            if (index < order.length - 1)
            {
                receipt += '\n';
            }
        });

        receipt += `\n\nTotal Price: ₹${cartList.getTotalPrice().toFixed(2)}`;

        return receipt;
    }

    buyNowBtn.addEventListener("click", function()
    {
        const cartItems = cartList.getCartItems();
        if (cartItems.length > 0)
        {
            processOrder(cartItems);
            cartList = new LinkedList();
            updateCart();

            setTimeout(() =>
            {
                window.location.href = "receipt.html";
            }, 500);
        }
        else
        {
            alert("Your cart is empty. Please add some items before buying.");
        }
    });

    cartButton.addEventListener("click", toggleCart);
    closeCartButton.addEventListener("click", toggleCart);

    itemsData.forEach((item) =>
    {
        const itemElement = document.createElement("div");
        itemElement.classList.add("item");
        itemElement.setAttribute("data-id", item.id);
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>Price: ₹${item.price.toFixed(2)}</p>
            <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
        `;

        itemsContainer.appendChild(itemElement);
        itemMap.set(item.id, item);
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart");

    addToCartButtons.forEach((button) =>
    {
        button.addEventListener("click", () =>
        {
            const itemId = button.getAttribute("data-id");
            addToCart(itemId);
        });
    });
});
