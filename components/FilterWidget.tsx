'use client'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const FilterWidget = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const filterValues = ['VISUALIZATION', 'MAP', 'TEXT', 'MESSAGES', 'ALL']

  const handleFilterSearch = (term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term && term !== 'ALL') {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }
  return (
    <Select onValueChange={handleFilterSearch} defaultValue={searchParams.get('query')?.toString()}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder='Filter Items...' aria-placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filterValues.map((filter, idx) => (
            <SelectItem key={idx} value={filter}>{filter}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterWidget