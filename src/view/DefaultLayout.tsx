import React, {ChangeEvent, Component} from "react";
import {Routes} from "react-router";
import axios from "axios";

interface UserProps {
    data: any;
}

interface UserState {
    name: string;
    email: string;
    phoneNumber: string;
    city: string;
}

export class DefaultLayout extends Component<UserProps, UserState> {
    private api: any;

    constructor(props: any) {
        super(props);
        this.api = axios.create({ baseURL: `https://8fca00c373124452b6906d04a22c51b1.weavy.io` });
        this.state = {
            name:"",
            email:"",
            phoneNumber:"",
            city:"",
        };
    }

    handleMessageInputOnChange=(event: ChangeEvent<HTMLInputElement>) =>{
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        } as Pick<UserState, keyof UserState>);
    }

    private onSendBtnClick = () => {
            try {
                this.api.post('/api/users',{
                    headers:{'Authorization': 'Bearer wys_JRbfBPfUxbigQ6s4zVFl3mpw0V82nt2jcepM'},
                    name: this.state.name,
                    email:this.state.email,
                    phoneNumber:this.state.phoneNumber,
                    city:this.state.city
                }).then((res: { data: any}) => {
                    const jsonData = res.data;
                    alert(jsonData.name+" User Created !");
                }).catch((error: any)=> {
                    console.error('Axios Error', error);
                    alert(error);
                });

            } catch (error) {
                console.error("Axios Error", error);
                alert(error);
            }

    };
    render() {
        return (
            <>
                <section className="h-screen w-screen flex">
                    <div className="h-screen w-[40%] flex flex-col items-center justify-center">
                        <div>
                            <label className="ml-12">Name</label>
                            <br/>
                            <input
                                type="text"
                                className="w-80 h-10 border-2 mt-3 ml-12"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleMessageInputOnChange}
                            />
                        </div>

                        <div>
                            <label className="ml-12">Email</label>
                            <br/>
                            <input
                                type="email"
                                className="w-80 h-10 border-2 mt-3 ml-12"
                                name="email"
                                value={this.state.email}
                                onChange={this.handleMessageInputOnChange}
                            />
                        </div>

                        <div>
                            <label className="ml-12">Phone Number</label>
                            <br/>
                            <input
                                type="tel"
                                className="w-80 h-10 border-2 mt-3 ml-12"
                                name="phoneNumber"
                                value={this.state.phoneNumber}
                                onChange={this.handleMessageInputOnChange}
                            />
                        </div>

                        <div className="mt-6">
                            <label className="ml-12 ">City</label>
                            <br/>
                            <input
                                type="text"
                                className="w-80 h-10 border-2 mt-3 ml-12"
                                name="address"
                                value={this.state.city}
                                onChange={this.handleMessageInputOnChange}
                            />
                        </div>

                        <button
                            className="bg-blue-950 h-10 text-white w-80 ml-12 mt-20"
                            type="submit" onClick={this.onSendBtnClick}
                        >
                            CREATE
                        </button>
                        <button
                            className="bg-blue-950 h-10 text-white w-80 ml-12 mt-3"
                            // type="submit" onClick={this.onSendBtnClick}
                        >
                            UPDATE
                        </button>
                        <button
                            className="bg-blue-950 h-10 text-white w-80 ml-12 mt-3"
                            // type="submit" onClick={this.onSendBtnClick}
                        >
                            DELETE
                        </button>
                    </div>
                    <div className="h-screen w-[60%] bg-green-600"></div>
                </section>
            </>
        );
    }
}
