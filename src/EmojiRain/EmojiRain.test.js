import React from 'react'
import ReactDOM from 'react-dom'
import EmojiRain from './EmojiRain'

it('renders without crashing', () => {
  const match = {
    params: {
      theme: 'unicorn',
      background: 'white',
    },
  }
  const div = document.createElement('div')
  ReactDOM.render(<EmojiRain match={match} />, div)
  ReactDOM.unmountComponentAtNode(div)
})
