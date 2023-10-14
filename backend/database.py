from model import ChatResponse
from motor.motor_asyncio import AsyncIOMotorClient

url = "mongodb://localhost:27017"
client = AsyncIOMotorClient(url)
database = client.ChatBot
collection = database.responses

async def fetch_all_responses():
    responses = []
    cursor = collection.find({})
    async for document in cursor:
        responses.append(ChatResponse(**document))
    return responses

async def add_response(document):
    result = await collection.insert_one(document)
    return document
