"use client";

import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  label: string;
  title: React.ReactNode;
  body?: string;
  align?: "left" | "center";
  index?: string;
}

export function SectionHeading({
  label,
  title,
  body,
  align = "left",
  index,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div
      className={`mb-12 md:mb-16 ${centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}`}
    >
      <Reveal y={14}>
        <div
          className={`flex items-center gap-3 ${centered ? "justify-center" : ""}`}
        >
          <span className="h-px w-8 bg-cobalt" aria-hidden />
          <p className="label-tech">{label}</p>
          {index && <span className="label-tech ml-auto hidden md:block">{index}</span>}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="display-tight mt-5 text-4xl text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {body && (
        <Reveal delay={0.16}>
          <p className={`mt-5 max-w-xl text-base leading-relaxed text-muted ${centered ? "mx-auto" : ""}`}>
            {body}
          </p>
        </Reveal>
      )}
    </div>
  );
}
