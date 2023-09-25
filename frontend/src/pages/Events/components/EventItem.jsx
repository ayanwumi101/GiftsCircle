import React, { useEffect } from 'react';
import {
  Box,
  Text,
  Heading,
  Button,
  Flex,
  HStack,
  Image,
} from '@chakra-ui/react';
import calendarIcon from '../../../components/assets/calendar.svg';
import lockIcon from '../../../components/assets/lock.svg';
import { CheckIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { socket } from '../../../socket';
import { dispatch } from '../../../redux/store';
import { setUserNotifications } from '../../../redux/features/user/userSlice';

const EventItem = ({
  id,
  image,
  title,
  descSummary,
  published,
  date,
  guest,
}) => {
  const { user, notifications } = useSelector(state => state.user);

  useEffect(() => {
    if (user && guest) {
      socket.on(id, (...args) => {
        dispatch(setUserNotifications([...args, ...notifications]));
      });
    }
  }, [user, id, guest, notifications]);

  return (
    <Box bg="white" mb="5" py={[4, 7]} px={[5, 8]} borderRadius={5} key={id}>
      <HStack justifyContent={['flex-start','space-between']} alignItems={['flex-start', 'center']} flexWrap='wrap'>
        <Box>
          <HStack gap={2.5} alignItems={['flex-start', 'center']}>
            <Box>
              <Image
                src={image}
                w={['140px', '120px']}
                h={['120px', '110px']}
                borderRadius={5}
                objectFit="cover"
                mb={[3, 0]}
              />
              <Box display={['block', 'none']}>
                <Link to={`/dashboard/event_details/${id}`}>
                  <Button
                    bg="#00BFB2"
                    color="white"
                    size="sm"
                    fontWeight={'medium'}
                    px="20px"
                    py="10px"
                    borderRadius={5}
                    h="40px"
                  >
                    View event
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box>
              <Box textAlign={'left'}>
                <Heading
                  fontWeight={'medium'}
                  fontSize="18px"
                  lineHeight={'26px'}
                  mb="2"
                >
                  {title}
                </Heading>
                <Text fontSize={14} textAlign="left" fontWeight={400} mb="2">
                  {descSummary}
                </Text>
                <Flex fontSize={14} gap={[3,5]} color="#717171" flexWrap='wrap'>
                  <Flex alignItems={'center'} gap={1}>
                    <Image src={calendarIcon} />
                    <Text>{new Date(date).toDateString()}</Text>
                  </Flex>
                  {!guest && (
                    <Flex alignItems={'center'} gap={1}>
                      <Image src={lockIcon} />
                      {id}
                    </Flex>
                  )}
                  {!guest && (
                    <Flex alignItems={'center'} gap={1} mb={[2, 0]}>
                      <CheckIcon color={published ? '#00BFB2' : '#717171'} />{' '}
                      <Text color={published ? '#00BFB2' : '#717171'}>
                        {published ? 'Active' : 'saved to draft'}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Box>
            </Box>
          </HStack>
        </Box>

        <Box display={['none', 'block']}>
          <Link to={`/dashboard/event_details/${id}`}>
            <Button
              bg="#00BFB2"
              color="white"
              size="sm"
              fontWeight={'medium'}
              px="20px"
              py="10px"
              borderRadius={5}
              h="35px"
            >
              View event
            </Button>
          </Link>
        </Box>
      </HStack>
    </Box>
  );
};

export default EventItem;
