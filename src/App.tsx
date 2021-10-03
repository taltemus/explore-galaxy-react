import Default from './layouts/Default';
import Authentication from './pages/Authentication';
import Bank from './pages/Bank';

function App() {
  return (
    <>
      <Default>
        <Authentication />
        <Bank />
      </Default>
    </>
  );
}

export default App;
