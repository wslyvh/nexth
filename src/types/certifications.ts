export interface Certification {
  id: string
  order: number
  title: string
  description: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  image: string
  questions: Question[]
}

export interface Question {
  title: string
  answers: string[]
}
