import { PropsWithChildren } from 'react';
import utils from '../../styles/utils.module.pcss';
import spacing from '../../styles/spacing.module.pcss';

type ContainerProps = {
  /**
   * If true fits the cotainer to 100vh (adjusted).
   */
  screen?: boolean;

  /**
   * If true hides this content in print
   */
  hideInPrint?: boolean;
};
export const Container = ({ children, screen, hideInPrint }: PropsWithChildren<ContainerProps>) => {
  let className = `${utils.contain} ${spacing.pb} ${spacing.firstPt}`;
  if (screen) className += ` ${utils.screen}`;
  if (hideInPrint) className += ` print:hidden`;
  return <div className={className}>{children}</div>;
};
