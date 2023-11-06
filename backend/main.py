from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import add_response, fetch_all_responses
from model import ChatResponse

import sys
sys.path.append("../llama_model")
from chat import ChatBot

app = FastAPI()
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def index():
    return {"hello": "world"}

# Get all responses
@app.get("/chat/responses")
async def get_all_responses():
    response = await fetch_all_responses()
    return response

# Insert human response
@app.post("/chat/human/responses", response_model=ChatResponse)
async def insert_human_response(human_response:ChatResponse):
    response = await add_response(human_response.dict())
    return response

# Insert bot response
@app.post("/chat/bot/responses", response_model=ChatResponse)
async def insert_bot_response(human_response:ChatResponse):
    bot = ChatBot()
    text = human_response.response
    bot_message = bot.get_response(text)
    bot_response = {
        "id": human_response.id + 1,
        "agent": "bot",
        "response": bot_message
    }
    response = await add_response(bot_response)
    return response
