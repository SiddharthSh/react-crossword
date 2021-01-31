import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { PublicPage } from './pages';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Route exact path="/" component={PublicPage} />
    </BrowserRouter>
  );
};

export default App;
