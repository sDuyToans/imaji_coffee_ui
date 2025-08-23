import { ReactElement } from "react";
import { Button } from "@heroui/button";

interface Props {
  content: string;
  onClick: () => void;
  type: "button" | "submit" | "reset";
}

export default function PrimaryButton(props: Props): ReactElement {
  const { content, onClick, type } = props;

  return (
    <Button
      className={
        "text-primary border border-primary w-[164px] h-[48px] bg-transparent rounded-none dark:text-white dark:border-white"
      }
      type={type}
      onPress={onClick}
    >
      {content}
    </Button>
  );
}
