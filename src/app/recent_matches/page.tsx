"use client";
import {useEffect} from "react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'
export default function RecentMatches() {

    const searchParams = useSearchParams();
    console.log(searchParams);

    const search = searchParams.get('search')

    console.log(search);

    useEffect(() => {

    }, []);


    return <h1>RECENT MATCHES</h1>;
};