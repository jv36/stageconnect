"use client"
import { Button, TextField, Typography } from "@mui/material"
import { login, signup } from "./actions"
import { useFormState } from "react-dom"

type FormState = { error: string }

const initialState: FormState = { error: "" }

function loginWithState(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  return login(formData)
}

export default function LoginPage() {
  const [state, formAction] = useFormState<FormState, FormData>(
    loginWithState,
    initialState
  )

  return (
<div className="grid grid-rows-[auto_1fr_auto] items-center justify-center min-h-screen p-8 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  <main className="flex flex-col gap-8 w-full max-w-[600px] mx-auto items-center">
    <Typography variant="h4" fontWeight={600}>Welcome to StageConnect!</Typography>
    <Typography fontSize={16} fontWeight={500}>Ready to connect? Create or login to your account!</Typography>

     {/* Mostrar erro, se existir */}
     {state?.error && (
          <Typography color="error">{state.error}</Typography>
        )}

    <form action={formAction}>
        <TextField
          id="email"
          name="email"
          type="email"
          label="Email"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Password"
          variant="outlined"
          required
          fullWidth
          margin="normal"
        />
        <div style={{ display: 'flex', gap: '8px' }}>
            <Button type="submit" variant="contained">
              Log in
            </Button>
            <Button type="submit" formAction={signup} variant="outlined">
              Sign up
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}