import React from 'react'
import './Settings.css'
import Emojis, { EmojiThemes } from './Emojis'
import { themeToThemeName } from './Helpers'

const ThemeSelection = ({ onThemeChange, theme = '' }) => {
  const value = themeToThemeName(theme)

  return (
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

const SpeedSelection = ({ min = 0, max = 5, step = 0.01, onChange, value }) => {
  return (
    <label>
      {'🐢'}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        value={value}
      />
      {'🐇'}
    </label>
  )
}

// FIXME: Prop drilling is meh... Create one context to rule 'em all!
const Settings = ({
  isDarkMode,
  toggleDarkMode,
  onThemeChange,
  speed,
  onSpeedChange,
  theme,
}) => {
  return (
    <div className="Settings">
      <ThemeSelection onThemeChange={onThemeChange} theme={theme} />
      <ToggleDarkModeButton
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <SpeedSelection value={speed} onChange={onSpeedChange} />
    </div>
  )
}

export default Settings
