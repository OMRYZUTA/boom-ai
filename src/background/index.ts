import { loadDefaults, persistAnswer } from "../state/userInfo"
import { Storage } from "@plasmohq/storage";
import handler from "./messages/summarize"
import { fetchUserInfo } from "../state/userInfo";

const storage = new Storage()

chrome.runtime.onInstalled.addListener(async (details) => {
    console.log("Extension installed:", details);
    // await loadDefaults() //######################################################### uncomment later
    const answers = await storage.get("answers")
    console.log({ answers })
    initContextMenu()
});


const initContextMenu = () => {
    createMenuItems()
    addOnclickFunctionality()
}

const createMenuItems = () => {
    chrome.contextMenus.create({
        id: "generateMeetingContext",
        title: "Generate a Meeting",
        contexts: ["selection"]
    }, () => {
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError);
        }
    });

    chrome.contextMenus.create({
        id: "generateSummaryContext",
        title: "Generate a Summary",
        contexts: ["selection"]
    }, () => {
        if (chrome.runtime.lastError) {
            console.warn(chrome.runtime.lastError);
        }
    });
}

const addOnclickFunctionality = () => {
    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        if (info.menuItemId === "generateMeetingContext") {
            const response = await postSummary({
                name: "summarize",
                body: {
                    summaryType: "meeting",
                    text: info.selectionText
                }
            })
            const answer = await response.json();

            persistAnswer(answer)
        }
    });

    chrome.contextMenus.onClicked.addListener(async (info, tab) => {
        console.log("in summary context clicked")
        if (info.menuItemId === "generateSummaryContext") {
            const response = await postSummary({
                name: "summarize",
                body: {
                    summaryType: "task",
                    text: info.selectionText
                }
            })
            const answer = await response.json();

            persistAnswer(answer)
        }
    });
};

export const postSummary = async (req) => {
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
    })
    return response
}
