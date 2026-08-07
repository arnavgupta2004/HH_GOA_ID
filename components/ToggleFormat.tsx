export type Format = "profile" | "card";

export type ToggleFormatProps = {
  value: Format;
  onChange: (value: Format) => void;
};

// Implemented in the polish step: segmented toggle between Profile Frame
// and Builder Card.
export function ToggleFormat(_props: ToggleFormatProps) {
  return null;
}
