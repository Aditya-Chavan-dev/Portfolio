import './styles/App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Live Digital Portfolio
        </h1>
        <p className="text-lg text-slate-400 font-medium">
          Architectural Foundation: <span className="text-emerald-400">Feature-Sliced Design</span> initialized.
        </p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-500">Live System Active</span>
        </div>
      </div>
    </div>
  )
}

export default App
