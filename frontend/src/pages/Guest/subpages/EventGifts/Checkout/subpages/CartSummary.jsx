import { Box, Heading, Text, Divider, Stack, Flex } from '@chakra-ui/react';
import React, { useContext } from 'react';
// import { setCheckoutData } from '../../../../redux/features/marketplace/marketSlice';
import PaymentButton from '../../../../../../components/Buttons/PaymentButton';
import { CheckoutContext, DeliveryContext } from '../../../..';
import { BuyItemsApi } from '../../../../../../redux/axios/apis/marketPlace';
import { DeliveryTransApi } from '../../../../../../redux/axios/apis/delivery';
import { useSelector } from 'react-redux';
import { CartContext } from '../..';
import { BuyGiftsApi } from '../../../../../../redux/axios/apis/gift';


const CartSummary = ({ data, amount, deliveryAmount, setShowCheckout,}) => {
  
  const {checkoutAmount, cartLength, deliveryFee, itemsData, setItemsData} = useContext(CheckoutContext);
  const { newDeliveryData, deliveryData, setDeliveryData } = useContext(DeliveryContext);
  const {newEvent} = useSelector(state => state.event)

  const newDeliveryFee = Math.round(((deliveryFee * checkoutAmount)/100));

  const singleItem = newDeliveryData.map((item) => {
    const newData = {
      item: item.title,
      deliveryFee: ((deliveryFee * item.amount) / 100),
    }
    return newData
  });

  const HandleSubmit = async () => {
    if (cartLength > 0) {
      const res = await BuyGiftsApi(itemsData);
      await DeliveryTransApi(newEvent.user_id, singleItem);
      if (res.data) {
        setShowCheckout(false);
        setItemsData([]);
      }
    } 
  };

  return (
    <Box bg="white" p="4" w="100%" borderRadius={5}>
      <Stack direction="column" spacing={4}>
        <Heading fontWeight="bold" textAlign="center" fontSize={18}>
          Order Summary
        </Heading>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
          <Text>{`Item's total (${cartLength})`}</Text>
          <Heading fontWeight="medium" fontSize={18}>
            ₦ {checkoutAmount}
          </Heading>
        </Flex>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Delivery Fee</Text>
          <Heading fontWeight="medium" fontSize={18}>
            ₦ {newDeliveryFee}
          </Heading>
        </Flex>
        <Divider />
        <Flex alignItems="center" justifyContent="space-between">
          <Text>Total</Text>
          <Heading fontWeight="medium" fontSize={18}>
            ₦ {checkoutAmount + newDeliveryFee}
          </Heading>
        </Flex>
        <Divider />

        {/* {newDeliveryFee !== 0 && ( */}
          <PaymentButton
            amount={checkoutAmount + newDeliveryFee}
            action={HandleSubmit}
          />
        {/* )} */}
      </Stack>
    </Box>
  );
};

export default CartSummary;
