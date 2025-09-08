import { Select, SelectItem } from "@heroui/select";
import { ReactElement } from "react";

import { Option } from "@/types";

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}

export default function FilterSelect({
  label,
  value,
  onChange,
  options,
}: Props): ReactElement {
  return (
    <div className="flex flex-col gap-[8px] flex-1">
      <div className="flex justify-between text-base items-center">
        <span>{label}</span>
        {value && (
          <button
            className="text-[#F14C35] cursor-pointer"
            onClick={() => onChange("all")}
          >
            Clear
          </button>
        )}
      </div>
      <Select
        aria-label={label}
        classNames={{ trigger: "rounded-none" }}
        selectedKeys={[value]}
        onSelectionChange={(keys) => {
          const [selected] = Array.from(keys);

          onChange(selected as string);
        }}
      >
        {options.map((opt) => (
          <SelectItem key={opt.key}>{opt.label}</SelectItem>
        ))}
      </Select>
    </div>
  );
}
