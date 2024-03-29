import React from 'react'
import {showNotificationFailed} from '../components/AKFramework'
import {getCookie} from "cookies-next";

class AppClientClass extends React.Component {
  constructor() {
    super({})
    this.BASE_API_URL = process.env.NEXT_PUBLIC_API_URL
  }
  async _postRequest({ url, formData }) {
    return await this._fetchData(url, 'POST', formData)
  }

  async _getRequest({ url }) {
    return await this._fetchData(url, 'GET')
  }

  async _pathRequest({ url, formData }) {
    return await this._fetchData(url, 'PATH', formData)
  }

  async _putRequest({ url, formData }) {
    return await this._fetchData(url, 'PUT', formData)
  }

  async _deleteRequest({ url }) {
    return await this._fetchData(url, 'DELETE')
  }
  
  async _fetchData(url, method, formData = null) {
    const authToken = getCookie('hidden-me-auth-token')
    const CSRFToken= getCookie('csrftoken')
    let headers = {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Accept': '*/*',
        // 'X-CSRFToken': CSRFToken || 'none',
    }
    if (typeof authToken !== "undefined") {
      headers.Authorization = `Bearer ${authToken}`
    }
    const options = {
      method: method,
      body: formData ? JSON.stringify(formData) : null,
      headers: headers,
      credentials: 'include'
    }
    try {
      return await fetch(`${this.BASE_API_URL}/api/v1/${url}`, options);
    } catch (error) {
      showNotificationFailed({ message: error.toString() })
      throw error
    }
  }
  
  async accountRegister({ formData }) {
    const response = await this._postRequest({ url: 'account/register/', formData: formData })
    return response.json()
  }
  
  async accountLogIn({ formData }) {
    const response = await this._postRequest({ url: 'account/login/', formData: formData })
    return response.json()
  }
  
  async updateAccountUserData({ formData }) {
    const response = await this._postRequest({ url: 'account/user/', formData: formData })
    return response.json()
  }
  
  async deleteAccount({userUid}) {
    await this._deleteRequest({ url: `account/${userUid}/`})
  }
  
  async getAccountGetMyInfo() {
    const response = await this._getRequest({url: 'account/user/'})
    return response.json()
  }
  
  async getAccountDashboard() {
    const response = await this._getRequest({url: 'account/dashboard/'})
    return response.json()
  }
  
  async createQRCode({ formData }) {
    const response = await this._postRequest({url: 'qr/new/', formData: formData})
    return response.json()
  }
  
  async getQRCodeList() {
    const response = await this._getRequest({url: 'qr/'})
    return response.json()
  }
  
  async deleteQRCodeInstance({codeUid}) {
    return await this._deleteRequest({url: `qr/${codeUid}/`})
  }
  
  async getQRCodeInstance({codeUid}) {
    const response = await this._getRequest({url: `qr/${codeUid}/`})
    return response.json()
  }
  
  async createChat({ codeUid, formData }) {
    const response = await this._postRequest({url: `qr/${codeUid}/chats/new-chat/`, formData: formData})
    return response.json()
  }
  
  async getQRCodeChatList({ codeUid }) {
    const response = await this._getRequest({url: `qr/${codeUid}/chats/`})
    return response.json()
  }
  
  async getChatList() {
    const response = await this._getRequest({url: 'chat/'})
    return response.json()
  }
  
  async getChatInstance({chatUid}) {
    const response = await this._getRequest({url: `chat/${chatUid}/`})
    return response.json()
  }
  
  async deleteChatInstance({chatUid}) {
    return await this._deleteRequest({url: `chat/${chatUid}/`})
  }
  
  async getChatMessages({chatUid}) {
    const response = await this._getRequest({url: `chat/${chatUid}/messages/`})
    return response.json()
  }
  
  async postNewMessageInChat({chatUid, formData}) {
    const response = await this._postRequest({url: `chat/${chatUid}/messages/`, formData: formData})
    return response.json()
  }
}

export const AppRequestClient = new AppClientClass({})
