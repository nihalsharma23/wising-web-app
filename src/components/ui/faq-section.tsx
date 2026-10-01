import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { Badge } from "./badge";
import { MagicText } from "./magic-text";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What jurisdictions do you currently support?",
    answer:
      "Currently, our engine is exclusively hyper-optimized for the complexities of the India-US tax corridor. This allows us to handle incredibly nuanced rules (like PFIC vs. Indian Mutual Funds, or STCG/LTCG mismatches) that generic global software misses.",
  },
  {
    question: "Is Wising an AI tool?",
    answer:
      "No. Tax compliance requires 100% mathematical certainty, not probabilistic guesses. Wising is powered by a proprietary, deterministic rules engine built specifically on the India-US tax code. Every calculation, from FTC residuals to DTAA treaty application, is hard-coded by cross-border tax experts to guarantee exact, reliable accuracy for your firm.",
  },
  {
    question: "Does Wising replace our current tax prep software (like CCH or ProSystem)?",
    answer:
      "No. Wising sits upstream from your final filing software. It acts as the intelligent reconciliation layer—handling the complex cross-border math, conflict detection, and FTC calculation—before you enter the final, clean numbers into your prep software for filing.",
  },
  {
    question: "How does Wising handle Double Taxation Avoidance Agreements (DTAA)?",
    answer:
      "Wising's cross-border tax software automatically applies the specific clauses of the India-US DTAA to your clients' overlapping income. It instantly calculates the optimal Foreign Tax Credit (FTC) position, ensuring your firm never misses a credit while eliminating manual spreadsheet reconciliation.",
  },
  {
    question: "Can Wising detect complex asset mismatches like PFICs?",
    answer:
      "Yes. Our engine is built to flag exact rule mismatches before they trigger penalties. For example, it instantly highlights discrepancies between Indian Short-Term Capital Gains (STCG) and US Long-Term Capital Gains (LTCG), or identifies Indian Mutual Funds that trigger punitive US PFIC reporting requirements.",
  },
  {
    question: "Do my clients need to enter their data manually?",
    answer:
      "Wising is built for firms, not end-clients. Your team simply inputs the raw India and US facts into our unified intake system once, and our engine automatically structures the data to check for conflicts and compute overlapping liabilities.",
  },
  {
    question: "Is our clients' sensitive financial data secure?",
    answer:
      "Security is our highest priority. Wising is built on a Zero Trust architecture, employing continuous validation, strict microsegmentation, and enterprise-grade encryption to ensure your clients' data is never exposed.",
  },
  {
    question: "How does the beta program work?",
    answer:
      "We are onboarding a select number of early-access firms to ensure white-glove support and onboarding. Join the waitlist today, and our team will reach out to schedule a demo and secure your firm's spot.",
  },
];

export default function FaqSection() {
  return (
    <section className="relative w-full py-20 px-4 flex flex-col items-center justify-center z-20 font-['Manrope',sans-serif]">
      <div className="w-full max-w-3xl flex flex-col items-center gap-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4">
          <Badge variant="secondary" className="px-5 py-2.5 text-[14px] bg-black/50 border border-white/10 backdrop-blur-md text-white/90 rounded-full font-['Manrope',sans-serif] font-semibold tracking-wider w-max mx-auto mb-2 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            FAQ
          </Badge>
          <MagicText 
            text="Frequently Asked Questions"
            className="justify-center px-0"
            wordClassName="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight text-white"
          />
          <p className="text-[#a1a1aa] font-medium text-base mt-2">
            Everything you need to know about the Wising Beta.
          </p>
        </div>

        {/* Accordion */}
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-black/40 border border-white/10 rounded-2xl px-6 py-2 backdrop-blur-sm data-[state=open]:bg-white/[0.03] transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left text-white/90 hover:text-white text-base md:text-[17px] font-semibold hover:no-underline [&[data-state=open]]:text-white [&[data-state=open]>svg]:text-white">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#a1a1aa] text-[15px] leading-relaxed pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
        
      </div>
    </section>
  );
}
