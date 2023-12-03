import React from 'react'
import { Link } from 'react-router-dom'

interface DomainLinkProps {
  children: any
  className?: string
  domain: string
  route: string
}

export const DomainLink: React.FC<DomainLinkProps> = ({
  children,
  className,
  domain,
  route,
}) => {
  return (
    <Link className={className} to={route} state={{ domain }}>
      {children}
    </Link>
  )
}
