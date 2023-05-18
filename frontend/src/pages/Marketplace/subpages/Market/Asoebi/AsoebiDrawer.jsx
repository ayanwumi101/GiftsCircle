import React, { useContext } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Text,
  Heading,
  Flex,
  Button,
} from '@chakra-ui/react';
import { AsoebiContext } from '.';
import CartItem from './CartItem';
import { AddManyEventAsoebiApi } from '../../../../../redux/axios/apis/asoebi';
import { dispatch } from '../../../../../redux/store';
import { GetEventAsoebis } from '../../../../../redux/features/events/service';
import PaymentButton from '../../../../../components/Buttons/PaymentButton';

const AsoebiDrawer = ({ openDrawer, setOpenDrawer, eventId }) => {
  const { onClose } = useDisclosure({ defaultIsOpen: true });

  const { data, AsoebiItems, setAsoebiItems, addForGuest, amount } =
    useContext(AsoebiContext);

  const btnRef = React.useRef();
  const closeModal = () => {
    setOpenDrawer(false);
  };

  const HandleSubmit = async () => {
    try {
      let res = await AddManyEventAsoebiApi(AsoebiItems);
      if (res.data) {
        dispatch(GetEventAsoebis(eventId));
        setAsoebiItems([]);
        setOpenDrawer(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Drawer
        isOpen={openDrawer}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={closeModal} />

          <DrawerHeader>
            <Heading fontWeight="medium" fontSize="25px" mb="2">
              Asoebi List ({data.length})
            </Heading>
            <Text fontWeight="medium" fontSize="14px">
              Find all the asoebis you have added here...
            </Text>
          </DrawerHeader>

          <DrawerBody>
            {data.map(ele => (
              <CartItem item={ele} key={ele?.asoebiItem} />
            ))}
          </DrawerBody>
          {!addForGuest && (
            <Box
              p="8"
              display="flex"
              justifyContent="space-between"
              fontWeight="700"
              fontSize="18px"
            >
              <Text>Total Amount</Text>
              <Text>N {amount}</Text>
            </Box>
          )}
          <Box textAlign="left" p="8">
            <Flex justifyContent="flex-end">
              {addForGuest ? (
                <Button
                  bg="#00BFB2"
                  color="white"
                  onClick={() => HandleSubmit()}
                >
                  Save Changes
                </Button>
              ) : (
                <PaymentButton amount={amount} action={closeModal} />
              )}
            </Flex>
          </Box>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AsoebiDrawer;
