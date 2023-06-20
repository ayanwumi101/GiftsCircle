import React from 'react';
import {
  Box,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const Search = ({ setSearchQuery, searchQuery, setFilter, filter }) => {
  return (
    <Box>
      <FormControl>
        <Flex justifyContent={'space-between'}>
          <InputGroup w="87%">
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="#8C8C8C" />}
            />
            <Input
              type="text"
              onChange={e => setSearchQuery(e.target.value)}
              value={searchQuery}
              outline="none"
              placeholder="Search anything in events"
              bg="white"
              border="none"
              fontSize={13}
              color="#8C8C8C"
              letterSpacing={0.5}
            />
          </InputGroup>

          <Select
            placeholder="Filter"
            variant={'flushed'}
            bg="#555555"
            w="10%"
            borderRadius="5px"
            _placeholder={{ color: 'white' }}
            onChange={e => setFilter(e.target.value)}
            value={filter}
          >
            <option value="Birthday">Birthday</option>
            <option value="Naming Ceremony">Naming Ceremony</option>
            <option value="Retirement Ceremony">Retirement Ceremony</option>
            <option value="Graduation">Graduation Ceremony</option>
            <option value="Induction">Induction Ceremony</option>
            <option value="Wedding">Wedding Ceremony</option>
            <option value="Funeral">Funeral Ceremony</option>
          </Select>
        </Flex>
      </FormControl>
    </Box>
  );
};

export default Search;
