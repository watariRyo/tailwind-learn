'use client';

import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { useState } from 'react';
import { Input } from './ui/input';

interface DatepickerProps {
  id: string;
  className?: string;
}

export default function Datepicker(props: DatepickerProps) {
  const [date, setDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setDate(date);
    setIsOpen(false); // 日付選択後にPopoverを閉じる
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Input
          id={props.id}
          value={date ? date.toLocaleDateString() : ''}
          placeholder='YYYY-MM-DD'
          className={props.className ? props.className : 'col-span-3 text-left'}
          readOnly
        />
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={date}
          onSelect={handleDateSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
