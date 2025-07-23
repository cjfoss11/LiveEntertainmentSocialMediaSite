"use client"

import { Input, InputGroup } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import { CiSearch } from "react-icons/ci";

interface SearchBarProps {
    onSearch: (query: string) => void,
    className?: string,
}

export default function SearchBar({...props}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    props.onSearch(newSearchTerm);
  };

  return (
    <InputGroup startElement={<CiSearch color="gray.300" />}>
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
    </InputGroup>
  );
}