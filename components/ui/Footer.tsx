import Link from 'next/link';

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterProps {
  brandName?: string;
  links?: FooterLink[];
  copyrightYear?: number;
}

export default function Footer({
  brandName = 'DentaWave',
  links = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Support', href: '/support' },
  ],
  copyrightYear = new Date().getFullYear(),
}: FooterProps) {
  return (
    <footer className="w-full py-12 px-8 mt-auto bg-surface dark:bg-inverse-surface border-t border-on-surface/5 dark:border-inverse-on-surface/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-screen-2xl mx-auto">
        {/* Brand */}
        <div className="font-headline font-bold text-on-surface dark:text-inverse-on-surface text-xl">
          {brandName}
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-8 font-body text-xs uppercase tracking-widest text-secondary dark:text-inverse-on-surface/50">
          {links.map((link) => (
            <Link
              key={link.href}
              className="hover:text-primary underline decoration-primary/30 underline-offset-4 transition-all opacity-80 hover:opacity-100"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <div className="font-body text-xs text-secondary dark:text-inverse-on-surface/50">
          © {copyrightYear} {brandName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
