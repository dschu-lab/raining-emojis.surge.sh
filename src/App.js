import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css'
import EmojiRain from './EmojiRain/EmojiRain'
import Footer from './Footer/Footer'

class App extends Component {
  render() {
    return (
      <main className="App">
        <Router>
          <Route path="/:theme?/:background?" component={EmojiRain} />
        </Router>
        <Footer />
      </main>
    )
  }
}

export default App
