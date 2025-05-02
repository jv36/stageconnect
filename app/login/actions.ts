'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message } // <-- Devolver a mensagem de erro
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Extract display name from email
  const displayName = email.split('@')[0]

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  })
  

  if (signUpError || !signUpData.user) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function logout() {
    const supabase = await createClient()
  
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      redirect('/error') // or handle error differently
    }
  
    revalidatePath('/', 'layout')
    redirect('/login') // or your preferred landing page after logout
  }