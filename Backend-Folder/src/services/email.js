const { Resend } = require("resend");

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Kept in one place so a bounced/rejected send (bad address, Resend outage)
// never blocks the invitation itself — the Invitation row is already the
// source of truth, this is best-effort delivery on top of it.
async function sendInviteEmail({ to, inviterName, circleName, inviteLink }) {
  if (!resend) {
    console.warn("RESEND_API_KEY not set — skipping invite email to", to);
    return;
  }

  try {
    await resend.emails.send({
      from: "StudyCircle <invites@entreefox.com>",
      to,
      subject: `${inviterName} invited you to join "${circleName}" on StudyCircle`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>You're invited to a study circle</h2>
          <p><strong>${inviterName}</strong> invited you to join <strong>${circleName}</strong> on StudyCircle.</p>
          <p style="margin: 24px 0;">
            <a href="${inviteLink}" style="background:#4f46e5;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;">
              Join Circle
            </a>
          </p>
          <p style="color:#666;font-size:13px;">Or copy this link: ${inviteLink}</p>
        </div>
      `,
    });
  } catch (err) {
    console.error(`Failed to send invite email to ${to}:`, err.message);
  }
}

module.exports = { sendInviteEmail };
