import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

import getUsers from '../services/api/users'
import Header from './header';
import {FormDialog, DeleteDialog } from './userComponent';
import {AssignReviewDialog, ReviewResult} from './reviewComponent';

class Admin extends Component {
  state = {
    heads: ['id', 'name', 'position', 'email', 'age', 'gender', 'Review', 'controller'],
    users: '',
    loading: true
  }

  componentDidMount() {
    getUsers()
    .then(res => this.setState({users: res, loading: false}))
    .catch(err => console.log(err))
  }

  updateUsers = () => {
    getUsers()
    .then(res => this.setState({users: res, loading: false}))
    .catch(err => console.log(err))
  }
  
  render() {
    return (
      <>
        <Header name="admin"/>
        <Paper style={style}>
          <FormDialog update={this.updateUsers}/>
          <Table>
            <TableHead>
              <TableRow>
                { this.state.heads.map( (head, i) => {
                  return <TableCell key={i}>{head}</TableCell>
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {!this.state.loading ?
                this.state.users.map( (user) => {
                  return(
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell><a href={`/review/${user.id}`}>{user.name}</a></TableCell>
                      <TableCell>{user.position}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.age}</TableCell>
                      <TableCell>{user.gender}</TableCell>
                      <TableCell><ReviewResult value={user.id}/></TableCell>
                      <TableCell>
                        <FormDialog value={user} update={this.updateUsers} />
                        <DeleteDialog value={user.id} update={this.updateUsers} />
                        <AssignReviewDialog value={user.id} update={this.updateUsers}/>
                      </TableCell>
                    </TableRow>
                  )
                }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
      </>
    );
  }
}

const style={
  width: '80%',
  margin: '100px auto'
}

export default Admin;