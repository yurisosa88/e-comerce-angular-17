// This is your test secret API key.
const stripe = Stripe("pk_test_51Pecol2LdZrK9JuixxpKko7YZUQAla9bWTQxZsveCfbxm4DXiWvt9OGT6L7HVm2p0nZsGN1Fg4CyyHcktVZoeWkp00zsKCzMXb");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}