export interface Certification {
  id: string
  testId: number
  order: number
  name: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  icon: string
  image: string
  questions: Question[]
}

export interface Question {
  title: string
  answers: string[]
}
