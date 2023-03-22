import { Box, Button } from '@chakra-ui/react';
import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteEvent } from '../../../redux/features/events/service';
import { dispatch } from '../../../redux/store';
import { CancelModal } from './FormHeader';

const FormFooter = ({ step, action }) => {
  const navigate = useNavigate();
  const { newEvent } = useSelector(state => state.event);
  const [openModal, setOpenModal] = useState(false);
  const DiscardAction = () => {
    if (newEvent) {
      dispatch(DeleteEvent(newEvent.id));
    }
    setOpenModal(true);
    // navigate('/dashboard');
  };

  return (
    <>
      {openModal && <CancelModal setOpenModal={setOpenModal} />}
    <Box
      borderTop="1px solid lightgray"
      bgColor="#fff"
      py="3"
      h="65px"
      position="fixed"
      bottom="0"
      w="100%"
    >
      <Box textAlign="right" mr="5">
        <Button
          mr="5"
          fontSize={12}
          fontWeight="semibold"
          bg="#EEEEEE"
          onClick={DiscardAction}
        >
          Discard
        </Button>
        <Button
          bg="#00BFB2"
          fontSize={12}
          fontWeight="semibold"
          color="white"
          onClick={action}
        >
          {step === 5 ? 'Finish' : 'Save and continue'}
        </Button>
      </Box>
    </Box>
    </>
  );
};

export default FormFooter;
