import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import classNames from 'classnames';
import './button.css';

// Adapted from shadcn/ui Button (MIT, Copyright (c) 2023 shadcn).
// https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx
// Native CSS / 44px Raystream geometry; license: public/shadcn-ui-license.txt.
const buttonVariants = cva('button', {
  variants: {
    variant: {
      default: 'button-default',
      destructive: 'button-destructive',
      outline: 'button-outline',
      secondary: 'button-secondary',
      ghost: 'button-ghost',
      link: 'button-link',
    },
    size: {
      default: 'button-size-default',
      sm: 'button-size-sm',
      lg: 'button-size-lg',
      icon: 'button-size-icon',
    },
  },
  defaultVariants: { variant: 'default', size: 'default' },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, type, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp
      ref={ref}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      type={asChild ? type : type ?? 'button'}
      className={classNames(buttonVariants({ variant, size }), className)}
      {...props}
    />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants, type ButtonProps };
