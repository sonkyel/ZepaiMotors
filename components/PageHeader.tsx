"use client";

import { motion } from "motion/react";

export function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="border-b border-line bg-ink pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.22em] text-rev"
          >
            <span className="h-px w-8 bg-rev" />
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="display max-w-4xl text-5xl text-bone sm:text-7xl"
        >
          {title}
        </motion.h1>
        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-xl text-[16px] leading-relaxed text-fog sm:text-[17px]"
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
