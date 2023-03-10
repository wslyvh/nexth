import fs from 'fs'
import { join } from 'path'

export function GetCertifications(folder: string = 'certifications') {
  const files: any[] = []
  const dir = join(process.cwd(), 'data', folder)
  const items = fs.readdirSync(dir, { withFileTypes: true })

  for (const i of items) {
    if (i.isDirectory()) {
      const subFiles = GetCertifications(join(folder, i.name))
      files.push(...subFiles)
    }

    if (i.isFile() && i.name.endsWith('.json')) {
      const fullPath = join(dir, i.name)
      const content = fs.readFileSync(fullPath, 'utf-8')
      const id = i.name.replace('.json', '')
      files.push({
        id: id,
        url: `/${folder}/${id}`,
        ...JSON.parse(content),
      })
    }
  }

  return files.sort((a, b) => a.testId - b.testId)
}
