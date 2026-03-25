export interface WelcomeConfig {
  readonly name: string
  readonly dialogue: string[]
  readonly highlightIndex: number | number[]
  readonly ctaDesktop: string
  readonly ctaMobile: string
  readonly skipHintDesktop: string
  readonly skipHintMobile: string
}
