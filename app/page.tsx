import Feed from '@components/Feed';

const Home: React.FC = () => {
  return (
    <section className='w-full flex-center flex-col items-center'>
      <h1 className='head_text text-center'>
        Discover & Share
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-powered prompts</span>
      </h1>
      <p className='desc text-center'>
        Promptopia is an open-source AI prompting tool for the modern world to discover, create, and share creative prompts.
      </p>

    <div className='w-full'>
      <Feed />
    </div>
    </section>
  );
}

export default Home;
