export default function Loader({ size = 'md' }) {
  const sizes = { sm: 'h-5 w-5', md: 'h-8 w-8', lg: 'h-12 w-12' }
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`${sizes[size]} border-2 border-gray-200 border-t-accent rounded-full animate-spin`} />
    </div>
  )
}
