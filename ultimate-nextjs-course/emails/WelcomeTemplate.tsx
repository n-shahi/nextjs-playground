import React from 'react'
import { Html, Body, Text, Container, Link, Preview } from '@react-email/components'

const WelcomeTemplate = ({ name }: {name: string}) => {
  return (
    <Html>
        <Preview>Welcome to NextJS</Preview>
        <Body>
            <Container>
                <Text>Hi {name}.</Text>
                <Text>
                    This is a simple example of a NextJS email template.
                </Text>
                <Link href="https://nextjs.org/">Learn More</Link>
            </Container>
        </Body>
    </Html>
  )
}

export default WelcomeTemplate
