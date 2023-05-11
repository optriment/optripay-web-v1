import React from 'react'
import { Header } from 'semantic-ui-react'

const Screen: React.FC = () => (
  <>
    <Header as="h1" content="Welcome to your buyer dashboard!" />

    <p>
      Here, you can browse and search for items and view your purchase history.
    </p>

    <p>
      With a connected wallet, you can easily make purchases, manage your
      orders, and keep track of your transactions.
    </p>

    <p>
      We&apos;re thrilled to have you as a part of our community and look
      forward to helping you find your next great purchase!
    </p>
  </>
)

export default Screen
