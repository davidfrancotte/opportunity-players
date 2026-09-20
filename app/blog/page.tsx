import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import posts from '@/lib/blog-posts.json';
import './blog.css';
export const metadata: Metadata = {
  title: 'Blog — Opportunity Players',
  description:
    'Les entretiens, portraits et actualités du blog Opportunity Players.',
};
export default function BlogPage() {
  const [featured, ...others] = posts;
  return (
    <main id="main" className="op-blog">
      <header className="blog-heading section">
        <div>
          <span className="section-label">OPPORTUNITY PLAYERS / LE BLOG</span>
          <h1>
            Le sport se <em>raconte.</em>
          </h1>
        </div>
        <p>
          Des parcours, des rencontres.
          <br />
          Les voix de notre communauté.
        </p>
      </header>
      <section className="section blog-feature" aria-label="Dernier article">
        <Link
          className="blog-feature-image"
          href={`/blog/${featured.slug}`}
          aria-label={featured.title}
        >
          <img src={featured.image} alt={featured.title} fetchPriority="high" />
        </Link>
        <div className="blog-feature-copy">
          <span className="blog-meta">
            ARTICLE PUBLIÉ LE{' '}
            <time dateTime={featured.isoDate}>{featured.date}</time>
          </span>
          <h2>
            <Link href={`/blog/${featured.slug}`}>{featured.title}</Link>
          </h2>
          <p>{featured.summary}</p>
          <Link className="text-link" href={`/blog/${featured.slug}`}>
            Lire l’article <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <section
        className="section blog-archive"
        aria-labelledby="other-articles"
      >
        <div className="blog-archive-heading">
          <h2 id="other-articles">Autres actualités</h2>
          <span>{others.length} articles</span>
        </div>
        <div className="blog-grid">
          {others.map((a) => (
            <article className="blog-card" key={a.slug}>
              <Link
                className="blog-card-image"
                href={`/blog/${a.slug}`}
                aria-label={a.title}
              >
                <img src={a.thumbnail} alt={a.title} loading="lazy" />
              </Link>
              <span className="blog-meta">
                ARTICLE PUBLIÉ LE <time dateTime={a.isoDate}>{a.date}</time>
              </span>
              <h3>
                <Link href={`/blog/${a.slug}`}>{a.title}</Link>
              </h3>
              <p>{a.summary}</p>
              <Link className="text-link" href={`/blog/${a.slug}`}>
                Lire l’article <ArrowUpRight size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
