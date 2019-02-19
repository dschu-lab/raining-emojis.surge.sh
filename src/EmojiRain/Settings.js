import React from 'react'
import './Settings.css'
import Emojis, { EmojiThemes } from './Emojis'
import { themeToThemeName } from './Helpers'

const ThemeSelection = ({ onThemeChange, theme = '' }) => {
  const value = themeToThemeName(theme)

  return (
    <form>
      <label>
        {'Theme '}
        <select id="themeSelection" onChange={onThemeChange} value={value}>
          {Object.keys(EmojiThemes).map(theme => (
            <option key={theme} value={theme}>
              {Emojis[EmojiThemes[theme]].title}
            </option>
          ))}
        </select>
      </label>
    </form>
  )
}

const ToggleDarkModeButton = ({ isDarkMode, toggleDarkMode }) => {
  const text = 'Background'
  const buttonText = isDarkMode ? `${text} 🌑` : `${text} 🌕`
  const buttonTitle = 'Toggle dark mode'
  return (
    <button
      children={buttonText}
      className="toggleDarkMode"
      onClick={toggleDarkMode}
      role="img"
      aria-label={buttonTitle}
      title={buttonTitle}
    />
  )
}

const Settings = ({ isDarkMode, toggleDarkMode, onThemeChange, theme }) => {
  return (
    <div className="Settings">
      <ThemeSelection onThemeChange={onThemeChange} theme={theme} />
      <ToggleDarkModeButton
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
    </div>
  )
}

export default Settings
