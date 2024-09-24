import '@styles/globals.css';
import Nav from '@components/Nav';
import Provider from '@components/Provider';
import { getSession } from 'next-auth/react';

export const metadata = {
  title: 'Promptopia',
  description: 'Discover & Share AI Prompts',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  const session = await getSession();

  return (
    <html lang='en'>
      <body>
        <Provider session={session}>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default RootLayout;
