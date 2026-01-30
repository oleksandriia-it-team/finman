'use client';

import { Accordion, AccordionItem } from '../client/shared/сomponents/accordion';
import { useState } from 'react';

export default function MainPage() {
  const [selectedAccordion, setAccordion] = useState(0);

  // TODO: remove later, it's an example
  return (
    <Accordion>
      <AccordionItem
        setAccordion={() => setAccordion(0)}
        show={selectedAccordion === 0}
        title="Dima"
      >
        Dima desc
      </AccordionItem>
      <AccordionItem
        setAccordion={() => setAccordion(1)}
        show={selectedAccordion === 1}
        title="Mark"
      >
        Mark desc
      </AccordionItem>
      <AccordionItem
        setAccordion={() => setAccordion(2)}
        show={selectedAccordion === 2}
        title="Artur"
      >
        Artur desc
      </AccordionItem>
    </Accordion>
  );
}
