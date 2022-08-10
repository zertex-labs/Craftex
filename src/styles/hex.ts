// https://stackoverflow.com/a/68767912
type HexDigit =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F";

type HexColor<T extends string> =
  T extends `#${HexDigit}${HexDigit}${HexDigit}${infer Rest1}`
    ? Rest1 extends ``
      ? T
      : Rest1 extends `${HexDigit}${HexDigit}${HexDigit}`
      ? T
      : never
    : never;

export type Color = string & { __type: "HexColor" };
export function hex<T extends string>(s: HexColor<T>): Color {
  return s;
}
