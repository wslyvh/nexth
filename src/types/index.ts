export interface State<T> {
  loading: boolean
  data?: T
  error?: string
}

export interface PassportStamp {
  version: string
  credential: {
    type: string[]
    proof: {
      jws: string
      type: string
      created: string
      proofPurpose: string
      verificationMethod: string
    }
    issuer: string
    '@context': string[]
    issuanceDate: string
    expirationDate: string
    credentialSubject: {
      id: string
      hash: string
      '@context': [
        {
          hash: string
          provider: string
        }
      ]
      provider: string
    }
  }
  metadata?: {
    description: string
    group: string
    hash: string
    name: string
    platform: {
      id: string
      icon: string
      name: string
      description: string
      connectMessage: string
    }
  }
}
