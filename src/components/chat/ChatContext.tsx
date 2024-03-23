import { useMutation } from "@tanstack/react-query"
import { ReactNode, createContext, useState } from "react"

type StreamResponse = {
    addMessage: () => void,
    message: string,
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
    isLoading: boolean,
}

export const ChatContext = createContext<StreamResponse>({
    addMessage: () => {},
    message: '',
    handleInputChange: () => {},
    isLoading: false,
})

interface Props {
    fileId:string
    children: ReactNode
}

export const  ChatContextProvider = ({fileId, children}: Props) => {
    const [message, setMessage] = useState<string>('')

    const { mutate: sendMessage } = useMutation({
        mutationFn: async ({message}: {message: string}) => {
            const respons = await fetch('/api/message', {
                method: 'POST',
                body: JSON.stringify({
                    fileId,
                    message,
                }),
            })

            if(!respons.ok) {
                throw new Error("Failed to send message")
            }

            return respons.body
        }
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>)



    const addMessage = () => sendMessage({ message })
    return(
        <ChatContext.Provider value={{
            addMessage,
            message,
            handleInputChange,
            isLoading
        }}>
            {children}
        </ChatContext.Provider>
    )

}