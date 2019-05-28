import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import app from '../../services/firebase';

class Show extends Component {
  state = {
    items: '',
    key: '',
  };

  componentDidMount() {
    this.requestDoc();
  }

  requestDoc = async () => {
    const ref = app
      .firestore()
      .collection('lists')
      .doc(this.props.match.params.id);

    const doc = await ref.get();

    if (doc.exists) {
      this.setState({
        items: doc.data(),
        key: doc.id,
      });
    } else {
      alert('Item não encontrado');
    }
  };

  delete = async (id) => {
    try {
      await app
        .firestore()
        .collection('lists')
        .doc(id)
        .delete();

      alert('Item removido com sucesso!');
      this.props.history.push('/');
    } catch (error) {
      console.error('Erro ao remover item');
    }
  };

  render() {
    const {
      items: { title, description, author },
    } = this.state;

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link to="/">Board List</Link>
            </h4>

            <h3 className="panel-title">{title}</h3>
          </div>

          <div className="panel-body">
            <dl>
              <dt>Descrição:</dt>
              <dd>{description}</dd>
              <dt>Autor:</dt>
              <dd>{author}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">
              Editar
            </Link>
            &nbsp;
            <button
              type="button"
              onClick={() => this.delete(this.state.key)}
              className="btn btn-danger"
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
