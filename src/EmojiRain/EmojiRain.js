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
import {
  themeToThemeName,
  camelCaseToSnakeCase,
  snakeCaseToCamelCase,
} from './Helpers'

const basePageTitle = `☔️🌈 Raining Emojis`

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

  generatePageTitle = ({ for: theme }) => {
    return `${basePageTitle} ${getRandomEmojiSequence({
      length: 2,
      theme,
    })}`
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
      title: this.generatePageTitle({ for: theme }),
    }

    this.animationFrame = requestAnimationFrame(this.handleAnimationFrame)
    window.addEventListener('resize', this.throttledResize)
  }

  componentWillMount() {
    const { innerHeight, innerWidth } = window
    const { innerHeight: currentHeight, innerWidth: currentWidth } = this.state

    // TODO: Quick hack since react-snaps sets width & height and we need to update this
    if (innerHeight !== currentHeight || innerWidth !== currentWidth) {
      this.setState({
        innerHeight,
        innerWidth,
      })
    }

    const { params } = this.props.match
    this.updateStateFromProps({
      background: params.background,
      themeName: params.theme,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match

    this.updateStateFromProps({
      background: params.background,
      themeName: params.theme,
    })
  }

  updateStateFromProps = ({ background = 'white', themeName }) => {
    const { minFontSize, maxFontSize, maxDrops, speed, history } = this.props
    const { drops: oldDrops, innerHeight, innerWidth } = this.state

    const themeNamesInSnakeCase = Object.keys(EmojiThemes).map(theme =>
      camelCaseToSnakeCase(theme)
    )

    if (
      !themeNamesInSnakeCase.includes(themeName) ||
      (background !== 'white' && background !== 'black')
    ) {
      history.push(`/${themeToThemeName(defaultTheme)}/white`)
      return
    }

    const theme = EmojiThemes[snakeCaseToCamelCase(themeName)]

    let nextState = {}
    if (theme !== this.state.theme) {
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

      nextState = {
        ...nextState,
        drops,
        title: this.generatePageTitle({ for: theme }),
      }
    }

    nextState = {
      ...nextState,
      isDarkMode: background === 'black',
      theme,
    }

    this.setState(nextState)
  }

  toggleDarkMode = () => {
    const { history, match } = this.props
    const background = this.state.isDarkMode ? 'white' : 'black'

    history.push(`/${camelCaseToSnakeCase(match.params.theme)}/${background}`)
  }

  handleResize = () =>
    this.setState({
      innerHeight: window.innerHeight,
      innerWidth: window.innerWidth,
    })
  throttledResize = throttle(this.handleResize, 250)

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

  handleAnimationFrame = () => {
    this.animationFrame = requestAnimationFrame(this.handleAnimationFrame)

    const deltaTime = new Date().getTime() - this.state.lastUpdate

    const drops = this.state.drops.map(drop => ({
      ...drop,
      emoji: drop.emoji,
      position: this.getUpdatedPosition({ for: drop, deltaTime }),
    }))

    this.setState({
      drops,
      lastUpdate: new Date().getTime(),
    })
  }

  handleThemeChange = event => {
    const { history } = this.props
    // TODO: Define white and black somewhere else...It's too WET
    const background = this.state.isDarkMode ? 'black' : 'white'
    history.push(`/${camelCaseToSnakeCase(event.target.value)}/${background}`)
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
