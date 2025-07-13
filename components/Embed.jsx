export default function Embed({ html }) {
  return (
    <div 
      className="fixed right-4 bottom-4 z-999"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  )
}