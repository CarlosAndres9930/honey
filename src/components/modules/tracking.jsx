// JustifiedExample.jsx
import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alimentacion from './Alimentacion'; // Ajusta la ruta según tu estructura de carpetas
import Vacunacion from './Vacunacion'; // Ajusta la ruta según tu estructura de carpetas
import Medicinas from './Medicinas'; // Ajusta la ruta según tu estructura de carpetas
import Home from './Home'; // Ajusta la ruta según tu estructura de carpetas

function JustifiedExample() {
  return (
    <Tabs
      defaultActiveKey="home"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="home" title="Historial de seguimiento y control del ejemplar">
        <Home />
      </Tab>
      <Tab eventKey="meds" title="Medicinas">
        <Medicinas />
      </Tab>
      <Tab eventKey="food" title="Alimentación">
        <Alimentacion />
      </Tab>
      <Tab eventKey="vacination" title="Vacunación">
        <Vacunacion />
      </Tab>
    </Tabs>
  );
}

export default JustifiedExample;
