import  { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Option {
  value: string;
  label: string;
}

interface SelectComponentProps {
  selectedOption: string;
  onValueChange: (value: string) => void;
  options: Option[];
}

const SelectComponent: FC<SelectComponentProps> = ({
  selectedOption,
  onValueChange,
  options,
}) => {
  const selectedLabel = options.find(
    (option) => option.value === selectedOption
  )?.label;

  return (
    <Select onValueChange={onValueChange} value={selectedOption}>
      <SelectTrigger className="capitalize w-44 border-gray-600">
        <SelectValue>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-[#141430] text-white/90">
        {options.map((option) => (
          <SelectItem
            className="capitalize"
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
