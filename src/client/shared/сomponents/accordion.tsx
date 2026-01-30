import { ChildrenComponentProps } from '../models/component-with-chilren.model';
import { ReactNode } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

export function Accordion({ children }: ChildrenComponentProps) {
  return <div className="accordion">{children}</div>;
}

export interface AccordionItemProps {
  title: string | ReactNode;
  show: boolean;
  setAccordion: () => void;
}

export function AccordionItem({ title, show, children, setAccordion }: AccordionItemProps & ChildrenComponentProps) {
  const [parent] = useAutoAnimate();

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${show ? '' : 'collapsed'}`}
          onClick={setAccordion}
          type="button"
        >
          {title}
        </button>
      </h2>
      <div
        className={`accordion-collapse collapse ${show ? 'show' : ''}`}
        ref={parent}
      >
        <div
          className="accordion-body"
          style={{ visibility: 'visible' }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
