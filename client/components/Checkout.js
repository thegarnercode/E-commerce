// This is a helper function we create to handle the payment via Stripe Checkout.

import StripeCheckout from 'react-stripe-checkout'; // import the StripeCheckout function from react-stripe-checkout.

const STRIPE_PUBLISHABLE = 'pk_test_********************'; // Add our Stripe publishable key

const onToken = (user,checkout) => token => 
    checkout(user, token.id); // onToken to just checkout with the user and the token id, 

const Checkout = ({ amount, user, checkout }) => // Checkout function, which takes in the amount, user, and checkout from the Cart component
    <StripeCheckout
      amount={amount*100} // Use StripeCheckout with the amount in the lowest currency value, the token, currency, and the stripe key.
      token={onToken(user,checkout)}
      currency='INR'
      stripeKey={STRIPE_PUBLISHABLE}
/>

export default Checkout;