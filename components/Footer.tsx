import { CONTACT } from '@/lib/profile';

const Footer = () => {
    return (
        <footer className="text-center pb-5" id="contact">
            <div className="container">
                <p className="text-lg">Have a project in mind?</p>
                <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-3xl sm:text-4xl font-anton inline-block mt-5 mb-10 hover:underline"
                >
                    {CONTACT.email}
                </a>

                <div className="text-muted-foreground text-sm leading-relaxed">
                    <p>Design & Built by Niwasiima Ashelycole</p>
                    <p className="mt-1">All rights reserved © {new Date().getFullYear()}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
