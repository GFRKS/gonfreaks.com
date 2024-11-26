const express = require('express');
const stripe = require('stripe')('pk_live_51QPCmd008vQHUmH0tCs6YwzAgWFDutdhhL78AY6pxWUzNrIrMOSCRQTYEoXzAGiiRbFTu9U2w5fe4ZkEpLdVhRNB00y9qohEFl');
const app = express();

app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Payment for $10',
                    },
                    unit_amount: 1000, // Amount in cents ($10)
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: 'https://gonfreaks.com/success',
        cancel_url: 'https://gonfreaks.com/cancel',
    });
    res.json({ id: session.id });
});

app.listen(4242, () => console.log('Server running on port 4242'));
