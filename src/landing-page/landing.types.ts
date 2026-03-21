export interface WelcomeContent {
  name:             string
  role:             string
  dialogue:         string[]
  ctaDesktop:       string
  ctaMobile:        string
  skipHintDesktop:  string
  skipHintMobile:   string
}

export interface WelcomeConfig {
  readonly name: string
  readonly dialogue: string[]
  readonly highlightIndex: number | number[]
}
