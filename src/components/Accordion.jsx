import { useState } from 'react';
import { ChevronIcon } from './icons';

// Аккордеон по доступному шаблону: кнопка aria-expanded + управляемая панель
export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const open = openIndex === i;
        const panelId = `faq-panel-${i}`;
        const btnId = `faq-btn-${i}`;
        return (
          <div className="accordion__item" key={item.question}>
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                className="accordion__btn"
                id={btnId}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? -1 : i)}
              >
                {item.question}
                <ChevronIcon />
              </button>
            </h3>
            <div
              id={panelId}
              className="accordion__panel"
              role="region"
              aria-labelledby={btnId}
              hidden={!open}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
