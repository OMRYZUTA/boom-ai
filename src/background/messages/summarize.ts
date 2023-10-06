import type { PlasmoMessaging } from "@plasmohq/messaging"
import { postSummary } from "~background"
import { persistAnswer } from "../../state/userInfo"

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

export default handler