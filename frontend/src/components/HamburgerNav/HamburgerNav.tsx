import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HamburgerNav.css';

const NAV_ITEMS = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
    { icon: 'query_stats', label: 'F&O Position', path: '/fo-position' },
    { icon: 'auto_stories', label: 'AI Journaling', path: '/ai-journaling' },
    { icon: 'history_edu', label: 'Trade / Order History', path: '/trade-history' },
    { icon: 'swap_horiz', label: 'Integrations', path: '/integrations' },
];

export function HamburgerNav() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const close = () => setIsOpen(false);
    const toggle = () => setIsOpen((v) => !v);

    return (
        <div className={`hamburger-nav-root${isOpen ? ' is-open' : ''}`}>
            {/* Mobile overlay backdrop */}
            {isOpen && (
                <div
                    className="hamburger-backdrop"
                    onClick={close}
                    aria-hidden="true"
                />
            )}

            {/* Hamburger toggle button */}
            <button
                className={`hamburger-toggle${isOpen ? ' active' : ''}`}
                onClick={toggle}
                aria-label="Toggle navigation"
            >
                <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
            </button>

            {/* Sidebar */}
            <aside className={`hamburger-aside${isOpen ? ' open' : ''}`}>
                {/* Close button (mobile) */}
                <button className="hamburger-close" onClick={close} aria-label="Close navigation">
                    <span className="material-symbols-outlined">close</span>
                </button>

                <div className="hamburger-header">
                    <span>Navigation</span>
                </div>

                <nav className="hamburger-nav">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={close}
                            className={`sidebar-item${location.pathname === item.path ? ' active' : ''}`}
                        >
                            <span className="material-symbols-outlined font-light">{item.icon}</span>
                            <span className="nav-label">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="hamburger-footer">
                    <Link to="/settings" onClick={close} className="sidebar-item sidebar-item--no-border">
                        <span className="material-symbols-outlined font-light">settings</span>
                        <span className="nav-label">Settings</span>
                    </Link>
                </div>
            </aside>
        </div>
    );
}
