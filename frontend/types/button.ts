export interface ButtonComponentProps {
  text: string;
  type?: "primary" | "dashed" | "link" | "text" | "default";
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
}
