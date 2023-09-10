import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

class BusinessLocatorMap extends Component {
  state = {
    businesses: [],
  };

  componentDidMount() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWthc2g5MTIiLCJhIjoiY2xtZDRvZHJkMXE3djNubXhzbmJwMjR0ZCJ9.Cre1eUWD2Sk2phndHr3D-g'; // Replace with your Mapbox Access Token
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11', // Replace with your desired map style
      center: [-0.09, 51.505], // Replace with your initial coordinates
      zoom: 13, // Replace with your initial zoom level
    });

    // Generate random points and add markers
    const generateRandomPoint = () => {
      const minLat = 51.48;
      const maxLat = 51.52;
      const minLon = -0.12;
      const maxLon = -0.08;

      const randomLat = minLat + Math.random() * (maxLat - minLat);
      const randomLon = minLon + Math.random() * (maxLon - minLon);

      return [randomLon, randomLat]; // Note: Mapbox uses [longitude, latitude] order
    };

    const businesses = [
      {
        id: 1,
        name: 'Joe\'s Coffee Shop',
        position: generateRandomPoint(),
        description: 'A cozy coffee shop in the heart of the city.',
      },
      {
        id: 2,
        name: 'Linda\'s Boutique',
        position: generateRandomPoint(),
        description: 'A boutique offering the latest fashion trends.',
      },
      {
        id: 3,
        name: 'Mike\'s Pizzeria',
        position: generateRandomPoint(),
        description: 'Authentic Italian pizza made with love.',
      },
      {
        id: 4,
        name: 'Sara\'s Bookstore',
        position: generateRandomPoint(),
        description: 'A haven for book lovers with a wide selection of books.',
      },
      {
        id: 5,
        name: 'Tom\'s Electronics',
        position: generateRandomPoint(),
        description: 'Your one-stop shop for electronics and gadgets.',
      },
      {
        id: 6,
        name: 'Grace\'s Florist',
        position: generateRandomPoint(),
        description: 'Beautiful flowers and floral arrangements for all occasions.',
      },
      {
        id: 7,
        name: 'John\'s Art Gallery',
        position: generateRandomPoint(),
        description: 'Explore stunning artworks by local artists.',
      },
      {
        id: 8,
        name: 'Lisa\'s Yoga Studio',
        position: generateRandomPoint(),
        description: 'Discover inner peace and wellness through yoga.',
      },
      {
        id: 9,
        name: 'Paul\'s Hardware Store',
        position: generateRandomPoint(),
        description: 'Everything you need for your DIY projects.',
      },
      {
        id: 10,
        name: 'Emily\'s Bakery',
        position: generateRandomPoint(),
        description: 'Delicious pastries and baked goods to satisfy your cravings.',
      },
    ];

    businesses.forEach((business) => {
      new mapboxgl.Marker()
        .setLngLat(business.position)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            `<h3>${business.name}</h3><p>${business.description}</p>`
          )
        )
        .addTo(map);
    });

    this.setState({ businesses });
  }

  render() {
    return (
      <div>
        <div
          ref={(el) => (this.mapContainer = el)}
          style={{ width: '100%', height: '500px', float: 'left' }}
        />
        <div style={{ float: 'right', marginLeft: '20px' }}>
          <h2>Small Businesses</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {this.state.businesses.map((business) => (
                <tr key={business.id}>
                  <td>{business.id}</td>
                  <td>{business.name}</td>
                  <td>{business.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default BusinessLocatorMap;
