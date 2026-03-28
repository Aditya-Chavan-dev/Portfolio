import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import { ToastProvider } from '@/common/shared/Toast'
import { AuthProvider } from '@/admin/AuthProvider'
import { EditModeProvider } from '@/admin/EditModeContext'

import { BrowserRouter } from 'react-router-dom'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <EditModeProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </EditModeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
