import type { PlasmoMessaging } from "@plasmohq/messaging"
import { Storage } from "@plasmohq/storage"
import { persistAnswer, fetchUserInfo } from "~services/storage"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  try {
    const response = await postSummary(req)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const message = await response.json();
    await persistAnswer(message)
    console.log({ message });
    res.send(
      message
    )
  } catch (e) {
    console.error('Fetch failed', e);
  }
}

const postSummary = async (req) => {
  const [name, mail] = await fetchUserInfo()
  console.log({ name, mail })
  const response = await fetch('http://localhost:4004/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({

      name,
      messages: req.body.text,
      mail,
      summaryType: req.body.summaryType
    }),
  });
  return response
}

export default handler