import React, { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  ModalFooter,
} from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { UploadEventMessageApi } from '../../../../../../redux/axios/apis/media';

const MessageModal = ({ setShowModal, open, setData }) => {
  const { onClose } = useDisclosure();
  const [message, setMessage] = useState('');
  const { user } = useSelector(state => state.user);
  const { newEvent } = useSelector(state => state.event);

  const formBody = {
    userId: user.id,
    eventId: newEvent.id,
    message: message,
  };

  //modules for react quill editor
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
    ],
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const sendMessage = async () => {
    try {
      await UploadEventMessageApi(formBody);
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      onClose={onClose}
      isOpen={open}
      isCentered
    >
      <ModalOverlay />
      <ModalContent w="750px" h="480px" overflow="auto" bg="white" p="3">
        <Box mb="10">
          <ModalCloseButton onClick={closeModal} />
          <ModalBody>
            <Box textAlign="center" mb="5">
              <VStack spacing={3}>
                <Heading fontWeight={600} fontSize="23px" mb="3">
                  Send a message to your host
                </Heading>
              </VStack>
            </Box>

            <Box textAlign="center">
              <ReactQuill
                theme="snow"
                dangerouslySetInnerHTML={{ __html: message }}
                onChange={setMessage}
                value={message}
                modules={modules}
                style={{ height: '240px', borderRadius: '12px' }}
              />
            </Box>
          </ModalBody>
        </Box>
        <ModalFooter position="absolute" bottom="0" right="0">
          <Button
            fontWeight="medium"
            fontSize={14}
            color="white"
            onClick={sendMessage}
            bg="#00BFB2"
          >
            Send Message
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
