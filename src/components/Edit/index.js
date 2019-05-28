import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import app from '../../services/firebase';

export default class Edit extends Component {
  state = {
    key: '',
    title: '',
    description: '',
    author: '',
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
      const item = doc.data();

      this.setState({
        key: doc.id,
        title: item.title,
        description: item.description,
        author: item.author,
      });
    } else {
      alert('Nenhum documento encontrado');
    }
  };

  onChange = (e) => {
    const { state } = this;

    state[e.target.name] = e.target.value;

    this.setState(state);
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const { title, description, author } = this.state;

    const updateRef = app
      .firestore()
      .collection('lists')
      .doc(this.state.key);

    try {
      await updateRef.set({
        title,
        description,
        author,
      });

      this.setState({
        key: '',
        title: '',
        description: '',
        author: '',
      });

      this.props.history.push(`/show/${this.props.match.params.id}`);
    } catch (error) {
      console.error('Erro ao editar item');
    }
  };

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Editar Item</h3>
          </div>

          <div className="panel-body">
            <h4>
              <Link to={`/show/${this.state.key}`} class="btn btn-primary">
                Voltar
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="title">Título:</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição:</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  placeholder="Description"
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Autor:</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>

              <button type="submit" className="btn btn-success">
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
