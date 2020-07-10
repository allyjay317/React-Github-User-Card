import React from 'react'
import UserCard from './UserCard'

class CardList extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                {this.props.userData.map(user =>{
                    return <UserCard data={user} />
                })}
            </div>
        )
    }
}

export default CardList