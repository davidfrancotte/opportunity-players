'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { faqGroups } from '@/lib/faq';
const normalize = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
export function FaqDirectory() {
  const [query, setQuery] = useState('');
  const groups = faqGroups
    .map((g) => ({
      ...g,
      items: g.items.filter((i) =>
        normalize(`${g.title} ${i.question} ${i.answer}`).includes(
          normalize(query.trim()),
        ),
      ),
    }))
    .filter((g) => g.items.length);
  const total = groups.reduce((sum, g) => sum + g.items.length, 0);
  return (
    <div className="faq-directory">
      <div className="faq-directory-tools">
        <label htmlFor="faq-search-new">
          <Search size={21} />
          <Input
            id="faq-search-new"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher : tarif, enfant, match…"
            aria-label="Rechercher une réponse"
          />
        </label>
        <span aria-live="polite">
          {total} réponse{total > 1 ? 's' : ''}
        </span>
      </div>
      <div className="faq-directory-layout">
        <nav aria-label="Thèmes de la FAQ">
          {groups.map((g) => (
            <a href={`#faq-${g.id}`} key={g.id}>
              {g.title}
              <span>{g.items.length}</span>
            </a>
          ))}
          <Link href="/tarifs" className="faq-plans-link">
            Comparer les formules <ArrowUpRight size={16} />
          </Link>
        </nav>
        <div>
          {groups.map((g) => (
            <section id={`faq-${g.id}`} className="faq-topic" key={g.id}>
              <h2>{g.title}</h2>
              <Accordion multiple className="faq-topic-list">
                {g.items.map((i) => (
                  <AccordionItem value={i.question} key={i.question}>
                    <AccordionTrigger className="faq-topic-question">
                      {i.question}
                    </AccordionTrigger>
                    <AccordionContent className="faq-topic-answer">
                      <p>{i.answer}</p>
                      {i.href && (
                        <Link href={i.href}>
                          {i.link}
                          <ArrowUpRight size={16} />
                        </Link>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          ))}
          {total === 0 && (
            <div className="faq-no-result">
              <h2>Aucune réponse trouvée.</h2>
              <p>
                Essayez un autre mot ou contactez l’équipe depuis la page Aide.
              </p>
              <Button onClick={() => setQuery('')}>Effacer la recherche</Button>
              <Link href="/aide">Contacter l’équipe</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
