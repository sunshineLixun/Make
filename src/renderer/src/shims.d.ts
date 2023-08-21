import type { AttributifyAttributes } from "@unocss/preset-attributify";

// Unocss 类型补充
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-unused-vars
  interface HTMLAttributes<T> extends AttributifyAttributes {}
}
