import React, { useEffect, useState } from 'react';
import { Media, Container, Alert } from 'react-bootstrap'
import { API_URLS, POST_APP } from '../constants'

const PostPreview = (props) => {
    const [post, setPost] = useState({})
    const [username, setUsername] = useState('')
    const [comments, setComments] = useState([])
    const [error, setError] = useState('')
    const postId = props.params.id;

    useEffect(() => {
        fetch(API_URLS.POST.format(props.params.id))
            .then(res => res.json())
            .then((postPreviwData) => {
                setPost(postPreviwData)
                fetch(API_URLS.USER.format(postPreviwData.userId))
                    .then(res => res.json())
                    .then(user => {
                        setUsername(user.username)
                        fetch(API_URLS.COMMENTS.format(postId))
                            .then(res => res.json())
                            .then((comments) => {
                                setComments(comments)
                            })
                            .catch(err => setError('Unable to fetch Comments. Please Re-try'))
                    })
                    .catch(err => setError('Unable to fetch User. Please Re-try'))
            })
            .catch(err => { setError('Unable to fetch posts. Please Re-try') })
    }, [])
    return (
        <Container>
            {error != '' ? <Alert variant='danger'> {error}</Alert> : null}
            <p><a href="/">{POST_APP.BACK_TO_POSTS}</a> </p>
            <div className='post-section'>
                <h5>{username}</h5>
                <p>{post.title}</p>
                <p>{post.body}</p>
            </div>
            <div className='comments-section'>
                <h6> {POST_APP.COMMENTS} ({comments.length})</h6>
                {comments.map(item =>
                    <Media key={item.id}>
                        {<img
                            width={48}
                            height={48}
                            className="mr-3"
                            src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2248%22%20height%3D%2248%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1767c102fec%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1767c102fec%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2214.4921875%22%20y%3D%2237.4046875%22%3E48x48%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                            alt="Generic placeholder"
                        />}
                        <Media.Body>
                            <span className="comment-name" >{item.name}</span>
                            <div> {item.body}</div>
                            <span> <b>{POST_APP.EMAIL}:</b> {item.email}</span>
                        </Media.Body>
                    </Media>
                )}
            </div>
            <p><a href="/">{POST_APP.BACK_TO_POSTS}</a> </p>

        </Container>
    )
}

export default PostPreview