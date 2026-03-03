import { screen, render, within } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi, } from 'vitest'
import { PaymentSummary } from './PaymentSummary'
import { MemoryRouter, useLocation } from 'react-router'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

vi.mock('axios')

describe('PaymentSummary Component', () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {

    paymentSummary = {
      totalItems: 3,
      productCostCents: 5280,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 5779,
      taxCents: 578,
      totalCostCents: 6357
    }

    loadCart = vi.fn()
    user = userEvent.setup();

  })

  it('display the correct details', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    )

    expect(
      screen.getByText('Items (3):')
    ).toBeInTheDocument();

    // There are multiple ways to check the text inside an element.
    // 1. within() + getByText() + toBeInTheDocument()

    expect(
      within(screen.getByTestId('payment-summary-productCostCents'))
        .getByText('$52.80')
    ).toBeInTheDocument();

    // 2. getByTestId() + toHaveTextContent()
    // (toHaveTextContent() checks the text inside an element)
    // This solution is a little cleaner in this case.

    expect(
      screen.getByTestId('payment-summary-productCostCents')
    ).toHaveTextContent('$52.80')

    expect(
      screen.getByTestId('payment-summary-shippingCostCents')
    ).toHaveTextContent('$4.99')

    expect(
      screen.getByTestId('payment-summary-totalCostBeforeTaxCents')
    ).toHaveTextContent('$57.79')

    expect(
      screen.getByTestId('payment-summary-taxCents')
    ).toHaveTextContent('$5.78')

    expect(
      screen.getByTestId('payment-summary-totalCostCents')
    ).toHaveTextContent('$63.57')


  })

  it('places an order', async () => {

    function Location() {
      const location = useLocation();

      return (<div data-testid="url-path">
        {location.pathname}
      </div>)
    }

    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    )

    const placeOrderButton = screen.getByTestId('place-order-button')
    await user.click(placeOrderButton)

    expect(axios.post).toHaveBeenCalledWith('/api/orders');

    expect(loadCart).toHaveBeenCalled();

    expect(screen.getByTestId('url-path')).toHaveTextContent('/orders');

  })
})