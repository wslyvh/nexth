import React from 'react'
import Image from 'next/image'
import { LinkComponent } from './LinkComponent'

interface ListItemType {
  title: string
  description: string
  image: string
  url?: string
}

interface Props {
  className?: string
  title?: string
  items: ListItemType[]
}

export function CardList(props: Props) {
  const className = props.className ?? ''

  return (
    <section className={className}>
      {props.title && <h3 className='text-lg mb-4'>{props.title}</h3>}

      <div className='flex flex-col gap-4'>
        {props.items.map((i, index) => {
          return (
            <div key={`${index}_${i.title}`} className='flex flex-row rounded-xl bg-base-200'>
              <div className='flex items-center justify-center shrink-0'>
                <figure>
                  <Image
                    height={60}
                    width={60}
                    src={i.image}
                    alt={i.title}
                    placeholder='blur'
                    blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='
                    sizes='100vw'
                    className='object-cover mx-8 opacity-50'
                  />
                </figure>
              </div>
              <div className='py-8'>
                {i.url && (
                  <LinkComponent href={i.url}>
                    <h4 className='card-title mb-4'>{i.title}</h4>
                  </LinkComponent>
                )}
                {!i.url && <h4 className='card-title'>{i.title}</h4>}
                <p>{i.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
