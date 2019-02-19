import React from 'react'
import Helmet from 'react-helmet'
import { substr } from 'runes'
import { throttle } from 'lodash'
import './EmojiRain.css'
import EmojiCanvas from './EmojiCanvas'
import Settings from './Settings'
import {
  getRandomEmoji,
  getRandomEmojiSequence,
  EmojiThemes,
  defaultTheme,
} from './Emojis'

class EmojiRain extends React.Component {
  static defaultProps = {
    maxDrops: 200,
    minFontSize: 40,
    maxFontSize: 150,
    speed: 0.3,
    theme: defaultTheme,
  }

  getRandomNegativeInnerHeight = () =>
    Math.min(-this.props.maxFontSize, Math.random() * -window.innerHeight)

  getRandomNegativeInnerWidth = () =>
    Math.min(-this.props.maxFontSize, Math.random() * -window.innerWidth)

  generateDrops = ({
    minFontSize,
    maxFontSize,
    maxDrops,
    innerHeight,
    innerWidth,
    speed,
    theme,
  }) => {
    let drops = []
    for (let i = 0; i < maxDrops; i++) {
      drops.push({
        fontSize: Math.max(minFontSize, Math.ceil(Math.random() * maxFontSize)),
        emoji: getRandomEmoji({ theme }),
        position: {
          x: -innerWidth / 2 / 1.5 + Math.random() * innerWidth * 1.5,
          y: -innerWidth / 2 / 1.5 + Math.random() * innerHeight * 1.5,
        },
        delta: {
          x: speed / 2 - Math.random() * speed,
        },
      })
    }

    return drops
  }

  constructor(props) {
    super(props)

    const { minFontSize, maxFontSize, maxDrops, speed, theme } = props
    const { innerWidth, innerHeight } = window

    const drops = this.generateDrops({
      minFontSize,
      maxFontSize,
      maxDrops,
      innerHeight,
      innerWidth,
      speed,
      theme,
    })

    this.state = {
      drops,
      innerHeight,
      innerWidth,
      isDarkMode: false,
      lastUpdate: new Date().getTime(),
      theme,
      title: `${document.title} ${getRandomEmojiSequence({
        theme,
      })}`,
    }

    this.animationFrame = requestAnimationFrame(this.handleUpdate)
    window.addEventListener('resize', this.throttledResize)
  }

  toggleDarkMode = () => {
    this.setState({
      isDarkMode: !this.state.isDarkMode,
    })
  }

  handleResize = () =>
    this.setState({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    })
  throttledResize = throttle(this.handleResize, 250)

  updatePageTitle = () =>
    this.setState({
      title: `${substr(this.state.title, 1)}${getRandomEmoji({
        theme: this.state.theme,
      })}`,
    })
  throttledUpdatePageTitle = throttle(this.updatePageTitle, 333)

  getUpdatedPosition = ({ for: drop, deltaTime }) => {
    const { maxFontSize } = this.props
    const { innerHeight, innerWidth } = this.state

    if (drop.position.x < -maxFontSize) {
      drop.position.x = innerWidth + maxFontSize
    } else if (drop.position.x > innerWidth + maxFontSize) {
      drop.position.x = this.getRandomNegativeInnerWidth()
    } else {
      drop.position.x = drop.position.x + drop.delta.x * deltaTime
    }

    if (drop.position.y > innerHeight + maxFontSize) {
      drop.position.y = this.getRandomNegativeInnerHeight()
    } else {
      drop.position.y = drop.position.y + this.props.speed * deltaTime
    }

    return drop.position
  }

  handleUpdate = () => {
    this.animationFrame = requestAnimationFrame(this.handleUpdate)

    const deltaTime = new Date().getTime() - this.state.lastUpdate

    const drops = this.state.drops.map(drop => ({
      ...drop,
      emoji: drop.emoji,
      position: this.getUpdatedPosition({ for: drop, deltaTime }),
    }))

    this.throttledUpdatePageTitle()

    this.setState({
      drops,
      lastUpdate: new Date().getTime(),
    })
  }

  handleThemeChange = event => {
    const theme = EmojiThemes[event.target.value]
    const { minFontSize, maxFontSize, maxDrops, speed } = this.props
    const { drops: oldDrops, innerHeight, innerWidth } = this.state

    const drops = this.generateDrops({
      minFontSize,
      maxFontSize,
      maxDrops,
      innerHeight,
      innerWidth,
      speed,
      theme,
    })

    for (let i = 0; i < maxDrops; i++) {
      drops[i].fontSize = oldDrops[i].fontSize
      drops[i].position = { ...oldDrops[i].position }
      drops[i].delta = { ...oldDrops[i].delta }
    }

    this.setState({
      drops,
      theme,
    })
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrame)
    window.removeEventListener('resize', this.throttledResize)
  }

  render() {
    const {
      isDarkMode,
      drops,
      title,
      theme,
      innerWidth,
      innerHeight,
    } = this.state

    return (
      <>
        <Helmet title={title} />
        <Settings
          theme={theme}
          isDarkMode={isDarkMode}
          toggleDarkMode={this.toggleDarkMode}
          onThemeChange={this.handleThemeChange}
        />
        <EmojiCanvas
          drops={drops}
          height={innerHeight}
          isDarkMode={isDarkMode}
          width={innerWidth}
        />
      </>
    )
  }
}

export default EmojiRain
