import React from 'react'
import {Box} from '@chakra-ui/react'
import Hero_1 from './Hero_1'
import Navbar from './Navbar'

const index = () => {
  return (
    <Box height='100%' overflowY={'auto'}>
        <Navbar />
        <Hero_1 />
    </Box>
  )
}

export default index