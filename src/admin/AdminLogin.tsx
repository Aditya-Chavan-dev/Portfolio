import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-theme-primary mb-2">Admin</h1>
        <p className="text-theme-secondary font-mono text-sm">Authentication coming in a future phase.</p>
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="mt-6 text-sm text-theme-secondary hover:text-theme-primary transition-colors duration-150"
        >
          ← Back to Hub
        </button>
      </div>
    </div>
  )
}
