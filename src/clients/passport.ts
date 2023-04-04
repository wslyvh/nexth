export const COMMUNITY_ID = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_COMMUNITY_ID
export const API_KEY = process.env.NEXT_PUBLIC_GITCOIN_PASSPORT_API_KEY

if (!COMMUNITY_ID || !API_KEY) {
  console.warn('Gitcoin passport Community ID or API Key not set')
}

const BASE_URI = 'https://api.scorer.gitcoin.co/registry'
const HEADERS = {
  'Content-Type': 'application/json',
  'X-API-Key': API_KEY ?? '',
}

export async function GetScore(address: string) {
  try {
    const response = await fetch(`${BASE_URI}/score/${COMMUNITY_ID}/${address}`, {
      headers: HEADERS,
    })

    if (response.status === 200) {
      const data = await response.json()
      console.log('data:', data, response.status)
      return data
    }
  } catch (err) {
    console.log('error: ', err)
  }
}

export async function GetNonce() {
  try {
    const response = await fetch(`${BASE_URI}/signing-message`, {
      headers: HEADERS,
    })
    if (response.status === 200) {
      const data = await response.json()
      console.log('data:', data)
      return data
    }
  } catch (err) {
    console.log('error: ', err)
  }
}

export async function SubmitPassport(address: string, signature: string, nonce: string) {
  try {
    const response = await fetch(`${BASE_URI}/submit-passport`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        address,
        community: COMMUNITY_ID,
        signature,
        nonce,
      }),
    })
    if (response.status === 200) {
      const data = await response.json()
      console.log('data:', data)
      return data
    }
  } catch (err) {
    console.log('error: ', err)
  }
}
