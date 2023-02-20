import React from 'react';

type LabelProps = {
  title: string;
};
export const Label = ({ title }: LabelProps) => (
  <h1 className={`text-white bg-stone-700 p-2 px-6 rounded dark:bg-white dark:text-stone-700`}>{title}</h1>
);
export const CenteredLabel = ({ title }: LabelProps) => (
  <div className="h-full flex justify-center items-center">
    <Label title={title} />
  </div>
);
