import { PrimaryButton } from 'components/Buttons'
import { createCheckout } from 'utils/api/payment'

export const Payment = () => {
  const handleCheckout = async () => {
    const paymentResponse = await createCheckout()
    window.location.href = paymentResponse.checkoutUrl
  }

  return (
    <div>
      <h2>Payment screen</h2>
      <h3>Click button below to activate Stripe checkout</h3>
      <PrimaryButton text='Checkout' handler={handleCheckout} />
    </div>
  )
}
