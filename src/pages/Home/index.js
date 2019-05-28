import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import app from '../../services/firebase';

import LogOut from '../../components/LogOut';

import { ContainerPaner } from './styles';

export default class Home extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    const ref = app.firestore().collection('lists');

    ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const items = [];

    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();

      items.push({
        title,
        doc,
        key: doc.id,
        description,
        author,
      });
    });

    this.setState({
      items,
    });
  };

  render() {
    const { items } = this.state;

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading d-flex p-2 bd-highlight justify-content-around">
            <h3 className="panel-title">Lista de itens</h3>
            <LogOut />
          </div>

          <div className="panel-body">
            <h4>
              <Link to="/create">
                <button type="button" className="btn btn-primary">
                  Adicionar
                </button>
              </Link>
            </h4>

            {items.map(item => (
              <ContainerPaner className="card container-card " key={item.key}>
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>

                  <Link to={`/show/${item.key}`} className="btn btn-primary">
                    Mais informações
                  </Link>
                </div>
              </ContainerPaner>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
