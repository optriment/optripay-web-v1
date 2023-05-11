import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { Menu } from './components'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => (
  <Grid container columns={1}>
    <Grid.Column>
      <Menu />
    </Grid.Column>

    <Grid.Column>
      <Segment size="big">{children}</Segment>
    </Grid.Column>
  </Grid>
)

export default Layout
