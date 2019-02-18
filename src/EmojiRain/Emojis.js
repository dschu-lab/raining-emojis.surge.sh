const EmojiThemes = Object.freeze({
  balloons: Symbol.for('EmojiThemes.balloons'),
  fastFood: Symbol.for('EmojiThemes.fastFood'),
  german: Symbol.for('EmojiThemes.german'),
  hipster: Symbol.for('EmojiThemes.hipster'),
  money: Symbol.for('EmojiThemes.money'),
  party: Symbol.for('EmojiThemes.party'),
})

const defaultTheme = EmojiThemes.party
const Emojis = {
  [EmojiThemes.balloons]: {
    title: 'Balloons',
    emojis: ['🎈'],
  },
  [EmojiThemes.fastFood]: {
    title: 'Fast food',
    emojis: [
      '🍔',
      '🍟',
      '🍕',
      '🌭',
      '🥙',
      '🥪',
      '🌮',
      '🌯',
      '🍩',
      '🥤',
      '🍿',
      '🍫',
    ],
  },
  [EmojiThemes.german]: {
    title: 'German',
    emojis: ['🍺', '🍻', '👩‍🌾', '👨‍🌾', '🇩🇪', '🥨', '🍖', '⚽️', '🥔'],
  },
  [EmojiThemes.hipster]: {
    title: 'Hipster',
    emojis: [
      '📝',
      '👩‍🎤',
      '👨‍🎤',
      '👨‍💻',
      '👩‍💻',
      '🎨',
      '🛍',
      '🎮',
      '👾',
      '🎪',
      '📰',
      '🎧',
      '🤳',
    ],
  },
  [EmojiThemes.money]: {
    title: 'Money',
    emojis: [
      '🤑',
      '💷',
      '💶',
      '💴',
      '💵',
      '💸',
      '💰',
      '🏧',
      '👛',
      '🏦',
      '💳',
      '💎',
    ],
  },
  [EmojiThemes.party]: {
    title: 'Party',
    emojis: [
      '👯‍',
      '👯‍',
      '🥳',
      '🍾',
      '🥂',
      '🎁',
      '👏',
      '🎂',
      '🎈',
      '🎉',
      '🎊',
    ],
  },
}

const getRandomEmoji = ({ theme = defaultTheme }) =>
  Emojis[theme].emojis[Math.floor(Math.random() * Emojis[theme].emojis.length)]

const getRandomEmojiSequence = ({ length = 10, theme = defaultTheme }) => {
  let emojis = []
  for (let i = 0; i < length; i++) {
    emojis.push(getRandomEmoji({ theme }))
  }

  return emojis.join('')
}

export default Emojis
export { EmojiThemes, defaultTheme, getRandomEmoji, getRandomEmojiSequence }
