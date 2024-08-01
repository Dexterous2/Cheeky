import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function AccordionPri({array_faq, className, className_ans}) {
    return (
        <Accordion type="single" collapsible className="w-full gap-3">
            {
                array_faq.map((faq, i) => (
                    <AccordionItem key={i + 1} value={`item-${faq.id}`} className='border-0 bg-[#ffffff50] p-2 rounded-xl mt-2'>
                        <AccordionTrigger className={className}> {faq.question} </AccordionTrigger>
                        <AccordionContent className={className_ans}>
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))
            }
        </Accordion>
    )
}
