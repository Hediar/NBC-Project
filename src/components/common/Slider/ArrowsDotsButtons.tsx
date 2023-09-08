'use client';
import { SVGLightNextButton, SVGLightPrevButton } from '@/styles/icons/IconsETC';
import React, { PropsWithChildren } from 'react';

type PropType = PropsWithChildren<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
>;

export const DotButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

export const PrevButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      <SVGLightPrevButton className="w-12 h-12" />
      {children}
    </button>
  );
};

export const NextButton: React.FC<PropType> = (props) => {
  const { children, ...restProps } = props;

  return (
    <button type="button" {...restProps}>
      <SVGLightNextButton className="w-12 h-12" />
      {children}
    </button>
  );
};
