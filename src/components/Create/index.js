import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import app from '../../services/firebase';

export default class Create extends Component {
  state = {
    title: '',
    description: '',
    author: '',
  };

  onChange = (event) => {
    const { state } = this;

    state[event.target.name] = event.target.value;

    this.setState(state);
  };

  onSubmit = async (event) => {
    event.preventDefault();

    const ref = app.firestore().collection('lists');

    const { title, description, author } = this.state;

    try {
      await ref.add({ title, description, author });

      this.props.history.push('/');
    } catch (error) {
      alert('Erro ao criar item');
    }
  };

  render() {
    const { title, description, author } = this.state;

    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Adicionar item</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/" class="btn btn-primary">
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
                  value={title}
                  onChange={this.onChange}
                  placeholder="Title"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Descrição:</label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={this.onChange}
                  placeholder="Description"
                  cols="80"
                  rows="3"
                >
                  {description}
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="author">Autor:</label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  value={author}
                  onChange={this.onChange}
                  placeholder="Author"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Criar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
