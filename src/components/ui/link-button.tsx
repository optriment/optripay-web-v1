import React from 'react'
import { Button } from 'semantic-ui-react'

interface Props {
  href: string
  content: string
}

const Component = ({ href, content }: Props) => (
  <Button primary size="big" as="a" href={href} content={content} />
)

export default Component
