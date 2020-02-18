import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import {Link, Route, Router} from 'react-router-dom'
import App, {DefaultComp, Acomp} from './App'

describe('App', () => {
it('renders DefaultComp for the default route', () => {
    // arrange
    const renderer = new ShallowRenderer()

    // act
    renderer.render(<App/>)

    // assert
    const output = renderer.getRenderOutput().props.children.props.children[0]
    expect(output.type).toEqual(Route)
    expect(output.props.render().type).toEqual(DefaultComp)
  })

it('renders Acomp for the route /compA', () => {
    // arrange
    const renderer = new ShallowRenderer()

    // act
    renderer.render(<App/>)

    // assert
    const output = renderer.getRenderOutput().props.children.props.children[1]
    expect(output.type).toEqual(Route)
    expect(output.props.render().type).toEqual(Acomp)
  })

  it('transition to Default route from Acomp', () => {
    // arrange
    const renderer = new ShallowRenderer()
    const historyPushSpy = jest.fn()
    renderer.render(<App history={{push: historyPushSpy}} />)
    const onRoute = renderer.getRenderOutput().props.children.props.children[1].props.render().props.onRoute
    
    // act
    onRoute()

    // assert
    expect(historyPushSpy).toHaveBeenCalledWith('/')
  })

})