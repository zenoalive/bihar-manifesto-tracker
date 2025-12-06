import { Link } from "react-router-dom";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-xl font-bold">
                        Bihar Promise Tracker
                    </Link>

                    {/* we’ll add menu items later */}
                    <nav className="flex gap-4 text-sm">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                        <span className="text-gray-400">(Admin soon)</span>
                    </nav>
                    <nav className="flex gap-4 text-sm">
                        <Link to="/" className="hover:text-blue-600">Home</Link>
                        <Link to="/categories" className="hover:text-blue-600">Categories</Link>
                        <span className="text-gray-400">(Admin soon)</span>
                    </nav>

                </div>
            </header>

            {/* Content */}
            <main className="max-w-5xl mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}
