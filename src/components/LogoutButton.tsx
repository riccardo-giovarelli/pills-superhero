import { signOut } from '@/auth';


export function LogoutButton() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type='submit'>Esci</button>
    </form>
  );
}
