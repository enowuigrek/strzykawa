import React from 'react';
import CoffeeCard from '../components/CoffeeCard.jsx';
import coffees from '../data/coffees.js';

/**
 * Coffees page renders a grid of coffee cards.  The data is
 * currently imported from a local module but can be replaced with
 * content fetched from a CMS in the future.  A heading and grid
 * container provide structure and spacing.
 */
function Coffees() {
  return (
    <section className="container" style={{ padding: '4rem 0' }}>
      <h2
        style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}
      >
        Nasze kawy
      </h2>
      <div className="coffee-grid">
        {coffees.map((coffee) => (
          <CoffeeCard key={coffee.id} coffee={coffee} />
        ))}
      </div>
    </section>
  );
}

export default Coffees;