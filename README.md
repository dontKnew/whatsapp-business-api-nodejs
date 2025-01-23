Here's a `README.md` file for the `Whatsapp` API documentation:

# Whatsapp Cloud API Integration

This project provides a Node.js/Next.js class for integrating with the WhatsApp Cloud API. It allows you to send messages, upload media, manage blocked users, and retrieve the business profile.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [API Methods](#api-methods)
  - [sendMessage](#sendmessage)
  - [sendBlockUsers](#sendblockusers)
  - [getBlockUserList](#getblockuserlist)
  - [sendUnblockUsers](#sendunblockusers)
  - [sendImage](#sendimage)
  - [sendDocument](#senddocument)
  - [sendAudio](#sendaudio)
  - [sendVideo](#sendvideo)
  - [sendReadMessage](#sendreadmessage)
  - [sendLocationRequest](#sendlocationrequest)
  - [uploadMedia](#uploadmedia)
  - [getBusinessProfile](#getbusinessprofile)
  - [updateBusinessProfile](#updatebusinessprofile)

## Installation

To use this API, you need Node.js installed. You also need the `axios`, `fs`, and `form-data` libraries.

### Install dependencies:

```bash
npm install
```

## Configuration

To configure the API, you'll need to set up the following environment variables:

- `WA_PHONE_NUMBER_ID`: Your WhatsApp Business phone number ID.
- `WA_ACCESS_TOKEN`: Your WhatsApp Cloud API access token.
- `FB_GRAPH_VERSION`: The version of the Facebook Graph API (e.g., `v15.0`).

You can create a `.env` file in your project root and add these variables:

```
WA_PHONE_NUMBER_ID=your_phone_number_id
WA_ACCESS_TOKEN=your_access_token
FB_GRAPH_VERSION=v15.0
```

## API Methods

### sendMessage(phoneNumber, message, preview_url=true)

Send a text message to a specified phone number.

- **Endpoint**: `/messages`
- **Method**: `POST`
- **Parameters**:
  - `phoneNumber` (string): The recipient's phone number.
  - `message` (string): The message text.
  - `preview_url` (boolean): Whether to display a preview of any links in the message (default is `true`).

### sendBlockUsers(userPhoneNumber)

Block a user from sending messages to your WhatsApp Business number.

- **Endpoint**: `/block_users`
- **Method**: `POST`
- **Parameters**:
  - `userPhoneNumber` (string): The phone number of the user to block.

### getBlockUserList()

Retrieve a list of blocked users.

- **Endpoint**: `/block_users`
- **Method**: `GET`

### sendUnblockUsers(userPhoneNumber)

Unblock a user to allow them to send messages to your WhatsApp Business number again.

- **Endpoint**: `/block_users`
- **Method**: `POST`
- **Parameters**:
  - `userPhoneNumber` (string): The phone number of the user to unblock.

### sendImage(phoneNumber, mediaId, caption='')

Send an image to a specified phone number.

- **Endpoint**: `/messages`
- **Method**: `POST`
- **Parameters**:
  - `phoneNumber` (string): The recipient's phone number.
  - `mediaId` (string): The media ID for the image.
  - `caption` (string, optional): An optional caption for the image.

### sendDocument(phoneNumber, mediaId, caption='', filename='')

Send a document to a specified phone number.

- **Endpoint**: `/messages`
- **Method**: `POST`
- **Parameters**:
  - `phoneNumber` (string): The recipient's phone number.
  - `mediaId` (string): The media ID for the document.
  - `caption` (string, optional): An optional caption for the document.
  - `filename` (string, optional): The filename for the document.

### sendAudio(phoneNumber, mediaId)

Send an audio message to a specified phone number.

- **Endpoint**: `/messages`
- **Method**: `POST`
- **Parameters**:
  - `phoneNumber` (string): The recipient's phone number.
  - `mediaId` (string): The media ID for the audio message.

### sendVideo(phoneNumber, mediaId)

Send a video message to a specified phone number.

- **Endpoint**: `/messages`
- **Method**: `POST`
- **Parameters**:
  - `phoneNumber` (string): The recipient's phone number.
  - `mediaId` (string): The media ID for the video message.

### sendReadMessage(phoneNumber, wa_id)

Send a "read" status update for a message.

- **Endpoint**: `/messages`
- **Method**: `POST`
- **Parameters**:
  - `phoneNumber` (string): The recipient's phone number.
  - `wa_id` (string): The WhatsApp message ID.

### sendLocationRequest(phoneNumber, message='')

Send a location request to a specified phone number.

- **Endpoint**: `/messages`
- **Method**: `POST`
- **Parameters**:
  - `phoneNumber` (string): The recipient's phone number.
  - `message` (string, optional): A custom message for the request.

### uploadMedia(mediaPath)

Upload a media file to the WhatsApp Cloud API.

- **Endpoint**: `/media`
- **Method**: `POST`
- **Parameters**:
  - `mediaPath` (string): The local path to the media file to upload.

### getBusinessProfile()

Retrieve the business profile information of your WhatsApp Business account.

- **Endpoint**: `/whatsapp_business_profile`
- **Method**: `GET`

### updateBusinessProfile(profileData)

Update the business profile information.

- **Endpoint**: `/whatsapp_business_profile`
- **Method**: `POST`
- **Parameters**:
  - `profileData` (object): The data to update, including fields such as `about`, `address`, `description`, `email`, etc.

## Example Usage

```javascript
import Whatsapp from './whatsapp';

// Send a text message
Whatsapp.sendMessage('+1234567890', 'Hello, this is a test message');

// Upload an image
Whatsapp.uploadMedia('./path/to/image.jpg')
  .then(response => console.log(response));

// Send a document
Whatsapp.sendDocument('+1234567890', 'media_id', 'Here is the document!');
```

## Logs

This class uses a logger utility (`logMessage`) to log API responses and messages. Make sure to configure your logger accordingly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This `README.md` file provides:

- An **overview** of the WhatsApp Cloud API class.
- Installation instructions.
- Configuration setup for environment variables.
- Detailed **API Methods** documentation.
- Example usage code to send messages and upload media.
- License information.

Let me know if you'd like to modify anything!