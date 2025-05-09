import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="text-sm text-gray-600 py-2">
            <ol className="flex space-x-2">
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                </li>
                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    return (
                        <li key={to} className="flex items-center">
                            <span className="mx-1">/</span>
                            {index === pathnames.length - 1 ? (
                                <span className="text-gray-700">{decodeURIComponent(value)}</span>
                            ) : (
                                <Link to={to} className="text-blue-500 hover:underline">
                                    {decodeURIComponent(value)}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;  // ✅ Ensure there is a default export
