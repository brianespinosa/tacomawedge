import 'sanitize.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/assets.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/page.css';
import { Facebook, Instagram, Twitter } from '@icons-pack/react-simple-icons';

import Head from 'next/head';
import Image from 'next/image';

import ExternalLink from '../components/ExternalLink';
import wedgehistmap from '../img/wedgehistmap.jpg';

const socialStyle = {
  marginRight: '.75em',
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Tacoma Wedge Historic District</title>
        <meta
          name='description'
          content='Information About Tacoma’s Wedge Historic and Conservation District'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <header>
        <h1>Tacoma Wedge</h1>
      </header>

      <main>
        <Image src={wedgehistmap} alt='Wedge Historic District Map'></Image>

        <section>
          <h2>Related Links</h2>
          <ul>
            <li>
              <ExternalLink href='https://www.nps.gov/nr/feature/places/16000856.htm'>
                National Register of Historic Places Program - NPS
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href='https://www.cityoftacoma.org/government/city_departments/planning_and_development_services/historic_preservation/tacomas_historic_districts'>
                Tacoma&apos;s Historic Districts - City of Tacoma
              </ExternalLink>
            </li>
          </ul>
        </section>

        {/* <section>
          <h2>Documents</h2>
          <ul>
            // Looks like this link is dead on the NPS web site. Will have to contact them to get it restored.
            <ExternalLink href='http://www.nps.gov/nr/feature/places/pdfs/16000856>
              Historic District Register Inventory - NPS
            </ExternalLink>
          </ul>
        </section> */}
      </main>
      <footer>
        <h3>Social</h3>

        <ExternalLink
          style={socialStyle}
          href='https://twitter.com/tacomawedge'
        >
          <Twitter aria-label='Twitter' />
        </ExternalLink>

        <ExternalLink
          style={socialStyle}
          href='https://www.instagram.com/tacomawedge/'
        >
          <Instagram aria-label='Instagram' />
        </ExternalLink>

        <ExternalLink
          style={socialStyle}
          href='https://www.facebook.com/tacomawedge/'
        >
          <Facebook aria-label='Facebook' />
        </ExternalLink>
      </footer>
    </>
  );
}
