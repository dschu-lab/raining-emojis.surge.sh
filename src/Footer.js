import React from 'react'

const GithubStarButton = () => (
  <a
    className="github-button"
    href="https://github.com/dschu-lab/raining-emojis.surge.sh"
    data-size="large"
    data-show-count="true"
    aria-label="Star dschu-lab/raining-emojis.surge.sh on GitHub"
  >
    Star
  </a>
)

const Footer = () => (
  <footer>
    <GithubStarButton />
  </footer>
)

export default Footer
