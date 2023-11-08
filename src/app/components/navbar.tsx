import Link from "next/link";
export default function Navbar() {
    return (
        <div>
            <Link href="/about/dog">go to about dog</Link>
            <hr/>
            <Link href="/">go to home</Link>
            <hr/>
            <Link href="/listofposts">Posts</Link>
        </div>
    );
};