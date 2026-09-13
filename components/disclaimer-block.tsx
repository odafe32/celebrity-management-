"use client";

import { motion } from "motion/react";
// import { Info } from "lucide-react";

export function DisclaimerBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-lg border border-border/60 bg-muted/50 p-4"
    >
      {/* <div className="flex items-start gap-2">
        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <p className="text-xs leading-relaxed text-muted-foreground">
          These biographies have been collected from different sources and are
          provided here with minimal editing. MyCelebrityBookings acts as an
          entertainment broker/producer for corporate functions, private
          engagements, and special events. We do not claim or represent itself
          as the exclusive booking agent or agency for all of the celebrities on
          this website.
        </p>
      </div> */}
    </motion.div>
  );
}
