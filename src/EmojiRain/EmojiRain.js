import React from 'react'
import './EmojiRain.css'
import Footer from '../Footer'
import Emojis from './Emojis'

const getRandomEmoji = () => Emojis[Math.floor(Math.random() * Emojis.length)]

const EmojiRainDrop = ({
  emoji,
  minFontSize = 40,
  maxFontSize = 100,
  position,
}) => {
  const [fontSize] = React.useState(
    Math.max(minFontSize, Math.ceil(Math.random() * maxFontSize))
  )

  return (
    <div
      children={emoji}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px)`,
        fontSize,
      }}
    />
  )
}

class EmojiRain extends React.Component {
  static defaultProps = {
    maxDrops: 50,
    speed: 0.4,
    tickRate: 250,
  }

  static getRandomNegativeInnerHeight = () =>
    Math.min(-100, Math.random() * -window.innerHeight)

  static getRandomNegativeInnerWidth = () =>
    Math.min(-100, Math.random() * -window.innerWidth)

  constructor(props) {
    super(props)

    let drops = []
    for (let i = 0; i < props.maxDrops; i++) {
      drops.push({
        emoji: getRandomEmoji(),
        skipTransition: false,
        position: {
          x: Math.random() * window.innerWidth,
          y: EmojiRain.getRandomNegativeInnerHeight(),
        },
        delta: {
          x: props.speed / 2 - Math.random() * props.speed,
        },
      })
    }

    this.state = {
      drops,
      lastUpdate: new Date().getTime(),
    }

    this.updateInterval = requestAnimationFrame(this.handleUpdate)
  }

  handleUpdate = () => {
    requestAnimationFrame(this.handleUpdate)

    const maxFontSize = 100 // TODO: Refactor
    const deltaTime = new Date().getTime() - this.state.lastUpdate

    const updatePosition = drop => {
      if (drop.position.x < -maxFontSize) {
        drop.position.x = window.innerWidth + maxFontSize
      } else if (drop.position.x > window.innerWidth + maxFontSize) {
        drop.position.x = EmojiRain.getRandomNegativeInnerWidth()
      } else {
        drop.position.x = drop.position.x + drop.delta.x * deltaTime
      }

      if (drop.position.y > window.innerHeight) {
        drop.position.y = EmojiRain.getRandomNegativeInnerHeight()
      } else {
        drop.position.y = drop.position.y + this.props.speed * deltaTime
      }

      return drop.position
    }

    const drops = this.state.drops.map((drop, i) => ({
      ...drop,
      emoji: drop.emoji,
      position: updatePosition(drop),
    }))

    this.setState({
      drops,
      lastUpdate: new Date().getTime(),
    })
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updateInterval)
  }

  render() {
    return (
      <div className="EmojiRain">
        {this.state.drops.map((drop, i) => (
          <EmojiRainDrop key={i} emoji={drop.emoji} position={drop.position} />
        ))}
        <Footer />
      </div>
    )
  }
}

export default EmojiRain
