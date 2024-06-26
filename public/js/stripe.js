/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  const stripe = Stripe('pk_test_51P4vxPJNCKK59bZfdm5iM3zMLlMCjCL47NPQwDubxbm2Z1rhHyd3O0IlLabESKiSMTbzWyrXc1xDMRZ7coXUbWdz006SJVwtwG');

  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
