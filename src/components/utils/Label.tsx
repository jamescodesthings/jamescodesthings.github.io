import React from 'react';

type LabelProps = {
  title: string;
};
export const Label = ({ title }: LabelProps) => (
  <h1 className={`text-type bg-type p-2 px-6 rounded dark:bg-text-type dark:text-type-dark`}>{title}</h1>
);
export const CenteredLabel = ({ title }: LabelProps) => (
  <div className="h-full flex justify-center items-center">
    <Label title={title} />
  </div>
);
