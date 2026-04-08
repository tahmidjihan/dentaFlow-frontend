import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

const blogPosts = [
  {
    title: '10 Tips for Maintaining Healthy Teeth Between Visits',
    excerpt: 'Discover simple daily habits that can significantly improve your oral health and reduce the risk of cavities and gum disease.',
    category: 'Dental Health',
    date: 'April 1, 2026',
    readTime: '5 min read',
    icon: 'brush',
  },
  {
    title: 'Understanding Dental Implants: A Complete Guide',
    excerpt: 'Learn everything you need to know about dental implants, from the procedure to recovery and long-term care.',
    category: 'Procedures',
    date: 'March 28, 2026',
    readTime: '8 min read',
    icon: 'construction',
  },
  {
    title: 'How to Choose the Right Toothpaste for Your Needs',
    excerpt: 'Not all toothpastes are created equal. Find out which type is best for your specific dental concerns.',
    category: 'Products',
    date: 'March 22, 2026',
    readTime: '4 min read',
    icon: 'science',
  },
  {
    title: 'The Connection Between Oral Health and Overall Wellness',
    excerpt: 'Research shows that your dental health can impact your entire body. Here is what you need to know.',
    category: 'Research',
    date: 'March 15, 2026',
    readTime: '6 min read',
    icon: 'favorite',
  },
  {
    title: 'Children and Dentistry: Making the First Visit a Success',
    excerpt: 'Expert advice on preparing your child for their first dental appointment and building positive associations.',
    category: 'Pediatric',
    date: 'March 10, 2026',
    readTime: '5 min read',
    icon: 'child_care',
  },
  {
    title: 'Advances in Cosmetic Dentistry: What is New in 2026',
    excerpt: 'From laser whitening to digital smile design, explore the latest innovations in cosmetic dental treatments.',
    category: 'Cosmetic',
    date: 'March 5, 2026',
    readTime: '7 min read',
    icon: 'auto_awesome',
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className='pt-32 pb-24 min-h-screen px-4 md:px-8 max-w-screen-2xl mx-auto'>
        <div className='max-w-3xl mx-auto mb-12 text-center'>
          <span className='font-label text-primary tracking-[0.2em] uppercase text-xs font-semibold mb-4 block'>
            Dental Health Resources
          </span>
          <h1 className='font-headline text-4xl md:text-5xl font-bold text-on-surface tracking-tighter mb-4'>
            Our Blog
          </h1>
          <p className='font-body text-lg text-on-surface-variant'>
            Expert advice, latest research, and practical tips for maintaining
            optimal dental health.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto'>
          {blogPosts.map((post) => (
            <article
              key={post.title}
              className='bg-surface-container-lowest rounded-2xl border border-outline-variant/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow group'
            >
              {/* Image placeholder */}
              <div className='w-full h-48 bg-surface-container-high flex items-center justify-center'>
                <span className='material-symbols-outlined text-primary text-5xl opacity-50'>
                  {post.icon}
                </span>
              </div>

              <div className='p-6'>
                <div className='flex items-center gap-3 mb-3'>
                  <span className='text-xs font-semibold text-primary uppercase tracking-wider'>
                    {post.category}
                  </span>
                  <span className='text-xs text-on-surface-variant'>•</span>
                  <span className='text-xs text-on-surface-variant'>
                    {post.readTime}
                  </span>
                </div>

                <h2 className='font-headline text-lg font-bold text-on-surface mb-2 group-hover:text-primary transition-colors line-clamp-2'>
                  {post.title}
                </h2>

                <p className='text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-3'>
                  {post.excerpt}
                </p>

                <div className='flex items-center justify-between'>
                  <span className='text-xs text-on-surface-variant'>
                    {post.date}
                  </span>
                  <Link
                    href='/blog'
                    className='text-sm font-medium text-primary hover:underline flex items-center gap-1'
                  >
                    Read More
                    <span className='material-symbols-outlined text-base'>
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
