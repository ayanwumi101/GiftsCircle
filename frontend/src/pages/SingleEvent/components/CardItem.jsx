import { Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Card = ({ item }) => {
  const [type, setType] = useState('IMAGE');

  useEffect(() => {
    console.log('hey');
    if (item.includes('.mp4')) {
      setType('VIDEO');
    } else {
      setType('IMAGE');
    }
  }, [item]);

  return (
    <>
      <Box
        w="310px"
        minH="332px"
        bg="white"
        p="2.5"
        borderRadius={10}
        boxShadow="sm"
        mb="5"
        cursor="pointer"
      >
        {type === 'IMAGE' ? (
          <Image
            src={item}
            w="310px"
            h="332px"
            borderRadius={10}
            alt="item item image"
            display="block"
            mx="auto"
            mb="2.5"
          />
        ) : (
          <video controls width="100%" poster={item.replace('.mp4', '.jpg')}>
            <source src={item} type="video/mp4" />
            Sorry, your browser doesn't support videos.
          </video>
        )}
      </Box>
    </>
  );
};

export default Card;
