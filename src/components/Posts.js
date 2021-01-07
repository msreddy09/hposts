import React, { useCallback, useEffect, useMemo, useState, lazy, Fragment } from 'react';
import { Media, Container, Row, Col } from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import User from './User'
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { API_URLS, POST_APP } from '../constants'


const Posts = () => {
    let postsData = null;
    let finalPostsData = [];
    const [postsList, setPostsList] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const history = useHistory();


    useEffect(() => {
        fetch(API_URLS.POSTS)
            .then(res => res.json())
            .then((allPosts) => {
                postsData = [...allPosts];
                fetch(API_URLS.USERS)
                    .then((res) => res.json())
                    .then((allUsers) => {
                        setUsersData(allUsers);
                        postsData.forEach(post => {
                            allUsers.forEach(user => {
                                if (post.userId === user.id) {
                                    finalPostsData.push({ ...post, 'username': user.username })
                                }
                            })
                        });
                        setPostsList(finalPostsData)
                    })

            }, (error) => {
                console.log(error)
            })
    }, [])
    const onPostClickHandler = (n) => {
        history.push('/pview/' + n);
    }
    const onUserClickHandler = (event, n) => {
        event.stopPropagation();
        history.push('/user/' + n)
    }

    return (
        <Container>
            <Row>
                <Col sm={8}>
                    <p style={{ "borderBottom": "1px solid #eee", "padding": "10px 0" }}>{POST_APP.POSTS} ({postsList.length}) </p>
                    {postsList.map(item =>
                        <Media key={item.id} onClick={() => onPostClickHandler(item.id)}>
                            <img
                                width={64}
                                height={64}
                                className="mr-3"
                                src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2264%22%20height%3D%2264%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2064%2064%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1767c102fec%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1767c102fec%22%3E%3Crect%20width%3D%2264%22%20height%3D%2264%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2214.4921875%22%20y%3D%2237.4046875%22%3E64x64%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
                                alt="Generic placeholder"
                            />
                            <Media.Body>
                                <span className="post-username" onClick={(event) => onUserClickHandler(event, item.userId)}>{item.username}</span>
                                <p> {item.title}</p>
                            </Media.Body>
                        </Media>
                    )}</Col>
                <Col sm={4}>
                    <User data={usersData} />
                    <Container>
                        <p>{POST_APP.ALLUSERS} ({usersData.length})</p>

                        {usersData.map(item => <li key={item.id}><a href={'/user/' + item.id}>{item.name}</a></li>)}

                    </Container>

                </Col>
            </Row>
        </Container >
    )
}
export default Posts
