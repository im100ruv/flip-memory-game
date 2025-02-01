import { FC, ReactElement } from 'react'
import { twMerge } from 'tailwind-merge'

import { ModalProps } from '../types'

export const Modal: FC<ModalProps> = ({
  children,
  boxStyle = '',
  backdropStyle = '',
  onBackdropClick = () => {},
}): ReactElement => {
  const backdropClass: string = twMerge('absolute fixed inset-0 z-50 bg-gray-600 opacity-90 transition-opacity flex h-full items-center justify-center', backdropStyle)
  const boxClass: string = twMerge('relative w-[60%] rounded-lg text-left shadow-xl bg-white', boxStyle)

  return (
    <div className={backdropClass} onClick={onBackdropClick}>
      <div className={boxClass} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}
