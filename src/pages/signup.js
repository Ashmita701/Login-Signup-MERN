import axios from 'axios';
import React, { useState } from 'react';
import './signup.css';

function Signup() {
    const initialState = {
        fullName: null,
        userName: null,
        address: null,
        phoneNumber: null,
        password: null,
    };
    const [signupData, setSignupData] = useState(initialState);
    const [msg, setMsg] = useState('');
    const [alertColor, setAlertColor] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const onChangeText = (event) => {
        setMsg('');
        setErrMsg('');
        setSignupData({
            ...signupData,
            [event.target.name]: event.target.value,
        });
    };
    const handleSignUp = async (event) => {
        event.preventDefault();
        console.log('inside signup', signupData);
        if (
            !signupData.fullName ||
            !signupData.userName ||
            !signupData.address ||
            !signupData.phoneNumber ||
            !signupData.password
        ) {
            setMsg('Required all field!!!');
            setAlertColor('danger');
            return;
        }
        let data = {
            name: signupData.fullName,
            userName: signupData.userName,
            address: signupData.address,
            phone_number: signupData.phoneNumber,
            password: signupData.password,
        };

        const getData = await axios.post(
            'http://localhost:3001/signup/create',
            data
        );
        if (getData.data.msg) {
            console.log(getData.data.msg);
            setMsg(getData.data.msg);
            setAlertColor('success');
        }

        if (getData.data.err) {
            console.log(getData.data.err);
            setErrMsg(getData.data.err);
            setAlertColor('danger');
        }
    };
    return (
        <div className='container mt-5' style={{ width: '50%' }}>
            <div className='d-flex justify-content-center align-items-center'>
                <div
                    className='card card-body'
                    style={{ border: '0.8px solid', borderRadius: 10 }}
                >
                    <div
                        className='font-weight-bold large my-3'
                        style={{ fontSize: 20 }}
                    >
                        Create an Account
                    </div>

                    <form onSubmit={(e) => handleSignUp(e)}>
                        {msg && (
                            <div
                                className={`alert alert-${alertColor} alert-dismissible text-left`}
                            >
                                <div>{msg}</div>
                                <button
                                    type='button'
                                    className='close'
                                    onClick={() => {
                                        setMsg('');
                                    }}
                                >
                                    <span area-hidden='true'>&times;</span>
                                </button>
                            </div>
                        )}
                        <SignUpView
                            label='Full Name:'
                            type='text'
                            name='fullName'
                            value={signupData.fullName}
                            onChange={onChangeText}
                            placeholder='Enter Full Name'
                        />
                        <SignUpView
                            label='User Name:'
                            type='text'
                            name='userName'
                            value={signupData.userName}
                            onChange={onChangeText}
                            placeholder='Enter User Name'
                            errMsg={errMsg}
                        />

                        <SignUpView
                            label='Address:'
                            type='text'
                            name='address'
                            value={signupData.address}
                            onChange={onChangeText}
                            placeholder='Enter Address'
                        />
                        <SignUpView
                            label='Phone Number:'
                            type='text'
                            name='phoneNumber'
                            value={signupData.phoneNumber}
                            onChange={onChangeText}
                            placeholder='Enter Phone Number'
                        />
                        <SignUpView
                            label='Password:'
                            type='password'
                            name='password'
                            value={signupData.password}
                            onChange={onChangeText}
                            placeholder='Enter password'
                        />
                        <div>
                            <button
                                className='btn  mt-3'
                                style={{
                                    backgroundColor: '#3f50b5',
                                    color: 'white',
                                    borderRadius: 8,
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;

export function SignUpView({
    type,
    name,
    value,
    onChange,
    placeholder,
    label,
    errMsg = '',
}) {
    return (
        <div className='row m-2 my-3'>
            <div className='col-lg-4  d-flex justify-content-start align-items-center'>
                <div className='font-weight-bold'>{label}</div>
            </div>
            <div className='col-lg'>
                <input
                    type={type}
                    name={name}
                    className='form-control text-black'
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    style={{
                        borderRadius: 5,
                        border: '0.5px solid',
                    }}
                />
                {errMsg && (
                    <div className='text-danger text-left'>{errMsg}</div>
                )}
            </div>
        </div>
    );
}
