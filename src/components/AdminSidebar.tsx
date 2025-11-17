'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import { Home, UtensilsCrossed, Carrot, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

interface AdminSidebarProps {
  onLinkClick?: () => void;
}

export function AdminSidebar({ onLinkClick }: AdminSidebarProps) {
  const pathname = usePathname();

  const navLinks = [
    {
      href: '/',
      label: "Retour à l'accueil",
      icon: ArrowLeft,
      divider: true,
    },
    {
      href: '/admin',
      label: 'Dashboard',
      icon: Home,
    },
    {
      href: '/admin/dishes',
      label: 'Plats',
      icon: UtensilsCrossed,
    },
    {
      href: '/admin/vegetables',
      label: 'Légumes',
      icon: Carrot,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href) && href !== '/';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <Logo size="sm" className="mb-3" />
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
            Gestion des plats et légumes
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.href);

          return (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
              {link.divider && (
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
