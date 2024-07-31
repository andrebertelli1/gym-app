'use client'
import { useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/signin');
    },
  });

  console.log("session", session)

  return (
    <div className="p-8">
      <div className='text-white'>{session?.data?.user?.email}</div>
      <button className='text-white' onClick={() => signOut()}>Logout</button>
    </div>
  )
}