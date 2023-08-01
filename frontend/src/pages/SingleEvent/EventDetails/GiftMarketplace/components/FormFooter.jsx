import { Box, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { setNewEvent } from '../../../redux/features/events/eventSlice';
// import { DeleteEvent } from '../../../redux/features/events/service';
// import { dispatch } from '../../../redux/store';
// import { CancelModal } from './FormHeader';

const FormFooter = ({ step, action }) => {
  // const { newEvent } = useSelector(state => state.event);
  // const [openModal, setOpenModal] = useState(false);
  // const DiscardAction = () => {
  //   if (newEvent) {
  //     dispatch(DeleteEvent(newEvent.id));
  //     localStorage.removeItem('newEvent');
  //     dispatch(setNewEvent(null));
  //   }
  //   setOpenModal(true);
  // };

  return (
    <>
      {/* {openModal && <CancelModal setOpenModal={setOpenModal} />} */}
      <Box
        borderTop="1px solid lightgray"
        bgColor="#fff"
        py="3"
        h="65px"
        position="fixed"
        bottom="0"
        w="100%"
        margin="auto"
      >
        <Box display="flex" padding="0px 120px" justifyContent="flex-end">
          <Button
            bg="#00BFB2"
            fontSize={14}
            fontWeight="semibold"
            color="white"
            onClick={action}
            w='150px'
          >
            Finish
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormFooter;