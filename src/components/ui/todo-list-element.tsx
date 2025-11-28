'use client';

import * as React from 'react';

import type { PlateElementProps } from 'platejs/react';

import { useTodoListElement, useTodoListElementState } from '@platejs/list/react';
import { PlateElement } from 'platejs/react';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

export function TodoListElement({
  className,
  children,
  ...props
}: PlateElementProps) {
  const { element } = props;
  const state = useTodoListElementState({ element });
  const { checkboxProps } = useTodoListElement(state);

  return (
    <PlateElement
      className={cn('flex flex-row py-1', className)}
      {...props}
    >
      <div
        className="mr-2 flex items-center justify-center select-none"
        contentEditable={false}
      >
        <Checkbox {...checkboxProps} />
      </div>
      <span
        className={cn(
          'flex-1 focus:outline-none',
          !!state.checked && 'text-muted-foreground line-through'
        )}
        contentEditable={!state.readOnly}
        suppressContentEditableWarning
      >
        {children}
      </span>
    </PlateElement>
  );
}
