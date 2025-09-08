import { Input } from "@heroui/input";
import { CiSearch } from "react-icons/ci";
import { ReactElement } from "react";

interface Props {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

export default function FilterInput({
  label,
  value,
  onChange,
}: Props): ReactElement {
  return (
    <div className="flex flex-col gap-[8px] flex-1">
      <div className="flex justify-between text-base items-center">
        <span>{label}</span>
        {value && (
          <button
            className="text-[#F14C35] cursor-pointer"
            onClick={() => onChange("")}
          >
            Clear
          </button>
        )}
      </div>
      <Input
        classNames={{ inputWrapper: "rounded-none", input: "rounded-none" }}
        placeholder="Enter keyword"
        startContent={<CiSearch />}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
