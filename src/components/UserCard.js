import React from 'react'

class UserCard extends React.Component{

    render(){
        return (
            <div>
                <h1>{this.props.data.userName}</h1>
                <p>{this.props.data.name}</p>
                <img src={this.props.data.avatar} />
                <a href={this.props.data.url}>Visit Github Page</a>
                {this.props.data.followers !== undefined ? 
                    (
                        <div>
                            {this.props.data.followers.map(follower =>{
                                return <UserCard data={follower} />
                            })}
                        </div>
                    ) : <div></div>}
            </div>
        )
    }
}

export default UserCard