import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import app from '../../services/firebase';

import LogOut from '../../components/LogOut';

// import { Container } from './styles';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.ref = app.firestore().collection('lists');
    this.unsubscribe = null;
    this.state = {
      boards: [],
    };
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  onCollectionUpdate = (querySnapshot) => {
    const boards = [];
    querySnapshot.forEach((doc) => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        description,
        author,
      });
    });
    this.setState({
      boards,
    });
  };

  render() {
    return (
      <div className="container">
        <LogOut />

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">BOARD LIST</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/create">Add Board</Link>
            </h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board => (
                  <tr>
                    <td>
                      <Link to={`/show/${board.key}`}>{board.title}</Link>
                    </td>
                    <td>{board.description}</td>
                    <td>{board.author}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
