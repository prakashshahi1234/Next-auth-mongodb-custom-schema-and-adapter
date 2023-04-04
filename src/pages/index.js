import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
  const session = useSession()
  return <>
             <main>
               {session && <p>Session exits {JSON.stringify(session)}</p>}
              {session.status==="unauthenticated" ?  <button onClick={signIn}>Sign in</button>
               : <button onClick={signOut}>Sign Out</button>}
             </main>
         </>;
}
