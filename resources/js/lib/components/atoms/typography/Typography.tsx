import { Typography as BaseTypography } from "antd";
import clsx from "clsx";

import { ITypographyProps } from "./interfaces";

const { Text, Title } = BaseTypography;

/**
 * Main Typography component.
 */
const Typography = () => {
  return null;
};

/**
 * Paragraph Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyP component.
 * @returns {JSX.Element} The rendered TypographyP component.
 */
const TypographyP = ({ children, title }: ITypographyProps) => {
  return (
    <div className="flex flex-col gap-1">
      {title && <div className="font-medium">{title}</div>}
      <Text>{children}</Text>
    </div>
  );
};

/**
 * H1 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH1 component.
 * @returns {JSX.Element} The rendered TypographyH1 component.
 */
const TypographyH1 = ({ children, subtitle }: ITypographyProps) => {
  return (
    <div className="flex flex-col mb-0">
      <Title level={1} className={clsx(subtitle && "!mb-0")}>
        {children}
      </Title>
      <Text>{subtitle}</Text>
    </div>
  );
};

/**
 * H2 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH2 component.
 * @returns {JSX.Element} The rendered TypographyH2 component.
 */
const TypographyH2 = ({ children, subtitle }: ITypographyProps) => {
  return (
    <div className="flex flex-col">
      <Title level={2} className={clsx(subtitle && "!mb-0")}>
        {children}
      </Title>
      <Text>{subtitle}</Text>
    </div>
  );
};

/**
 * H3 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH3 component.
 * @returns {JSX.Element} The rendered TypographyH3 component.
 */
const TypographyH3 = ({ children, subtitle }: ITypographyProps) => {
  return (
    <div className="flex flex-col">
      <Title level={3} className={clsx(subtitle && "!mb-0")}>
        {children}
      </Title>
      <Text>{subtitle}</Text>
    </div>
  );
};

/**
 * H4 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH4 component.
 * @returns {JSX.Element} The rendered TypographyH4 component.
 */
const TypographyH4 = ({ children, subtitle }: ITypographyProps) => {
  return (
    <div className="flex flex-col">
      <Title level={4} className={clsx(subtitle && "!mb-0")}>
        {children}
      </Title>
      <Text>{subtitle}</Text>
    </div>
  );
};

/**
 * H5 Typography component.
 * @param {ITypographyProps} props - The properties for the TypographyH5 component.
 * @returns {JSX.Element} The rendered TypographyH5 component.
 */
const TypographyH5 = ({ children, subtitle }: ITypographyProps) => {
  return (
    <div className="flex flex-col">
      <Title level={5} className={clsx(subtitle && "!mb-0")}>
        {children}
      </Title>
      <Text>{subtitle}</Text>
    </div>
  );
};

Typography.p = TypographyP;
Typography.h1 = TypographyH1;
Typography.h2 = TypographyH2;
Typography.h3 = TypographyH3;
Typography.h4 = TypographyH4;
Typography.h5 = TypographyH5;

export default Typography;
