import React, { Component } from 'react'
import './App.css'
import EmojiRain from './EmojiRain/EmojiRain'
import Footer from './Footer/Footer'

class App extends Component {
  render() {
    return (
      <main className="App">
        <EmojiRain />
        <Footer />
      </main>
    )
  }
}

export default App
