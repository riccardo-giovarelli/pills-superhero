import { signIn } from '@/auth';


export default function LoginPage() {
  return (
    <form
      action={async (formData) => {
        'use server';
        await signIn('credentials', formData);
      }}
    >
      <input name='email' type='email' placeholder='Email' required />
      <input name='password' type='password' placeholder='Password' required />
      <button type='submit'>Accedi</button>
    </form>
  );
}
