import logMessage from "@/app/lib/logger";

export default async function handler(req, res) {
    if (req.method === 'GET') {
      const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN; 
  
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode && token) {
        if (mode === 'subscribe' && token === verifyToken) {
          
          res.status(200).send(challenge);
        } else {
          // Token is incorrect
          res.status(403).send('Verification token mismatch');
        }
      } else {
        res.status(400).send('Missing mode or token');
      }
    } else if (req.method === 'POST') {
      // Receiving webhook data (message events, delivery status updates, etc.)
      try {
        const webhookEvent = req.body; // Get the event data
  
        if (webhookEvent.object === 'whatsapp_business_account') {
          logMessage('Whatsapp Webhook:', webhookEvent);
        // save in firebase realtime database 
        //   webhookEvent.entry.forEach(entry => {
        //     const changes = entry.changes;
        //     changes.forEach(change => {
        //       if (change.value.messages) {
        //         // Handle new messages
        //         const messages = change.value.messages;
        //         messages.forEach(message => {
        //           console.log('Received message:', message);
                  
        //         });
        //       }
        //     });
        //   });
          res.status(200).json({ status: 'Webhook received successfully' });
        } else {
          res.status(404).json({ error: 'Event not from WhatsApp' });
        }
      } catch (error) {
        console.error('Error handling WhatsApp Webhook:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  