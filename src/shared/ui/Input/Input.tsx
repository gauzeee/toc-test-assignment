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
}

export const Input = ({
  label,
  classes,
  id,
  type = 'text',
  iconBefore,
  ...rest
}: InputProps) => {
  return (
    <div
      className={clsx(
        styles.container,
        !!iconBefore && styles.containerWithIconBefore,
        classes?.container
      )}
    >
      <div className={styles.inputIconBeforeContainer}>{iconBefore}</div>
      <input
        id={id}
        type={type}
        className={clsx(
          styles.input,
          !!iconBefore && styles.inputWithIconBefore,
          classes?.input
        )}
        {...rest}
      />
      <label htmlFor={id} className={clsx(styles.label, classes?.label)}>
        {label}
      </label>
    </div>
  )
}
