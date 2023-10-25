'use client';
import { useContext, useEffect } from "react";
import ShareMovieForm from "../components/Form/ShareMovieForm";
import Header from "../components/header";
import { Context } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Share() {
    const { user } = useContext(Context);
    const router = useRouter();
    useEffect(() => {
        if (!user.uid) {
            router.push('/');
        }
    }, [router, user]);
    return <main className="flex min-h-screen flex-col items-center bg-white">
        <Header />
        <ShareMovieForm />
    </main>
}