import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import Check_Link_Exist from './Check_Link_Exist'
import {Link} from 'react-router-dom'

describe('Check if Link exist', () => {
  it('renders a link', () => {
    // arrange
    const renderer = new ShallowRenderer(),
      path = '/path',
      search = '?a=1&b=2'
    
    // act
    renderer.render(<Check_Link_Exist path={path} search={search} />)

    // assert
    const output = renderer.getRenderOutput()
    expect(output.type).toEqual(Link)
    expect(output.props.to).toEqual({
      path,
      search
    })
  })
})