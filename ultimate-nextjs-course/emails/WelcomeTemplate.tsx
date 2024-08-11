import React, { CSSProperties } from 'react'
import { Html, Body, Text, Container, Link, Preview, Tailwind } from '@react-email/components'

const WelcomeTemplate = ({ name }: {name: string}) => {
  return (
    <Html>
        <Preview>Welcome to NextJS</Preview>
        <Body style={{background: '#fff'}}>
           <Tailwind>
            <Container>
                <Text className="font-bold text-3xl">Hi {name}.</Text>
                <Text>
                    This is a simple example of a NextJS email template.
                </Text>
                <Link href="https://nextjs.org/">Learn More</Link>
            </Container>
           </Tailwind>
        </Body>
    </Html>
  )
}

export default WelcomeTemplate
