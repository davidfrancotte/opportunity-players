import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import posts from '@/lib/blog-posts.json';
import styles from './blog-preview.module.css';

export function BlogPreview() {
  return (
    <section id="blog" className={`section ${styles.section}`} aria-labelledby="blog-preview-title">
      <div className={styles.heading}>
        <div>
          <span className="section-label">LE BLOG / PARCOURS ET RENCONTRES</span>
          <h2 id="blog-preview-title">Le sport se <em>raconte.</em></h2>
        </div>
        <p>Des portraits, des entretiens et des histoires qui font vivre notre communauté.</p>
      </div>
      <div className={styles.grid}>
        {posts.slice(0, 4).map(post => (
          <article className={styles.card} key={post.slug}>
            <Link className={styles.cardLink} href={`/blog/${post.slug}`} aria-label={`Lire l’article : ${post.title}`}>
              <div className={styles.image}><img src={post.thumbnail} alt="" loading="lazy" decoding="async"/></div>
              <time dateTime={post.isoDate}>{post.date}</time>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
              <span className={styles.read}>Lire l’article <ArrowUpRight size={17} aria-hidden="true"/></span>
            </Link>
          </article>
        ))}
      </div>
      <div className={styles.more}>
        <Link href="/blog" className="text-link">Voir plus d’articles <ArrowUpRight size={19} aria-hidden="true"/></Link>
      </div>
    </section>
  );
}
