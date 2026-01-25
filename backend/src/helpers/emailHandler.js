import { resendClient } from "../utils/resend.js";
import { onboardingEmailTemplate } from "./emailTemplate.js";
export const sendOnboardingEmail = async function (
  senderName,
  userEmail,
  recieverName,
  subject,
) {
  const body = onboardingEmailTemplate();
  try {
    await resendClient.emails.send({
      from: `${senderName} <onboarding@resend.dev>`,
      to: userEmail,
      subject: subject,
      html: body,
    });
  } catch (error) {
    console.log("Error while sending onboarding email. ", error);
    return {
      message: "Failed to send onboarding email.",
      error: error,
    };
  }
};
