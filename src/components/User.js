import React, { useEffect, useState, Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useLocation } from "react-router-dom";
import { API_URLS, POST_APP } from '../constants'



const User = (props) => {
    const userId = props.params ? props.params.id : '';
    const location = useLocation();

    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({
        name: '',
        username: '',
        company: '',
        email: '',
        website: ''
    })
    let usersData = props.data || []
    const filterBy = () => true;

    const handleSearch = (query) => {
        setIsLoading(true);
        if (usersData.length) {
            const userList = usersData.filter((item) => {
                return item.name.toLowerCase().includes(query ? query.toLowerCase() : '')
            })
            setOptions(userList);
            setIsLoading(false);
        } else {
            fetch(API_URLS.USERS)
                .then(res => res.json())
                .then(users => {
                    const userList = users.filter((item) => {
                        return item.name.toLowerCase().includes(query ? query.toLowerCase() : '')
                    })
                    setTimeout(() => setOptions(userList), 0);
                    setIsLoading(false);
                })
        }


    };


    useEffect(() => {
        if (userId) {
            fetch(API_URLS.USER.format(userId))
                .then(res => res.json())
                .then(user => {
                    setUser(user)
                })
                .catch(err => console.log(err))
        }

    }, [])

    const handleChange = (selected) => {
        if (selected.length) {
            const userId = selected[0].id;
            fetch(API_URLS.USER.format(userId))
                .then(res => res.json())
                .then(user => {
                    console.log(user)
                    setUser(user)
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <Fragment>

            <Container className='search-textinput'>
                <p>{location.pathname.includes('/user') ? <a href="/">{POST_APP.BACK_TO_POSTS}</a> : null}</p>
                <AsyncTypeahead
                    filterBy={filterBy}
                    isLoading={isLoading}
                    id="async-example"
                    labelKey="name"
                    minLength={1}
                    onSearch={handleSearch}
                    options={options}
                    onChange={(selected) => handleChange(selected)}
                    placeholder={POST_APP.SEARCH_USER}
                    renderMenuItemChildren={(option, props) => (
                        <Fragment>
                            <span>{option.name}</span>
                        </Fragment>
                    )}
                />
            </Container>
            {user.username ? <Container className='user-details'>
                <Row>
                    <Col>{POST_APP.USERNAME}</Col><Col> {user.username}</Col>
                </Row>
                <Row>
                    <Col>{POST_APP.FULLNAME}</Col><Col> {user.name}</Col>
                </Row>
                <Row>
                    <Col>{POST_APP.EMAIL}</Col><Col>{user.email}</Col>
                </Row>
                <Row>
                    <Col>{POST_APP.WEBSITE}</Col><Col><a href={user.website}>{user.website} </a></Col>
                </Row>
                <Row>
                    <Col>{POST_APP.COMPANY}</Col>
                    <Col>
                        <div>{user.company.name}</div>
                        <div>{user.company.catchPhrase}</div>
                        <div>{user.company.bs}</div>
                    </Col>
                </Row>
                <p>{location.pathname.includes('/user') ? <a href="/">{POST_APP.BACK_TO_POSTS}</a> : null}</p>

            </Container > : null}



        </Fragment>

    )
}

export default User;