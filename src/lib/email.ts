interface TicketEmailData {
  ticketNumber: string;
  type: string;
  title: string;
  description: string;
  reportedBy: string;
  email: string;
  phone: string;
  fileName?: string | null;
}

/**
 * Send ticket notification to admin using Web3Forms
 */
export async function sendTicketNotificationToAdmin(data: TicketEmailData) {
  const adminEmail = process.env.ADMIN_EMAIL || 'yashbora.ai@gmail.com';
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!web3formsKey) {
    console.warn('⚠️  WEB3FORMS_ACCESS_KEY not configured - emails will not be sent');
    console.log('📧 To enable emails: Get free key at https://web3forms.com');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const emailContent = `
🎫 NEW SUPPORT TICKET
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

TICKET NUMBER: ${data.ticketNumber}
TYPE: ${data.type}
TITLE: ${data.title}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REPORTED BY: ${data.reportedBy}
EMAIL: ${data.email}
PHONE: ${data.phone}
${data.fileName ? `ATTACHMENT: ${data.fileName}` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DESCRIPTION:
${data.description}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ RESPONSE TIME: Please respond within 48 hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CPI Training Platform - Automated Notification
    `.trim();

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `🎫 New Support Ticket: ${data.ticketNumber}`,
        from_name: 'CPI Training Support',
        to: adminEmail,
        message: emailContent,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Admin notification email sent successfully via Web3Forms');
      return { success: true, data: result };
    } else {
      console.error('❌ Web3Forms error:', result.message);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error('❌ Error sending admin notification email:', error);
    return { success: false, error };
  }
}

/**
 * Send confirmation email to user using Web3Forms
 */
export async function sendTicketConfirmationToUser(
  email: string,
  ticketNumber: string,
  name: string
) {
  const web3formsKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!web3formsKey) {
    console.warn('⚠️  WEB3FORMS_ACCESS_KEY not configured - user confirmation email will not be sent');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const emailContent = `
Hey ${name},

We got your ticket! We are working on it and will answer within 48 hours.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOUR TICKET NUMBER: ${ticketNumber}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 Important: Please reference this ticket number in any future correspondence about this issue.

Our support team will review your request and get back to you as soon as possible. You'll receive a response at this email address.

Need immediate assistance?
📞 1-800-555-0123

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CPI Training Platform Support
    `.trim();

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: web3formsKey,
        subject: `✅ Support Ticket Created: ${ticketNumber}`,
        from_name: 'CPI Training Support',
        to: email,
        message: emailContent,
      }),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ User confirmation email sent successfully via Web3Forms');
      return { success: true, data: result };
    } else {
      console.error('❌ Web3Forms error:', result.message);
      return { success: false, error: result.message };
    }
  } catch (error) {
    console.error('❌ Error sending user confirmation email:', error);
    return { success: false, error };
  }
}
