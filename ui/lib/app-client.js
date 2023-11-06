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
    // if (authToken === '' || authToken === null || typeof authToken === 'undefined') {
    //   window.location.reload()
    // }
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
        'X-CSRFToken': getCookie('csrftoken')
      },
      body: formData ? JSON.stringify(formData) : null,
      credentials: 'include'
    }

    try {
      return await fetch(`${this.BASE_API_URL}/api/v1/${url}`, options);
    } catch (error) {
      showNotificationFailed({ message: error })
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
  
  async getAccountGetMyInfo() {
    const response = await this._getRequest({url: 'account/user/'})
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
}

export const AppRequestClient = new AppClientClass({})
