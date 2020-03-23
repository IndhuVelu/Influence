import React, {Component} from 'react'
import '../Book/Book.css'
import moment from 'moment'

class Mybookings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            book: [],
            book1: [],
            authdata: [],
            mybook: true,
            complete: true,
            bookss: "upcoming",
            books: "completed"
        }
    }
    componentDidMount = async() => {

        if (localStorage.getItem('token')) {
            await fetch('http://localhost:3050/trainUser', {
                method: 'post',
                body: JSON.stringify({
                    token: JSON
                        .parse(localStorage.getItem('token'))
                        .token
                }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => this.setState({authdata: data}))
                .catch(() => {
                    console.log('error')

                })
        }
        await fetch('http://localhost:3050/completedBooking', {
            method: "POST",
            body: JSON.stringify({signup_id: this.state.authdata.user.name}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({book: data});
                this.setState({
                    mybook: !this.state.mybook
                })
            })
        await fetch('http://localhost:3050/upcomingBooking', {
            method: "POST",
            body: JSON.stringify({signup_id: this.state.authdata.user.name}),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({book1: data});
              
            })
        this.check();
    }
    changeBook = () => {
        this.setState({
            complete: !this.state.complete
        }, () => this.check())

    }
    check = () => {
        if (this.state.complete) {
            document.getElementsByClassName("com")[0].style.opacity = 1;
            document.getElementsByClassName("up")[0].style.opacity = 0.3;

            document.getElementsByClassName("com")[0].disabled = false;
            document.getElementsByClassName("up")[0].disabled = true;

        } else {
            document.getElementsByClassName("com")[0].style.opacity = 0.3;
            document.getElementsByClassName("up")[0].style.opacity = 1;
            document.getElementsByClassName("com")[0].disabled = true;
            document.getElementsByClassName("up")[0].disabled = false;

        }
    }
    render() {

        return (
            <div>
                <div >
                    <a className="back" href="/train">Back</a>
                </div>
                <div>
                    <div className="booking">Your Booking Details</div>
                    <button className="com" id="com" onClick={this.changeBook}>{this.state.bookss}</button>
                    <button className="up" onClick={this.changeBook}>{this.state.books}</button>
                    {this.state.complete ? <div>
                                <div className="complete">
                                    completed Bookings</div>

                                {this.state.mybook !== true
                                    ? (this.state.book.map(element => (
                                        <div className="heading2">
                                          
                                          <div>  Name      : {element.signupName}  </div>
                                           <div> Train_id    : {element.trainId} </div>
                                           <div> Date        : {moment(element.createdAt).format("MMM DD YYYY")} </div>
                                           <div> Seat Number : {element.seat} </div>
                                          
                                        </div>

                                    )))

                                    : <p>Your Booking is Empty
                                    </p>}
                            </div>
                        : <div>
                            <div className="upcoming">upcoming Booking</div>
                            {this.state.mybook !== true
                                ? (this.state.book1.map(element => (
                                    <div className="heading2">
                                          
                                    <div>  Name      : {element.signupName}  </div>
                                     <div> Train_id    : {element.trainId} </div>
                                     <div> Date        : {moment(element.createdAt).format("MMM DD YYYY")} </div>
                                     <div> Seat Number : {element.seat} </div>
                                    
                                  </div>


                                )))

                                : <p>Your Booking is Empty
                                </p>}
                        </div>}

                </div>
            </div>
        )
    }
}

export default Mybookings
