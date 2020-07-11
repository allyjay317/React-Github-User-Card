import React from 'react'
import { Card, Row, Col, Carousel, Button } from 'antd'
const { Meta } = Card

class UserCard extends React.Component{

    constructor(){
        super()
        this.state={
            showFollowers: false
        }
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.data !== this.props.data){
            this.setState({
                showFollowers: false
            })
        }
    }

    render(){
        return (
            <Col span={24}>
                <Card
                    hoverable
                    cover={<img alt={`${this.props.data.userName}'s avatar`} src={this.props.data.avatar}/>}
                    style={{width: '74%', marginLeft: '13%'}}
                >
                    <Meta title={this.props.data.userName} description={
                        <div>
                            <a href={this.props.data.url}>
                                Visit Github Page
                            </a>
                            {this.props.data.followers !== undefined ? (
                            <div>
                                <Button onClick={() => this.setState({showFollowers: !this.state.showFollowers})}>
                                    {`${this.state.showFollowers ? 'Hide' : 'Show'} Followers`}
                                </Button>
                            </div>) : (<></>)}
                        </div>
                    } />
                    
                </Card>
                {this.props.data.followers !== undefined && this.state.showFollowers ? 
                    (
                        <Row justify={"space-around"}>
                                {this.props.data.followers.map(follower =>{
                                    return<Col span={12}> <UserCard data={follower} /></Col>
                                })}
                        </Row>
                    ) : <div></div>}
            </Col>
        )
    }
}

export default UserCard