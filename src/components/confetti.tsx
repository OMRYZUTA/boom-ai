import type {
    PlasmoCSConfig,
    PlasmoCSUIJSXContainer,
    PlasmoCSUIProps,
    PlasmoRender
  } from "plasmo"
  import type { FC } from "react"
  import { createRoot } from "react-dom/client"
  import ConfettiExplosion from 'react-confetti-explosion';

  export const config: PlasmoCSConfig = {
    matches: ["https://web.whatsapp.com/*"],
  }
  
  export const getRootContainer = () =>
    new Promise((resolve) => {
        // const [storedUserName, setStoredUserName] = useStorage<string>("userName", "");

      const checkInterval = setInterval(() => {
        const rootContainerParent = document.querySelector(`body`)
        if (rootContainerParent) {
          clearInterval(checkInterval)
          const rootContainer = document.createElement("div")
          rootContainerParent.appendChild(rootContainer)
          resolve(rootContainer)
        }
      }, 137)
    })
  
  const PlasmoOverlay: FC<PlasmoCSUIProps> = () => {
    return (
    <ConfettiExplosion />
    )
  }
  
  export const render: PlasmoRender<PlasmoCSUIJSXContainer> = async ({
    createRootContainer
  }) => {
    const rootContainer = await createRootContainer()
    const root = createRoot(rootContainer)
    root.render(<PlasmoOverlay />)
  }
  
  export default PlasmoOverlay