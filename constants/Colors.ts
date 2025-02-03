const tintColorLight = "#007AFF";
const tintColorDark = "#fff";

const sharedColors = {
  primary: "#CD9A49",
  lime: "#D7FFD4",
  pink: "#F655FF",
  brown: "#29271D",
  sky: "#E5EDFF",
  teal: "#0E4D45",
  yellow: "#FCBB80",
  orange: "#EF580B",
  blue: "#0000FA",
  green: "#172E15",
  grey: "#242026",
  greyLight: "#B8B3BA",
  input: "#EEE9F0",
  selected: "#F7F2F9",
} as const;

export const Colors = {
  ...sharedColors,
  light: {
    text: "#000",
    background: "#fff",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    ...sharedColors,
  },
  dark: {
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    ...sharedColors,
  },
} as const;

export default Colors;