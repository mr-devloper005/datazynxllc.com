'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

type RegisterFormProps = {
  actionClassName?: string
  inputClassName?: string
}

export function RegisterForm({ actionClassName, inputClassName }: RegisterFormProps) {
  const { signup, isLoading } = useAuth()
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !password) {
      setError('Fill in name, email, and password.')
      return
    }
    await signup(name.trim(), email.trim(), password)
    router.push('/')
    router.refresh()
  }

  return (
    <form className="mt-6 grid gap-4" onSubmit={onSubmit} noValidate>
      <input
        name="name"
        autoComplete="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        className={cn('h-12 rounded-2xl border px-4 text-sm outline-none focus-visible:border-[#e11d8c]/60', inputClassName)}
        placeholder="Full name"
      />
      <input
        name="email"
        autoComplete="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        className={cn('h-12 rounded-2xl border px-4 text-sm outline-none focus-visible:border-[#e11d8c]/60', inputClassName)}
        placeholder="Email address"
        type="email"
      />
      <input
        name="password"
        autoComplete="new-password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        className={cn('h-12 rounded-2xl border px-4 text-sm outline-none focus-visible:border-[#e11d8c]/60', inputClassName)}
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
        {isLoading ? 'Creating account…' : 'Create account'}
      </button>
    </form>
  )
}
