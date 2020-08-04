import React from "react";

function FancyCard(props) {
  const { title, forwardedRef, dragHandleProps, ...rest } = props;
  return (
    <div className={`list-group-item`} ref={forwardedRef} {...rest}>
      <div className="draghandle" {...dragHandleProps} />
      {title}
    </div>
  );
}

export const Card = React.forwardRef((props, ref) => (
  <FancyCard forwardedRef={ref} {...props} />
));
