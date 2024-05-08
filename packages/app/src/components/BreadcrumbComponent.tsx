import React from 'react'

interface BreadCrumbProps {
  links: { text: string; href?: string }[]
}

export function BreadCrumbComponent({ links }: BreadCrumbProps) {
  return (
    <div className='text-sm breadcrumbs'>
      <ul>
        {links.map((link, index) => (
          <li key={index}>{link.href ? <a href={link.href}>{link.text}</a> : <span>{link.text}</span>}</li>
        ))}
      </ul>
    </div>
  )
}
