import { mount } from 'enzyme'
import React, { FC } from 'react'
import { useTitle } from 'shared/hooks/useTitle'

interface Props {
  title: string
}

const UseTitleWrapper: FC<Props> = ({ title }) => {
  useTitle(title)

  return <span>UseTitleWrapper</span>
}

describe('useTitle tests', function () {
  it('should change document title to username`s profile', async function () {
    const title = 'Vasya'
    await mount(<UseTitleWrapper title={title} />)

    expect(document.title).toBe(title)
  })
})
