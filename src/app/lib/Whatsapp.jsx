import axios from 'axios';
import logMessage from './logger';
import fs from 'fs';
import FormData from 'form-data'; 

//https://developers.facebook.com/docs/whatsapp/cloud-api/messages/
class Whatsapp {
  constructor() {
    this.baseUrl = "https://graph.facebook.com";  
    this.phone_number_id = process.env.WA_PHONE_NUMBER_ID;
    this.access_token = process.env.WA_ACCESS_TOKEN;
    this.version = process.env.FB_GRAPH_VERSION;
    this.url = `${this.baseUrl}/${this.version}/${this.phone_number_id}`;
  }

  async sendMessage(phoneNumber, message, preview_url=true) {
    const url = `${this.url}/messages`;
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "text",
      text: {
        preview_url: preview_url,
        body: message
      }
    };
    return this.#send(url, messageBody);
  }
  
  // phone number parameters, still can send message, but the user will not receive it
  async sendBlockUsers(userPhoneNumber) {
    const url = `${this.url}/block_users`;
    const messageBody = {
      messaging_product: "whatsapp",
      block_users: [
        {
          user: userPhoneNumber
        }
      ]
    };
    return this.#send(url, messageBody);
  }

  async getBlockUserList() {
    const url = `${this.url}/block_users`;
    let responseObject = {
      status: false,
      message: '',
      data: null
    };
    try {
      let response  = await axios.get(url, { headers: this.#getHeaders() });
      responseObject.status = true;
      responseObject.message = 'Block Users List retrieved successfully';
      responseObject.data = response.data;
    } catch (error) {
      responseObject.message = error.response?.data?.error?.message || 'Error sending message';
      responseObject.data = error.response?.data || 'No response data';
    }
    responseObject.url =  url;
    logMessage("WA-Response", { Response: responseObject });
    return responseObject;
  }

  async sendUnblockUsers(userPhoneNumber) {
    const url = `${this.url}/block_users`;
    const messageBody = {
      messaging_product: "whatsapp",
      block_users: [
        {
          user: userPhoneNumber
        }
      ]
    };
    return this.#send(url, messageBody, true);
  }


  async sendImage(phoneNumber, mediaId, caption = '') {
    const url = `${this.url}/messages`;
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "image",
      image: {
        id: mediaId, 
        caption: caption
      }
    };
    return this.#send(url, messageBody);
  }

  async sendDocument(phoneNumber, mediaId, caption = '', filename = '') {
    const url = `${this.url}/messages`;
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "document",
      document: {
        id: mediaId, 
        caption: caption
      }
    };
    return this.#send(url, messageBody);
  }

  //https://developers.facebook.com/docs/whatsapp/cloud-api/messages/audio-messages
  async sendAudio(phoneNumber, mediaId) {
    const url = `${this.url}/messages`;
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "audio",
      audio: {
        id: mediaId, 
      }
    };
    return this.#send(url, messageBody);
  }


  //https://developers.facebook.com/docs/whatsapp/cloud-api/messages/video-messages
  async sendVideo(phoneNumber, mediaId) {
    const url = `${this.url}/messages`;
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "video",
      audio: {
        id: mediaId, 
      }
    };
    return this.#send(url, messageBody);
  }

  async sendReadMessage(phoneNumber, wa_id) {
    const url = `${this.url}/messages`;
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      status: "read",
      message_id: wa_id
    };
    return this.#send(url, messageBody);
  }

  async sendLocationRequest(phoneNumber, message='') {
    const url = `${this.url}/messages`;
    const messageBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: phoneNumber,
      type: "interactive",
      interactive: {
        type: "location_request_message",
        body: {
          text: message || "We've received a request to access your location. Please share it with us to proceed."
        },
        action: {
          name: "send_location"
        }
      }
    };
    return this.#send(url, messageBody);
  }

  async uploadMedia(mediaPath) {
    const url = `${this.baseUrl}/${this.version}/${this.phone_number_id}/media`; 

    let responseObject = {
      status: false,
      message: '',
      data: null
    };

    try {
      const formData = new FormData();
      formData.append('file', fs.createReadStream(mediaPath)); 
      formData.append('messaging_product', 'whatsapp');
      
      const response = await axios.post(url, formData, {
        headers: {
          'Authorization': `Bearer ${this.access_token}`,
          ...formData.getHeaders(),  
        },
      });

      responseObject.status = true;
      responseObject.message = 'Media uploaded successfully';
      responseObject.data = response.data;
    } catch (error) {
      responseObject.message = error.response?.data?.error?.message || 'Error uploading media';
      responseObject.data = error.response?.data || 'No response data';
    }
    logMessage("WP Media Upload Response:", responseObject);
    return responseObject;
  }


  async #send(url, messageBody, isDelete=false) {
    let responseObject = {
      status: false,
      message: '',
      data: null
    };
    try {
      let response;
      if(isDelete) {
        response = await axios.delete(url, {headers: this.#getHeaders(),data: messageBody});
      }else{
         response  = await axios.post(url, messageBody, { headers: this.#getHeaders() });
      }
      responseObject.status = true;
      responseObject.message = 'Request Sent successfully';
      responseObject.data = response.data;
    } catch (error) {
      responseObject.message = error.response?.data?.error?.message || 'Error sending message';
      responseObject.data = error.response?.data || 'No response data';
    }
    responseObject.url = url;
    logMessage("WA-Response ", { Response: responseObject, MessageBody: messageBody });
    return responseObject;
  }
  #getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.access_token}`,
    };
  }


  async getBusinessProfile() {
    const url = `${this.url}/whatsapp_business_profile?fields=about,address,description,email,profile_picture_url,websites,vertical`;  
    let responseObject = {
      status: false,
      message: '',
      data: null
    };
  
    try {
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${this.access_token}`, 
        },
      });
      responseObject.status = true;
      responseObject.message = 'Business profile retrieved successfully';
      responseObject.data = response.data;
    } catch (error) {
      responseObject.message = error.response?.data?.error?.message || 'Error retrieving business profile';
      responseObject.data = error.response?.data || 'No response data';
    }
    logMessage("WP Business Profile Response:", responseObject);
    return responseObject;
  }

  async updateBusinessProfile(profileData) {
      const url = `${this.url}/whatsapp_business_profile`;
      /*
      {OTHER, AUTO, BEAUTY, APPAREL, EDU, ENTERTAIN, EVENT_PLAN, FINANCE, GROCERY, GOVT, HOTEL, HEALTH, NONPROFIT, PROF_SERVICES, RETAIL, TRAVEL, RESTAURANT, ALCOHOL, ONLINE_GAMBLING, PHYSICAL_GAMBLING, OTC_DRUGS}
      */
      const messageBody = {
        messaging_product: "whatsapp", 
        about: profileData.about,
        address: profileData.address,
        description: profileData.description,
        vertical: profileData.vertical,
        email: profileData.email,
        websites: profileData.websites,
        profile_picture_handle: profileData.profile_picture_handle 
      };
    return this.#send(url, messageBody);
  }
  

}



export default new Whatsapp();
