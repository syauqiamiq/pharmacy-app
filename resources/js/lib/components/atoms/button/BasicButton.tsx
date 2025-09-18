import { Button } from "antd";
import clsx from "clsx";
import { IBasicButtonProps } from "./interfaces";

/**
 * Basic Button
 * Component button ini digunakan sebagai reusable button pada seluruh project Gihon
 */
const BasicButton = ({
  title,
  type = "button",
  variant = "contained",
  size = "large",
  className,
  onClick,
}: IBasicButtonProps) => {
  return variant == "contained" ? (
    <Button
      htmlType={type}
      className={clsx("text-white min-w-40", className)}
      type="primary"
      size={size}
      onClick={onClick}
    >
      {title ?? "-"}
    </Button>
  ) : variant == "outlined" ? (
    <Button
      htmlType={type}
      className={clsx("min-w-40", className)}
      type="default"
      size={size}
      onClick={onClick}
    >
      {title ?? "-"}
    </Button>
  ) : variant == "text" ? (
    <Button
      htmlType={type}
      className={clsx("min-w-40", className)}
      type="text"
      size={size}
      onClick={onClick}
    >
      {title ?? "-"}
    </Button>
  ) : (
    <></>
  );
};

export default BasicButton;
