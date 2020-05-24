import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './header';

import {ReviewDialog} from './reviewComponent';
import {getReviewers} from '../services/api/reviews'

class Review extends Component {
  state = {
    heads: ['reviewee id', 'reviewee', 'position', 'email', 'age', 'gender', 'Review', 'status'],
    reviewer: this.props.match.params.userid,
    reviewee: [],
    revieweeInfo: [],
    loading: true
  }

  componentDidMount() {
    getReviewers( this.state.reviewer )
    .then( (res) => {
      this.setState({reviewee: res, loading: false})
    })
    .catch(err => console.log(err))
  }

  updateReviewers = () => {
    getReviewers( this.state.reviewer )
    .then( (res) => {
      this.setState({reviewee: res, loading: false})
    })
    .catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <Header name="Employee Review"/>
        <Paper style={style}>
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
                this.state.reviewee.map( (user) => {
                  return(
                    <TableRow key={user.id}>
                      <TableCell>{user.reviewee.id}</TableCell>
                      <TableCell>{user.reviewee.name}</TableCell>
                      <TableCell>{user.reviewee.position}</TableCell>
                      <TableCell>{user.reviewee.email}</TableCell>
                      <TableCell>{user.reviewee.age}</TableCell>
                      <TableCell>{user.reviewee.gender}</TableCell>
                      <TableCell>{user.score ? 'Done' : 'Todo' }</TableCell>
                      <TableCell>
                        <ReviewDialog value={user} reviewId={user.id} update={this.updateReviewers}/>
                      </TableCell>
                    </TableRow>
                  )
                }) :
              <TableRow>
                <TableCell colSpan="12" align="center">
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

export default Review;