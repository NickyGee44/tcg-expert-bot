from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import GPT2LMHeadModel, GPT2Tokenizer
import torch

app = FastAPI()

# Load the model and tokenizer
model_name = "NickyGee44/tcg-expert-model"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPT2LMHeadModel.from_pretrained(model_name)

class Question(BaseModel):
    text: str

@app.post("/generate")
async def generate_answer(question: Question):
    try:
        # Format the prompt
        prompt = f"Question: {question.text}\nAnswer:"
        
        # Generate response
        inputs = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=512)
        outputs = model.generate(
            inputs["input_ids"],
            max_length=200,
            temperature=0.7,
            top_p=0.9,
            do_sample=True,
            pad_token_id=tokenizer.eos_token_id
        )
        
        # Decode and clean up the response
        response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        response = response.replace(prompt, "").strip()
        
        return {"answer": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "TCG Expert Bot API is running"} 