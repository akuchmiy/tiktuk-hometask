import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { AuthorMeta, Hashtag } from 'shared/api'
import { trimHashtags } from '../lib'

interface FeedDescriptionProps {
  authorMeta: AuthorMeta
  hashtags: Hashtag[]
  text: string
}

export const FeedDescription: FC<FeedDescriptionProps> = ({
  authorMeta,
  hashtags,
  text,
}) => {
  return (
    <div className={'flex flex-grow mb-4 justify-start'}>
      <Link className={'mr-3'} to={`/user/${authorMeta.name}`}>
        <img
          className={'w-14 h-14 object-cover rounded-full'}
          src={authorMeta.avatar}
          alt={`${authorMeta.name}'s avatar`}
        />
      </Link>
      <div>
        <h3 className={'text-xl'}>
          <Link className={'hover:underline'} to={`/user/${authorMeta.name}`}>
            {authorMeta.name}
          </Link>
        </h3>
        <p className={'break-words max-w-xs'}>
          {trimHashtags(text)}
          {hashtags.map((hashtag, index) => (
            <Link key={index} to={`/?query=${hashtag.name}`}>
              <strong>#{hashtag.name} </strong>
            </Link>
          ))}
        </p>
      </div>
    </div>
  )
}
