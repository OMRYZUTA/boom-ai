import { Storage } from "@plasmohq/storage"

const storage = new Storage()

const loadDefaults = async () => {
    await storage.set("answers", [])
    await storage.set("unreadAnswers", 0)

}
const fetchUserInfo = async () => {
    const name = await storage.get("userName")
    const mail = await storage.get("userEmail")
    return [name, mail]
}

const persistAnswer = async (answer) => {
    let answers = await storage.get("answers")
    console.log({ answers })
    await storage.set("answers", [...answers, answer])
    const updated = await storage.get("answers")
    console.log({ updated })
    let unreadAnswers = await storage.get("unreadAnswers")
    console.log({ unreadAnswers })
    await storage.set("unreadAnswers",unreadAnswers +1)
    const updatedUnreadAnswers = await storage.get("unreadAnswers")
    console.log({ updatedUnreadAnswers })
}

export { fetchUserInfo, persistAnswer, loadDefaults }