'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { SectionHead } from '@/components/arena';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { supporters, supportersSource } from '@/lib/supporters';

export function SupportersSection() {
  return (
    <section className="section supporters-section" id="soutiens">
      <SectionHead
        number="LE SPORT NOUS RÉUNIT"
        title={
          <>
            Nous avons
            <br />
            <em>leur soutien.</em>
          </>
        }
        description="Des disciplines différentes. Une même envie de faire grandir les rencontres dans le sport."
      />
      <Carousel
        className="supporters-carousel"
        aria-label="Les 13 sportifs qui soutiennent Opportunity Players"
        aria-roledescription="carrousel"
        opts={{
          align: 'start',
          slidesToScroll: 'auto',
          breakpoints: { '(prefers-reduced-motion: reduce)': { duration: 0 } },
        }}
      >
        <div className="supporters-toolbar">
          <span>
            <i aria-hidden="true" />
            13 SPORTIFS · UN COLLECTIF
          </span>
          <div className="supporters-controls">
            <CarouselPrevious
              className="supporters-control"
              aria-label="Voir les sportifs précédents"
            />
            <CarouselNext
              className="supporters-control"
              aria-label="Voir les sportifs suivants"
            />
          </div>
        </div>
        <CarouselContent className="supporters-track">
          {supporters.map((person, index) => (
            <CarouselItem
              className="supporter-slide"
              key={person.name}
              aria-label={`${index + 1} sur ${supporters.length}`}
              aria-roledescription="portrait"
            >
              <a
                className="supporter-card"
                href={person.sourceUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${person.name}, ${person.sport} — voir la photo originale, nouvel onglet`}
              >
                <div className="supporter-portrait">
                  <Image
                    unoptimized
                    src={person.src}
                    alt={person.name}
                    width={person.width}
                    height={person.height}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="supporter-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="supporter-caption">
                  <div>
                    <h3>{person.name}</h3>
                    <p>{person.sport}</p>
                  </div>
                  <ArrowUpRight size={19} aria-hidden="true" />
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="supporters-source">
        <span>PORTRAITS ORIGINAUX · COULEURS RÉVÉLÉES AU SURVOL</span>
        <a href={supportersSource} target="_blank" rel="noreferrer">
          Soutiens présentés sur le site actuel{' '}
          <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
