from agno.agent import Agent
from agno.models.google import Gemini

from dotenv import load_dotenv
load_dotenv()

prompt = """
You are a professional casting director and acting coach with years of experience evaluating auditions. Rate the actor's performance based on the following audition transcript or video description. Give a score out of 10 in each category, and explain your reasoning briefly for each:

Categories:

    Emotional Authenticity - Did the actor convey believable emotions?

    Line Delivery - Was the delivery natural, clear, and appropriately paced?

    Character Believability - Did the actor fully inhabit the character?

    Body Language & Expressions - Did gestures and facial expressions support the performance?

    Overall Impact - How memorable or compelling was the audition?

Then, provide a short overall verdict and whether you'd recommend a callback.

Input (example):
Audition monologue: “I never wanted this, okay? I never wanted to be the hero. But here we are.”
Actor appeared nervous at first but grew into the role. There was a strong emotional break halfway through, with visible trembling and voice cracks. Maintained eye contact with the imaginary partner. Slightly rushed at the end.

Give output in pure plaintext, no markdown or formatting. Directly give the output, there is no need to give some introductory text or explanation. 
"""

agent = Agent(
    model=Gemini(id="gemini-2.0-flash-exp"),
    markdown=False
)

def run_agent(video):
    response = agent.run(prompt, videos=[video])
    return response.content