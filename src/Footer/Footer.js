import React from 'react'
import './Footer.css'

const GithubStarButton = () => (
  <a
    children={'Open on Github'}
    className="github-button"
    href="https://github.com/dschu-lab/raining-emojis.surge.sh"
    data-size="large"
    data-show-count="false"
    aria-label="Star dschu-lab/raining-emojis.surge.sh on GitHub"
  />
)

const Footer = () => (
  <footer>
    <GithubStarButton />
  </footer>
)

export default Footer
