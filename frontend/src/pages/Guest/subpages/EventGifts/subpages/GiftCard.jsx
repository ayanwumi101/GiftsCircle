import React, { useState } from 'react'
import { Button, Flex, Image, Text, Box } from '@chakra-ui/react'
import ContributionModal from '../../ContributionModal'

const GiftCard = ({gift}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
     {openModal && <ContributionModal setOpenModal={setOpenModal} />}
      <Box
          w="285px"
          minH="250px"
          bg="white"
          p="2.5"
          borderRadius={10}
          boxShadow="sm"
          mb="5"
          cursor="pointer"
          key={gift?.id}
      >
          <Image
              src={gift?.image}
              w="279"
              h="142px"
              borderRadius={10}
              alt="gift item image"
              display="block"
              mx="auto"
              mb="2.5"
            //   onClick={() => openDrawer(gift)}
          />
          <Text fontSize={14} fontWeight={400} mb="2" color="#383838">
              {/* {gift?.details} */}
              Traditional Olive Wood 5 piece Kitchen Utensil set
          </Text>
          <Flex alignItems="center" justifyContent="space-between">
              <Text color="#27272E" fontWeight={600} fontSize={18}>
                  {/* ₦ {gift?.amount} */} ₦ 155,000
              </Text>
              <Button
                  fontSize={13}
                  fontWeight={500}
                //   bg={addedGiftItems.includes(gift?.id) ? 'grey' : '#00BFB2'}
                  bg="#00BFB2"
                  color="white"
                  w="129px"
                  h="40px"
                  onClick={() => setOpenModal(true)}
                //   onClick={() => AddGift(gift?.id)}
                  id={gift?.id}
              >
                Purchase
                  {/* {addedGiftItems.includes(gift?.id) ? 'Added' : 'Add to list'} */}
              </Button>
          </Flex>
      </Box>
    </>
  )
}

export default GiftCard