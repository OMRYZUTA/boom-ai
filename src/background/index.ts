import { loadDefaults } from "../services/storage"
import { Storage } from "@plasmohq/storage";
const storage = new Storage()

chrome.runtime.onInstalled.addListener(async (details) => {
    console.log("Extension installed:", details);
    await loadDefaults()
    const answers = await storage.get("answers")
    console.log({answers})
  });
  