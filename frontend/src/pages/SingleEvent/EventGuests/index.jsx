import React, {useState, useEffect} from 'react'
import { Box, Button, position } from '@chakra-ui/react'
import GuestList from './subpages/GuestList'
import CoHostList from './subpages/CoHostList'
import { GetEventCohostsApi } from '../../../redux/axios/apis/events'
import { useSelector } from 'react-redux'

const Index = () => {
  const [navPosition, setNavPosition] = useState(0);
  const [coHost, setCoHost] = useState([]);
  const {newEvent} = useSelector(state => state.event)

  const getEventCohost = async () => {
    try {
      const res = await GetEventCohostsApi(newEvent.id);
      const data = res.data;
      console.log(data);
      setCoHost(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEventCohost();
  }, [newEvent]);
  return (
    <Box minH='400px'>
      <Tabs position={navPosition} setNavPosition={setNavPosition} />
      {navPosition === 0 && <GuestList />}
      {navPosition === 1 && <CoHostList data={coHost} />}
    </Box>
  )
}

export default Index


export const Tabs = ({navPosition, setNavPosition}) => {
  const options = ['Guests', 'Co-Hosts']
  const handleClick = (index) => {
    setNavPosition(index)
  }
  return (
    <Box mb='5'>
      {options.map((option, index) => <Button
        borderRadius={100}
        fontSize={14}
        bg="none"
        onClick={() => handleClick(index)}
        style={
          index === navPosition
            ? {
              backgroundColor: '#CCF2F0',
              padding: '8px 15px',
              borderRadius: '100px',
              color: '#009F94',
            }
            : { fontWeight: 'bold' }
        }
      >
        {option}
      </Button>)}
    </Box>
  )
}