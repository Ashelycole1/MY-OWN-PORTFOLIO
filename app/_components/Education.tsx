import SectionTitle from '@/components/SectionTitle';
import { EDUCATION, SECTION_IDS } from '@/lib/profile';

const Education = () => {
    return (
        <section className="py-20 md:py-32" id={SECTION_IDS.education}>
            <div className="container">
                <SectionTitle title="Education" />

                <div className="grid gap-10">
                    {EDUCATION.map((item) => (
                        <article key={item.degree}>
                            <p className="text-xl text-muted-foreground">
                                {item.institution}
                            </p>
                            <h3 className="text-3xl md:text-5xl font-anton leading-none mt-3.5 mb-2.5">
                                {item.degree}
                            </h3>
                            {item.expected && (
                                <p className="text-lg text-muted-foreground">
                                    {item.expected}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
