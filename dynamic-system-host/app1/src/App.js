import React from 'react';
import { loadComponent } from './utils/loadComponent';

function System(props) {
  const { system, system: { remote, url, module } } = props;

  if (!system || !remote || !url || !module) {
    return <h2>No system specified</h2>;
  }

  const Component = React.lazy(loadComponent(remote, 'default', module, url));

  return (
    <React.Suspense fallback="Loading System">
      <Component />
    </React.Suspense>
  );
}

function App() {
  const [system, setSystem] = React.useState({});

  function setApp2() {
    setSystem({
      remote: 'app2',
      url: 'http://localhost:3002/remoteEntry.js',
      module: './Widget',
    });
  }

  function setApp3() {
    setSystem({
      remote: 'app3',
      url: 'http://localhost:3003/remoteEntry.js',
      module: './Widget',
    });
  }

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will not load any components or modules that have been loaded already.
      </p>
      <button onClick={setApp2}>Load App 2 Widget</button>
      <button onClick={setApp3}>Load App 3 Widget</button>
      <div style={{ marginTop: '2em' }}>
        <System system={system} />
      </div>
    </div>
  );
}

export default App;
