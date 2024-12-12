/* eslint-disable @typescript-eslint/no-explicit-any */
export type Normal = {
  className?: string;
  children?: React.ReactNode;
  appearance?: "primary" | "secondary" | "minimal";
  [key: string]: any;
};

export type InputChange = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export type Submit = React.FormEvent<HTMLFormElement>;
