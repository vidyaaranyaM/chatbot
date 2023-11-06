from llamaapi import LlamaAPI
from langchain_experimental.llms import ChatLlamaAPI


class ChatBot:
    def __init__(self) -> None:
        self.llama_client = LlamaAPI("LL-esmLEFXY0osrFD4JyMKrzVDekobcPXFoKAv8hmDTzokfB268zMTtJMpqjEhg9MdP")
        self.model = ChatLlamaAPI(client=self.llama_client)
        self.prompt_template = 
    


chat = ChatBot()
