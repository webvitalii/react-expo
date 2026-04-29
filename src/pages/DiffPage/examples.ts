export const initialLeftText = `<section class="cart">
  <h2>Shopping cart</h2>
  <ul id="items"></ul>
  <p>Total: $0.00</p>
</section>

<script>
  var TAX_RATE = 0.07;

  function total(items) {
    var sum = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i].price != null) {
        sum = sum + items[i].price * items[i].qty;
      }
    }
    return sum + sum * TAX_RATE;
  }

  console.log('Total:', total(cart));
</script>`;

export const initialRightText = `<section class="cart" aria-label="Shopping cart">
  <h2>Your cart</h2>
  <ul id="items"></ul>
  <p>Total: <span id="total">$0.00</span></p>
  <button type="button">Checkout</button>
</section>

<script>
  const TAX_RATE = 0.07;

  const total = (items) => {
    const subtotal = items
      .filter((item) => item.price != null)
      .reduce((sum, item) => sum + item.price * item.qty, 0);
    return subtotal * (1 + TAX_RATE);
  };

  console.log('Total:', total(cart).toFixed(2));
</script>`;
