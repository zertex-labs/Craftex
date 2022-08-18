import React, { HTMLAttributes } from "react";

export type ErrorProps = {
  error: string | undefined;
} & HTMLAttributes<HTMLDivElement>;

const Error: React.FC<ErrorProps> = ({ error, ...props }) => {
  return (
    <React.Fragment>
      {error && (
        <div {...props}>
          <span className="text-red-400 marker:text-sm">{error}</span>
        </div>
      )}
    </React.Fragment>
  );
};

export default Error;
