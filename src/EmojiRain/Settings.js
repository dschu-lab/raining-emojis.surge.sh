import React from 'react'
import './Settings.css'
import Emojis, { EmojiThemes } from './Emojis'
import { themeToThemeName } from './Helpers'

const Button = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>
}

const ThemeSelection = ({ onThemeChange, theme = '' }) => (
  <label aria-label="Select your theme">
    {'🎨'}
    <select
      id="themeSelection"
      onChange={onThemeChange}
      value={themeToThemeName(theme)}
    >
      {Object.keys(EmojiThemes).map(theme => (
        <option key={theme} value={theme}>
          {Emojis[EmojiThemes[theme]].title}
        </option>
      ))}
    </select>
  </label>
)

const ToggleDarkModeButton = ({ isDarkMode, toggleDarkMode }) => {
  const baseText = 'Background'
  const text = isDarkMode ? `${baseText} 🌑` : `${baseText} 🌕`
  const title = 'Toggle dark mode'

  return (
    <Button
      children={text}
      className="toggleDarkMode"
      onClick={toggleDarkMode}
      role="img"
      aria-label={title}
      title={title}
    />
  )
}

const SpeedSelection = ({ min = 0, max = 2, step = 0.01, onChange, value }) => {
  return (
    <label aria-label="Select">
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
const Settings = React.memo(
  ({
    isDarkMode,
    toggleDarkMode,
    onThemeChange,
    speed,
    onSpeedChange,
    theme,
  }) => (
    <div className="Settings">
      <ThemeSelection onThemeChange={onThemeChange} theme={theme} />
      <ToggleDarkModeButton
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <SpeedSelection value={speed} onChange={onSpeedChange} />
    </div>
  )
)

export default Settings
