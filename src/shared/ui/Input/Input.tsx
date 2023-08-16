import { type InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

import styles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  iconBefore?: ReactNode
  classes?: {
    container?: string
    input?: string
    label?: string
  }
  testId?: string
}

export const Input = ({
  label,
  classes,
  id,
  type = 'text',
  iconBefore,
  testId,
  ...rest
}: InputProps) => {
  return (
    <div
      className={clsx(
        styles.container,
        !!iconBefore && styles.containerWithIconBefore,
        classes?.container
      )}
      data-testid={`${testId}-container`}
    >
      <div className={styles.inputIconBeforeContainer}>{iconBefore}</div>
      <input
        data-testid={testId}
        id={id}
        type={type}
        className={clsx(
          styles.input,
          !!iconBefore && styles.inputWithIconBefore,
          classes?.input
        )}
        {...rest}
      />
      <label
        htmlFor={id}
        className={clsx(styles.label, classes?.label)}
        data-testid={`${testId}-label`}
      >
        {label}
      </label>
    </div>
  )
}
