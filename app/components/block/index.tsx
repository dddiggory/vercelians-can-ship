import {PropsWithChildren} from "react";
import styles from "./block.module.css";
import {clsx} from "clsx";

interface BlockProps {
  className?: string;
  variant?:
    | "light-gray"
    | "medium-gray"
    | "subtle"
    | "inverted"
    | "green"
    | "purple";
}

export function Block({
  children,
  className,
  variant = "subtle",
}: PropsWithChildren<BlockProps>) {
  return (
    <section
      className={clsx(styles.block, variant && styles[variant], className)}
    >
      {children}
    </section>
  );
}
