//Reviews table interface 

export async function getReviewers( userid ) {
  const response = await fetch('/reviews/reviewer/'+userid)
  const body = await response.json()
  return body;
}

export async function getReviewees( userid ) {
  const response = await fetch('/reviews/reviewee/'+userid)
  const body = await response.json()
  return body;
}

export async function addReview( review ) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( review )
  }
  const response = await fetch('/reviews', options)
  const body = await response.json()
  return body;
}

export async function editReview( review, reviewid ) {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify( review )
  }
  const response = await fetch('/reviews/'+reviewid, options)
  const body = await response.json()
  return body;
}

export default addReview;