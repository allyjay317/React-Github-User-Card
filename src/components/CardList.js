import React from 'react'
import UserCard from './UserCard'
import { Card, Row } from 'antd'


class CardList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                {this.props.userData.length > 0 ? 
                (
                    this.props.userData.map(user =>{
                        return <Row justify='space-around' style={{width: '50%', marginLeft: '25%'}}><UserCard data={user} /></Row>
                    })
                ) : (
                    <div>
                        <h1>Search for a User!</h1>
                    </div>
                )}
                
            </div>
        )
    }
}

export default CardList