import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import posts from '@/lib/blog-posts.json';
import '../blog.css';
export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} — Opportunity Players` : 'Article introuvable',
    description: post?.introduction,
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  return (
    <main id="main" className="op-blog blog-article">
      <header className="section blog-article-heading">
        <Link href="/blog" className="text-link">
          <ArrowLeft size={18} /> Retour au blog
        </Link>
        <span className="blog-meta">
          ARTICLE PUBLIÉ LE <time dateTime={post.isoDate}>{post.date}</time>
        </span>
        <h1>{post.title}</h1>
        <p>{post.introduction}</p>
      </header>
      <div className="section blog-article-cover">
        <img src={post.image} alt={post.title} fetchPriority="high" />
      </div>
      <article
        className="blog-article-body"
        aria-label="Contenu de l’article"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
      {post.gallery.length > 0 && (
        <section
          className="section blog-gallery"
          aria-label="Photos de l’article"
        >
          {post.gallery.map((image, i) => (
            <a
              href={image}
              target="_blank"
              rel="noreferrer"
              key={image}
              aria-label={`Agrandir la photo ${i + 1}`}
            >
              <img
                src={image}
                alt={`${post.title} — photo ${i + 1}`}
                loading="lazy"
              />
            </a>
          ))}
        </section>
      )}
      <div className="section blog-article-bottom">
        <Link href="/blog" className="text-link">
          <ArrowLeft size={18} /> Retour au blog
        </Link>
        <a href={post.source} target="_blank" rel="noreferrer">
          Publication d’origine <ArrowUpRight size={16} />
        </a>
      </div>
      {post.cta.title && (
        <section className="section blog-cta">
          <h2>{post.cta.title}</h2>
          <p>{post.cta.text}</p>
          <Link className="button-primary" href="/rejoindre">
            {post.cta.label}
            <ArrowUpRight size={18} />
          </Link>
        </section>
      )}
    </main>
  );
}
