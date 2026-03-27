import { createContext, useContext, useEffect, useState, useCallback, useRef, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  browserLocalPersistence,
  setPersistence,
  type User,
} from 'firebase/auth'
import { auth } from '@/shared/firebase'
import { writeAuditLog } from '@/shared/auditLog'
import { startAdminSession, stopAdminSession } from './services/AdminSessionService'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AuthContextType {
  user: User | null
  loading: boolean
  isAdmin: boolean
  login: () => Promise<void>
  logout: (reason?: 'manual' | 'inactivity') => Promise<void>
}

// ─── Context ─────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
})

export const useAuth = () => useContext(AuthContext)

// ─── Provider ────────────────────────────────────────────────────────────────

interface AuthProviderProps {
  readonly children: ReactNode
}

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string | undefined
const googleProvider = new GoogleAuthProvider()

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const previousUserRef = useRef<User | null>(null)

  // Derive admin status from email match
  const isAdmin = !!(user && ADMIN_EMAIL && user.email === ADMIN_EMAIL)

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence).catch(console.error)

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      // Detect login event (null → user)
      if (firebaseUser && !previousUserRef.current) {
        writeAuditLog('login_success', { uid: firebaseUser.uid })
        
        // Start Admin Heartbeat if email matches
        if (firebaseUser.email === ADMIN_EMAIL) {
          startAdminSession(firebaseUser.email)
        }
      }

      // Stop heartbeat on logout
      if (!firebaseUser) {
        stopAdminSession()
      }

      previousUserRef.current = firebaseUser
      setUser(firebaseUser)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const login = useCallback(async () => {
    await setPersistence(auth, browserLocalPersistence)
    await signInWithPopup(auth, googleProvider)
    // Audit log is written by onAuthStateChanged listener above
  }, [])

  const logout = useCallback(async (reason: 'manual' | 'inactivity' = 'manual') => {
    const uid = auth.currentUser?.uid
    await signOut(auth)
    writeAuditLog(
      reason === 'inactivity' ? 'session_auto_expired' : 'logout_manual',
      uid ? { uid } : {}
    )
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
