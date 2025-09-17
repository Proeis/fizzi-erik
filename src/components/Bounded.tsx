import clsx from "clsx";

type BoundedProps = {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
};

export const Bounded = ({
  as,
  className,
  children,
  ...restProps
}: BoundedProps) => {

  let Comp = as || "section";

  if (Comp != "section" && Comp != "p" && Comp != "div" && Comp != "h1" && Comp != "h2" && Comp != "h3" && Comp != "h4" && Comp != "h5") Comp = "section";


  return (
    <Comp
      className={clsx("px-4 first:pt-10 md:px-6", className)}
      {...restProps}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
        {children}
      </div>
    </Comp>
  );
};