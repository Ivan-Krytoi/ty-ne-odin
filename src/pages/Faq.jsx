import PageHead from '../components/PageHead';
import Accordion from '../components/Accordion';
import { FAQ } from '../data/content';

export default function Faq() {
  return (
    <>
      <PageHead
        badge="FAQ"
        title="Вопросы и ответы"
        text="Коротко о том, что чаще всего спрашивают о сайте и о помощи."
      />
      <section className="section" aria-labelledby="faq-title">
        <div className="container">
          <h2 id="faq-title" style={{ marginBottom: 24 }}>
            Список вопросов
          </h2>
          <Accordion items={FAQ} />
        </div>
      </section>
    </>
  );
}
