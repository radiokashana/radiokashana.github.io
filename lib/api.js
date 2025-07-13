import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/noticias')

export async function getAllPosts() {
  // Get file names under /content/noticias
  const fileNames = fs.readdirSync(postsDirectory)
  
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id/slug
      const slug = fileName.replace(/\.md$/, '')
      
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      
      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents)
      
      // Create excerpt
      const excerpt = matterResult.content.substring(0, 200)
      
      // Parse date from frontmatter (should be ISO8601)
      const rawDate = matterResult.data.date
      let date = null
      
      if (rawDate) {
        try {
          // If already a Date object, use it directly
          if (rawDate instanceof Date) {
            date = rawDate
          } else {
            // Otherwise parse from string (ISO8601 format expected)
            date = new Date(rawDate)
            
            // Basic validation - check if date is valid
            if (isNaN(date.getTime())) {
              console.warn(`Invalid date format in ${fileName}: ${rawDate}`)
              date = null
            }
          }
        } catch (error) {
          console.warn(`Error parsing date in ${fileName}: ${rawDate}`, error)
          date = null
        }
      } else {
        console.warn(`No date found in ${fileName}`)
      }
      
      // Combine the data with the id and date
      return {
        slug,
        excerpt,
        content: matterResult.content,
        ...matterResult.data,
        date: date
      }
    })
    
  // Sort posts by date (newest first)
  return allPostsData
    .filter(post => post.date) // Filter out posts without valid dates first
    .sort((a, b) => b.date - a.date) // Sort by date (newer first)
    .concat(
      // Then append posts without dates at the end
      allPostsData.filter(post => !post.date)
    )
}

export async function getPostBySlug(slug) {
  try {
    // Fix encoding issues in slug
    const decodedSlug = decodeURIComponent(slug)
    
    // Look for the file that matches the slug when normalized
    const fileNames = fs.readdirSync(postsDirectory)
    const matchingFileName = fileNames.find(fileName => {
      // Normalize the filename by removing extension and comparing
      const fileSlug = fileName.replace(/\.md$/, '')
      return fileSlug === decodedSlug || fileSlug === slug
    })
    
    if (!matchingFileName) {
      console.error(`No file found for slug: ${slug}`)
      return {
        slug,
        title: 'Post Not Found',
        date: null,
        image: '/img/logo-radio-kashana.jpg',
        content: 'The requested post could not be found.',
        excerpt: 'Post not found'
      }
    }
    
    // Read the file
    const fullPath = path.join(postsDirectory, matchingFileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    
    // Parse with gray-matter
    const matterResult = matter(fileContents)
    const excerpt = matterResult.content.substring(0, 200)
    
    // Parse date (if exists)
    const rawDate = matterResult.data.date
    let date = null
    
    if (rawDate) {
      try {
        // If already a Date object, use it directly
        if (rawDate instanceof Date) {
          date = rawDate
        } else {
          // Otherwise parse from string (ISO8601 format expected)
          date = new Date(rawDate)
          
          // Basic validation
          if (isNaN(date.getTime())) {
            console.warn(`Invalid date format in ${matchingFileName}: ${rawDate}`)
            date = null
          }
        }
      } catch (error) {
        console.warn(`Error parsing date in ${matchingFileName}: ${rawDate}`, error)
        date = null
      }
    }
    
    return {
      slug,
      content: matterResult.content,
      excerpt,
      ...matterResult.data,
      date: date
    }
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error)
    return {
      slug,
      title: 'Error Loading Post',
      date: null,
      image: '/img/logo-radio-kashana.jpg',
      content: 'There was an error loading this post.',
      excerpt: 'Error loading post'
    }
  }
}