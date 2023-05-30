import { Box, Stack, Divider } from '@chakra-ui/react'
import React from 'react'
import DeliveryDetailsHeader from './subpages/DeliveryDetailsHeader'
import DeliveryDetailsFooter from './subpages/DeliveryDetailsFooter'
import DeliveryDetailsForm from './subpages/DeliveryDetailsForm'
import CartSummary from './subpages/CartSummary'
import DeliveryDetailsCard from './subpages/DeliveryDetailsCard'
import BackButton from '../../../components/Buttons/BackButton'

const Index = ({setShowCheckout}) => {

  const handleClick = () => {
    setShowCheckout(false);
  }

  return (
    <Box w='80%' mx='auto' my='8'>
      <BackButton action={handleClick} />
        <Stack direction={{base: 'column', md: 'row', lg: 'row'}} justifyContent='space-between' mt='5'>
            <Box bg='white' w={{base: '100%', lg: '65%'}} borderRadius={5} p='4'>
                <DeliveryDetailsHeader />
                <Divider />
                <DeliveryDetailsForm />
                <Divider />
                <DeliveryDetailsFooter />
                {/* <DeliveryDetailsCard /> */}
            </Box>
            
            <Box w={{base: '100%', lg: '30%'}}>
                <CartSummary />
            </Box>
        </Stack>
    </Box>
  )
}

export default Index