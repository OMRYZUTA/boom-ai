import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook";

const storage = new Storage()

const loadDefaults = async () => {
    await storage.set("answers", [])
    await storage.set("unreadAnswers", 0)
    await storage.set("userName", "")
    await storage.set("userEmail", "")
}
const fetchUserInfo = async () => {
    const name = await storage.get("userName")
    const mail = await storage.get("userEmail")
    return [name, mail]
}

const persistAnswer = async (answer) => {
    updateAnswerState(answer)

    let answers = await storage.get("answers")
    console.log({ answers })
    await storage.set("answers", [answer, ...answers])
    const updated = await storage.get("answers")
    console.log({ updated })
    let unreadAnswers = await storage.get("unreadAnswers")
    console.log({ unreadAnswers })
    await storage.set("unreadAnswers", unreadAnswers + 1)
    const updatedUnreadAnswers = await storage.get("unreadAnswers")
    console.log({ updatedUnreadAnswers })
}
const updateAnswerState = (answer) => {

    if (answer.summary_type === "meeting") {
        storage.set("meetingGeneratingStatus", "Ready")
    }
    else if (answer.summary_type === "task") {
        storage.set("summaryGeneratingStatus", "Ready")
    }
    else if (answer.summary_type === "suggestion") {
        storage.set("suggestionGeneratingStatus", "Ready")
    }

}

export { fetchUserInfo, persistAnswer, loadDefaults }