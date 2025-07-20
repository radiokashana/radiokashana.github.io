export default function MainNews({ children }) {
  return (
    <div className="flex flex-wrap justify-between" data-testid="main-news">
      {children}
    </div>
  )
}