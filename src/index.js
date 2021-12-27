import React from 'react';

import './index.css';
import App from './app/App';
import Credits from './pages/CreditsPage/Credits';
import GraphPage from './pages/GraphPage/GraphPage';
import VaccinePage from './pages/VaccinePage/VaccinePage';
import DeathsPage from './pages/DeathsPage/Deaths';

import * as serviceWorker from './serviceWorker';

import './locales';

import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path="credits"
          element={<Credits />}
        />
        <Route path="graphs" element={<GraphPage />} />
        <Route path="vaccination" element={<VaccinePage />} />
        <Route path="deaths" element={<DeathsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

serviceWorker.unregister();
