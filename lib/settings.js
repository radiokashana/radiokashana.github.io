import fs from 'fs'
import path from 'path'

const dataDirectory = path.join(process.cwd(), '_data')

export async function getSettings() {
  const fullPath = path.join(dataDirectory, 'settings.json')
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  
  return JSON.parse(fileContents)
}