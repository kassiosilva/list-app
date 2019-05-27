import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import app from '../../services/firebase';

class Show extends Component {
  state = {
    board: {},
    key: '',
  };

  componentDidMount() {
    const ref = app
      .firestore()
      .collection('lists')
      .doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          isLoading: false,
        });
      } else {
        console.log('No such document!');
      }
    });
  }

  delete(id) {
    app
      .firestore()
      .collection('lists')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        this.props.history.push('/');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link to="/">Board List</Link>
            </h4>
            <h3 className="panel-title">{this.state.board.title}</h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Description:</dt>
              <dd>{this.state.board.description}</dd>
              <dt>Author:</dt>
              <dd>{this.state.board.author}</dd>
            </dl>
            <Link to={`/edit/${this.state.key}`} class="btn btn-success">
              Edit
            </Link>
            &nbsp;
            <button onClick={this.delete.bind(this, this.state.key)} className="btn btn-danger">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
