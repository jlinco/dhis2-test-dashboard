'use client'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Toggle } from './ui/toggle';
import { Dashboard } from '@/lib/data';
import { FileType, Mails, Star, Map } from 'lucide-react';
import { renderVizTypeIcons } from '@/lib/helperWidgets';
// import { renderContent } from '@/lib/helperWidgets';

const DashboardWidget = ({ allDashboards }: {
  allDashboards: Array<Dashboard>
}) => {

  const renderContent = (nodeId: React.Key | null | undefined, type: string, content: any) => {
    switch (type) {
      case 'VISUALIZATION':
        return <li key={nodeId} className='flex flex-row items-center justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 '>{renderVizTypeIcons(content.visualization.type)} <span>{content.visualization.name}</span></li>;
      case 'MAP':
        return <li key={nodeId} className='flex flex-row items-center justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 '><Map size={16} color="#615c5c" /> <span>{content.map.name}</span></li>;
      case 'MESSAGES':
        return <li key={nodeId} className='flex flex-row items-center justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 '><Mails size={16} color="#615c5c" strokeWidth={1} /> <span>{'Messages'}</span></li>;
      case 'TEXT': {
        const title = content.text.includes('\n') ? content.text.split('\n')[0] : content.text
        return <li key={nodeId} className=' flex flex-row items-start justify-start w-full space-x-2 text-xs py-2 leading-normal text-gray-600 '><FileType size={16} color="#615c5c" /> <span>{title}</span></li>;
      }
      default:
        return 'N/A'
    }
  }

  return (
    <Accordion type="single" collapsible className="w-full space-y-4" defaultValue={allDashboards[0].id}>
      {allDashboards.map((item) => (
        <AccordionItem key={item.id} value={item.id} className="bg-white rounded-lg shadow-sm my-4 px-4 py-0 relative">
          <AccordionTrigger className='flex flex-row items-center w-full'>
            <p className='text-base font-semibold justify-self-start mr-auto'>{item.displayName}</p>
          </AccordionTrigger>
          <div className='absolute right-8 top-2'>
            <Toggle aria-label='Toggle Star' pressed={item.starred}>
              <Star size={16} fill={item.starred ? '#000000' : '#ffffff'} />
            </Toggle>
          </div>
          <AccordionContent>
            <ul className='divide-solid divide-y-2 divide-gray-200'>
              {item.dashboardItems.map((dash: { type?: any; visualization?: { name: string; }; }, idx: React.Key | null | undefined) => (
                renderContent(idx, dash.type, dash)
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default DashboardWidget