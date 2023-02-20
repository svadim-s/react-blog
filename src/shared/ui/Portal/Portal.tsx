import { FC } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  element?: HTMLElement
}

export const Portal: FC<PortalProps> = (props) => {
  const {
    children,
    element
  } = props
  return createPortal(<>{children}</>, element)
}
