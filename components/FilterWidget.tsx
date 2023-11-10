'use client'
import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const FilterWidget = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()
  const filterValues = ['VISUALIZATION', 'MAP', 'TEXT', 'MESSAGES', 'ALL']
  const filterPrefix =
    searchParams.get('query') === 'ALL' || !searchParams.get('query')
      ? 'Filter Items: '
      : 'Filtered By: '

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
    <Select
      onValueChange={handleFilterSearch}
      defaultValue={searchParams.get('query')?.toString()}>
      <SelectTrigger className="w-auto" role="button">
        <span className="inline-block mr-2">{filterPrefix}</span>
        <SelectValue placeholder=" All Types" aria-placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {filterValues.map((filter, idx) => (
            <SelectItem key={idx} value={filter}>
              {filter}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterWidget
