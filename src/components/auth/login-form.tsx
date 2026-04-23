'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

type LoginFormProps = {
  actionClassName?: string
  inputClassName?: string
}

export function LoginForm({ actionClassName, inputClassName }: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password) {
      setError('Enter your email and password.')
      return
    }
    await login(email.trim(), password)
    router.push('/')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
      <input
        name="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        className={cn('h-12 rounded-2xl border border-current/10 bg-transparent px-4 text-sm outline-none ring-0 focus-visible:border-[#e11d8c]/50', inputClassName)}
        placeholder="Email address"
        type="email"
      />
      <input
        name="password"
        autoComplete="current-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        className={cn('h-12 rounded-2xl border border-current/10 bg-transparent px-4 text-sm outline-none focus-visible:border-[#e11d8c]/50', inputClassName)}
        placeholder="Password"
        type="password"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-opacity disabled:opacity-60',
          actionClassName,
        )}
      >
        {isLoading ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  )
}
