import React from 'react';
import Navigation from '../components/Navigation/Navigation';

interface DefaultProps {
  children: React.ReactNode;
}

function Default({ children }: DefaultProps) {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>{children}</main>
      <footer></footer>
    </>
  );
}

export default Default;
