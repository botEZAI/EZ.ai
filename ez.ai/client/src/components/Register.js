import React from "react";
import "./Register.css";
import { post } from 'axios';

class Register extends React.Component
{
  constructor(props) /* 가장 먼저 실행되는 부분 */
  {
    super(props);
    this.state = {
      email: '',
      password: '',
      userName: '',
      nickName: '',
      birthday: ''
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
    this.addCustomer = this.addCustomer.bind(this)
  }

  handleFormSubmit(e)  /* 회원가입 등록 버튼 눌렀을때 실행 */
  {
    console.log(this.state)
    e.preventDefault()
    this.addCustomer()
        .then((response) => { /* addCustomer 실행후 console.log 로 출력. 여기에 서버 작업하면 됨. */
          console.log(response.data)
        })
  }


  handleValueChange(e) /* 입력폼에 내용 작성했을때 실행 */
  {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }


  addCustomer()   /* 고객 등록 양식 */
  {
    const url = '/api/register';  /* 작성 필요 */

    const formData = new FormData();
    formData.append('email', this.state.email)
    formData.append('password', this.state.password)
    formData.append('userName', this.state.userName)
    formData.append('nickName', this.state.nickName)
    formData.append('birthday', this.state.birthday)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(url, formData, config)
  }


  render() {
    return (
        <div className = "register">
          <form className="register-form" onSubmit={this.handleFormSubmit}>
            <div className="register-form__column">
              <p className="register-title"><span>Ez.ai</span> 회원가입</p>
              <input type="email" name="email" value={this.state.email} placeholder="이메일" onChange={this.handleValueChange}/><br />
              <input type="password" name="password" value={this.state.password} placeholder="비밀번호" onChange={this.handleValueChange}/><br />
              <input placeholder="비밀번호 확인(아직 작동 X)" />
            </div>

            <div className="register-form__column">
              <p>개인정보</p>
              <input type="text" name="userName" value={this.state.userName} placeholder="이름" onChange={this.handleValueChange}/><br />
              <input type="text" name="nickName" value={this.state.nickName} placeholder="닉네임" onChange={this.handleValueChange}/><br />
              <input type="text" name="birthday" value={this.state.birthday} placeholder="생년월일" onChange={this.handleValueChange}/><br />
              <br />
              <button className = "register-btn" type="submit">회원가입하기</button>
            </div>
          </form>
        </div>
    )
  }
}

export default Register;
