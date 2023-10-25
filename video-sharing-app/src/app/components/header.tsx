'use client';
import LoginForm from './Form/LoginForm';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import { useContext } from 'react';
import Link from 'next/link';
import IconHome from './Icons/IconHome';
import { Context } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
    const { user } = useContext(Context);
    const router = useRouter();
    const handleSignOut = () => {
        signOut(auth).then(() => {
            window.location.reload();
            router.push('/');
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <div className="z-10 w-full px-24 pt-5 pb-2 fixed items-center justify-between font-mono text-sm lg:flex bg-gray-400">
            <Link href="/">
                <h1 className="text-3xl">
                    <IconHome className='float-left mr-2' />
                    Funny Movies
                </h1>
            </Link>
            <div>
                {user.uid ? <>
                    <span>Welcome <b>{user.email}</b></span>
                    <button className='ml-3 px-2 py-1 border border-black border-solid'><Link href="/share">Share a movie</Link></button>
                    <button className='ml-3 px-2 py-1 border border-black border-solid' onClick={handleSignOut}>Logout</button>
                </> : <LoginForm />}
            </div>
        </div>
    );
}