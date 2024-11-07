import { SelectPair } from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface SelectCommonProps {
  id: string;
  label: string;
  items: SelectPair[];
  valueChange?: (value: string) => void;
  disabled?: boolean;
  defaultValue?: string;
  className?: string;
}

export default function SelectCommon(props: SelectCommonProps) {
  return (
    <Select
      onValueChange={props.valueChange}
      disabled={props.disabled ? props.disabled : false}
    >
      <SelectTrigger
        className={props.className ? props.className : 'col-span-3 text-left'}
      >
        <SelectValue
          id={props.id}
          placeholder={props.defaultValue ? props.defaultValue : ''}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{props.label}</SelectLabel>
          {props.items.map((item, index) => (
            <SelectItem
              key={index}
              value={item.value}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
