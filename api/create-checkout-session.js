const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Payment for $10',
              },
              unit_amount: 1000, // 10 USD in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'https://gonfreaks.com/success',
        cancel_url: 'https://gonfreaks.com/cancel',
      });

      res.status(200).json({ id: session.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
