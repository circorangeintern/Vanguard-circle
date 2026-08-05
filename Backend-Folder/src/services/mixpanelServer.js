// Server-side Mixpanel tracking for events that need to fire reliably
// regardless of whether any browser is open — same project token the
// frontend uses (src/lib/mixpanel.ts), overridable via env var.
const MIXPANEL_TOKEN = process.env.MIXPANEL_TOKEN || "d2585b0f1dc5d1e878f998ccdc98e741";

// Fire-and-forget by design — a Mixpanel outage or network blip should
// never block or fail the reminder scan that calls this.
async function trackServerEvent(eventName, distinctId, properties = {}) {
  try {
    const res = await fetch("https://api.mixpanel.com/track?ip=0", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "text/plain" },
      body: JSON.stringify([
        {
          event: eventName,
          properties: {
            token: MIXPANEL_TOKEN,
            distinct_id: distinctId,
            time: Math.floor(Date.now() / 1000),
            ...properties,
          },
        },
      ]),
    });
    if (!res.ok) {
      console.error(`Mixpanel track "${eventName}" failed: ${res.status} ${await res.text()}`);
    }
  } catch (err) {
    console.error(`Mixpanel track "${eventName}" errored:`, err);
  }
}

module.exports = { trackServerEvent };
