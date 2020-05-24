import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { addReview, editReview, getReviewees } from '../services/api/reviews';

export function AssignReviewDialog( {value, update} ) {
  const [open, setOpen] = useState(false);
  const [reviewer] = useState( value );
  const [reviewee, setReviewee] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    addReview({
      "reviewer_id": parseInt(reviewer),
      "reviewee_id": parseInt(reviewee)
    })
    update();
    setOpen(false);
  };  

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Assign 
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Assign a review request.
          </DialogContentText>
          <TextField margin="dense" id="userid" label="User ID" type="text" onInput={(e) => setReviewee(e.target.value)} autoFocus fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Commit review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function ReviewDialog( {value, reviewId, update} ) {
  const [open, setOpen] = useState(false);
  const [reviewer] = useState( value.reviewer_id ? value.reviewer_id : '' );
  const [reviewee] = useState( value.reviewee_id ? value.reviewee_id : '' );
  const [score, setScore] = useState( value.score ? value.score : 5 );
  const [comment, setComment] = useState( value.comment ? value.comment : '' );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    editReview({
      "reviewer": reviewer,
      "reviewee": reviewee,
      "score": score,
      "comment": comment,
    }, reviewId)
    update();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Review
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give score and comment.
          </DialogContentText>
          <Typography id="discrete-slider" gutterBottom> Score </Typography>
          <Slider aria-labelledby="discrete-slider" valueLabelDisplay="auto" defaultValue={5} step={1} marks={[{value:score,label:'Current'}]} min={1} max={10} onChangeCommitted={(e, value) => setScore(value)} />
          <TextField margin="dense" id="comment" label="comment" type="text" defaultValue={comment} onInput={(e) => setComment(e.target.value)} autoFocus fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Commit review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export function ReviewResult( {value} ) {
  const [open, setOpen] = useState(false);
  const [reviews, setReviews] = useState('');
  const [id] = useState(value);

  const handleClickOpen = () => {
    getReviewees(id)
    .then( (res) => {
      setReviews(res);
      setOpen(true);
    })
    .catch(err => console.log(err))
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        CHECK
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
      >
        <DialogTitle id="alert-dialog-title">{"Review Results"}</DialogTitle>
        <DialogContent>
          {Object.keys(reviews).map((r, i) => {
            return(
              <DialogContentText key={i} id="alert-dialog-description">
                {reviews[r].reviewer.name}: {reviews[r].score} ({reviews[r].comment})
              </DialogContentText>
            )
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}