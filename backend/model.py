from pydantic import BaseModel

class ChatResponse(BaseModel):
    id: int
    agent: str
    response: str
