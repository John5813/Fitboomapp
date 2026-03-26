const DEVSMS_API_KEY = process.env["DEVSMS_API_KEY"];
const DEVSMS_SENDER = process.env["DEVSMS_SENDER"] || "FitBoom";

const ESKIZ_EMAIL = process.env["ESKIZ_EMAIL"];
const ESKIZ_PASSWORD = process.env["ESKIZ_PASSWORD"];
const ESKIZ_FROM = process.env["ESKIZ_FROM"] || "4546";

async function getEskizToken(): Promise<string> {
  const res = await fetch("https://notify.eskiz.uz/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: ESKIZ_EMAIL, password: ESKIZ_PASSWORD }),
  });
  if (!res.ok) throw new Error("Eskiz login failed");
  const json = await res.json();
  const token = json?.data?.token || json?.token;
  if (!token) throw new Error("Eskiz token not found");
  return token;
}

async function sendViaEskiz(phone: string, message: string): Promise<void> {
  const token = await getEskizToken();
  const cleanPhone = phone.replace(/\D/g, "");
  const res = await fetch("https://notify.eskiz.uz/api/message/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      mobile_phone: cleanPhone,
      message,
      from: ESKIZ_FROM,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Eskiz SMS send failed: ${text}`);
  }
}

async function sendViaDevSms(phone: string, message: string): Promise<void> {
  const cleanPhone = phone.replace(/\D/g, "");
  const res = await fetch("https://api.devsms.uz/message/sms/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DEVSMS_API_KEY}`,
    },
    body: JSON.stringify({
      phone: cleanPhone,
      text: message,
      sender: DEVSMS_SENDER,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`DevSMS send failed: ${text}`);
  }
}

export async function sendSms(phone: string, message: string): Promise<void> {
  if (DEVSMS_API_KEY) {
    await sendViaDevSms(phone, message);
    return;
  }
  if (ESKIZ_EMAIL && ESKIZ_PASSWORD) {
    await sendViaEskiz(phone, message);
    return;
  }
  console.log(`[OTP DEV] Phone: ${phone} | Message: ${message}`);
}

export async function sendOtpSms(phone: string, code: string): Promise<void> {
  const message = `FitBoom tasdiqlash kodi: ${code}\nBu kodni hech kimga bermang.`;
  await sendSms(phone, message);
}
