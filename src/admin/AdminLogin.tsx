import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-100 mb-2">Admin</h1>
        <p className="text-gray-400 font-mono text-sm">Authentication coming in a future phase.</p>
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="mt-6 text-sm text-gray-500 hover:text-gray-100 transition-colors duration-150"
        >
          ← Back to Hub
        </button>
      </div>
    </div>
  )
}
