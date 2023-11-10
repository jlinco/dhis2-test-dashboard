'use client'

import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Dashboard } from '@/lib/data'
import { FileType, Mails, Star, Map } from 'lucide-react'
import { renderVizTypeIcons } from '@/lib/helperWidgets'
import { useSearchParams } from 'next/navigation'
import { useLocalStorage } from '@/lib/storageHook'

const DashboardWidget = ({
  allDashboards
}: {
  allDashboards: Array<Dashboard>
}) => {
  const [items, setValue] = useLocalStorage<string[]>('starredDashboards', [])
  const searchParams = useSearchParams()

  const [starredDashboards, setStarredDashboards] = useState<string[]>(items)

  const updateStarredDashboards = (e: React.MouseEvent<HTMLElement>) => {
    const dashId = e.currentTarget.id
    const starredIdx = starredDashboards.indexOf(dashId)
    if (starredIdx === -1) {
      const newItems = [...starredDashboards, dashId]
      setStarredDashboards(newItems)
      setValue(newItems)
    } else {
      const splicedItems = starredDashboards.toSpliced(starredIdx, 1)
      setStarredDashboards(splicedItems)
      setValue(splicedItems)
    }
  }

  useEffect(() => {
    if (items) {
      setStarredDashboards(items)
    } else {
      setStarredDashboards([])
    }
  }, [items])
  const renderContent = (
    nodeId: React.Key | null | undefined,
    type: string,
    content: any
  ) => {
    switch (type) {
      case 'VISUALIZATION':
        return (
          <li
            key={nodeId}
            className="flex flex-row items-center justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 ">
            <div className="w-[16px]">
              {renderVizTypeIcons(content.visualization.type)}
            </div>{' '}
            <span>{content.visualization.name}</span>
          </li>
        )
      case 'MAP':
        return (
          <li
            key={nodeId}
            className="flex flex-row items-center justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 ">
            <div className="w-[16px]">
              <Map size={16} color="#615c5c" />
            </div>{' '}
            <span>{content.map.name}</span>
          </li>
        )
      case 'MESSAGES':
        return (
          <li
            key={nodeId}
            className="flex flex-row items-center justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 ">
            <div className="w-[16px]">
              <Mails size={16} color="#615c5c" strokeWidth={1} />
            </div>{' '}
            <span>{'Messages'}</span>
          </li>
        )
      case 'TEXT':
        return (
          <li
            key={nodeId}
            className=" flex flex-row items-start justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 ">
            <div className="w-[16px]">
              <FileType size={16} color="#615c5c" />
            </div>{' '}
            <span>{content.text}</span>
          </li>
        )
      default:
        return 'N/A'
    }
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full space-y-4"
      defaultValue={allDashboards[0].id}>
      {allDashboards.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className="bg-white rounded-lg shadow-sm my-4 px-4 py-0 relative">
          <AccordionTrigger className="flex flex-row items-center w-full">
            <p className="text-base font-semibold justify-self-start mr-auto">
              {item.displayName}
            </p>
          </AccordionTrigger>
          <div className="absolute right-9 top-3">
            <button
              className="shadow-md bg-blue-300 rounded-sm w-[30px] h-[30px] justify-center items-center flex flex-col"
              aria-label="Toggle Star"
              id={item.id}
              onClick={updateStarredDashboards}>
              <Star
                size={16}
                fill={
                  starredDashboards.includes(item.id) ? '#000000' : '#ffffff'
                }
              />
            </button>
          </div>
          <AccordionContent>
            {item.dashboardItems.length > 0 ? (
              <ul className="divide-solid divide-y-2 divide-gray-200">
                {item.dashboardItems.map(
                  (
                    dash: { type?: any; visualization?: { name: string } },
                    idx: React.Key | null | undefined
                  ) => renderContent(idx, dash.type, dash)
                )}
              </ul>
            ) : (
              <p className="text-xs">
                No <b>{searchParams.get('query')?.toString()}</b> items in this
                section
              </p>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default DashboardWidget
