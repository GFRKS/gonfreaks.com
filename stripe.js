// Replace with your Stripe publishable key
const stripe = Stripe('pk_live_51QPCmd008vQHUmH0tCs6YwzAgWFDutdhhL78AY6pxWUzNrIrMOSCRQTYEoXzAGiiRbFTu9U2w5fe4ZkEpLdVhRNB00y9qohEFl');

// Event listener for the payment button
document.getElementById('checkout-button').addEventListener('click', async () => {
    try {
        // Call your backend to create a checkout session
        const response = await fetch('https://gonfreaks-com.vercel.app/api/backendcode.js', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        const { id } = await response.json();

        // Redirect to Stripe Checkout
        const result = await stripe.redirectToCheckout({ sessionId: id });

        if (result.error) {
            alert(result.error.message); // Display error if any
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});
