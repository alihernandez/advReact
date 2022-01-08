import Link from 'next/link';

export default function Nav() {
    return (
        <nav>
            {/* anytime you want to link in website use link tag outside of website use anchor tag */}
            <Link href="/products">Products</Link>
            <Link href="/sell">Sell</Link>
            <Link href="/orders">Orders</Link>
            <Link href="/account">Account</Link>
        </nav>
    )
}