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
    console.log("env var :" + process.env.PLASMO_PUBLIC_SHOULD_POST_TO_BACKEND)
    let response;
    if (process.env.PLASMO_PUBLIC_SHOULD_POST_TO_BACKEND == "true") {
        response = await fetch(`${process.env.PLASMO_PUBLIC_BOOM_BACKEND_HOST}/summarize`, {
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
    } else {
        response = genersteMockResponse(req.body.summaryType)
    }

    return response
}

const genersteMockResponse = (summaryType) => {
    let response;
    switch (summaryType) {
        case "meeting":
            response = {
                json: async () => {
                    return new Promise(reso => {
                        return {
                            "content": { "title": "Meeting Planning", "hour": "1410", "date": "20220914", "summary": "Planning a meeting with Omry." },
                            "summary_type": "meeting",
                            "id": "12213dsf",
                            "timestamp": "2023-10-22T18:40:45.464974Z"
                        }
                    })
                }

            }
            break;
        case "suggestion":
            response = {
                json: () => {
                    return new Promise(reso => {
                        return {
                            content
                                :
                                "תודה על העדכון.",
                            id
                                :
                                "d208d053-d155-4e0f-b580-f30eb072f3b7",
                            summary_type
                                :
                                "suggestion",
                            timestamp
                                :
                                "2023-10-22T18:40:45.464974Z"
                        }
                    })
                }
            }
            break;
        case "task":
            response = {
                json: () => {
                    return new Promise(reso => {
                        return {
                            "content": { "title": "Script for sending messages", "people": "Omry Zuta, Eran, Boaz", "hour": "21:40", "date": "22/10/2023", "summary": "Omry wrote a script for sending messages every minute to a group and wants to confirm if it's okay to activate it. Eran connected Omry with Boaz to discuss further.", "action_item": "awaiting confirmation from Boaz" },
                            "summary_type": "task",
                            "id": "12213dsf",
                            "timestamp": "2023-10-22T18:40:45.464974Z"
                        }
                    })
                }
            }
            break;
    }
    return response;
}