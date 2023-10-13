import React from 'react'
import {showNotificationFailed} from '../components/AKFramework'

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
  async _fetchData(url, method, formData = null) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: formData ? JSON.stringify(formData) : null,
    }

    try {
      const response = await fetch(`${this.BASE_API_URL}${url}`, options)
      if (response.status === 401 || response.status === 403) {
        window.location.href = '/login'
      }
      return response
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
  
  async accountGetMyInfo() {
    return await this._getRequest({url: 'account/user/'})
  }
}

export const AppRequestClient = new AppClientClass({})
