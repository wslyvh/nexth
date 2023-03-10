export interface Certification {
  id: string
  testId: number
  name: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  icon: string
  image: string
  info?: string
  questions: Question[]
  openAnswerHashes: string[]
}

export interface Question {
  title: string
  answers: string[]
  type?: string
}
