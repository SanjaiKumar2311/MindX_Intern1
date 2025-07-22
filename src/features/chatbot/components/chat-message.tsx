import { Message } from "../types/chat";

interface ChatMessageProps {
  message: Message;
  primaryColor: string;
}
const ChatMessage = ({ message, primaryColor }: ChatMessageProps) => {
  const isUser = message.role === "user";
  return (
    <div>
      <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
        {!isUser && (
          <div className="flex gap-1 my-2 text-gray-900 text-sm  rounded-lg p-2 bg-gray-100 ">
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <div className="  p-1">
                <svg
                  stroke="none"
                  fill="black"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  height="20"
                  width="20"
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  ></path>
                </svg>
              </div>
            </span>
            <p className="leading-relaxed ">{message.message}</p>
          </div>
        )}

        {isUser && (
          <div className="flex gap-3 my-2 text-white text-sm bg-green-600 rounded-lg p-2 max-w-[90%]"
          style={{backgroundColor:primaryColor || '#16a34a'}}>
            <p className="leading-relaxed">{message.message}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
