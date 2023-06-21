# # ai_model.py

# import numpy as np


# def predict(input_data):
#     # Process input_data
#     # Run AI model
#     output = np.random.rand(5).tolist()
#     return output


import sys
import json
import numpy as np


def predict(input_data):
    # Process input_data
    # Run AI model
    # output = np.random.rand(5).tolist()
    # output = input_data
    output = [{'question': 'What language was the rescue?', 'questiontype': 0, 'show': True, 'isCorrect': 'German', 'answers': {'option1': 'Bad Segeberg', 'option2': 'German', 'option3': 'Germany', 'option4': '12'}}, {'question': 'How many members of the eagle owl rescue team were involved?', 'questiontype': 0, 'show': True, 'isCorrect': 'six', 'answers': {'option1': '12', 'option2': 'six', 'option3': '40m', 'option4': 'two'}}, {'question': 'How many firefighters were involved in the eagle owl rescue?', 'questiontype': 0, 'show': True, 'isCorrect': '12', 'answers': {'option1': 'Lübeck', 'option2': 'two', 'option3': 'six', 'option4': '12'}}, {'question': 'How many people were involved in the rescue?', 'questiontype': 0, 'show': True, 'isCorrect': 'two', 'answers': {'option1': '131ft', 'option2': '12', 'option3': 'six', 'option4': 'two'}}, {'question': 'What day was the eagle owl hooting from the well?', 'questiontype': 0, 'show': True, 'isCorrect': 'Saturday', 'answers': {'option1': 'Saturday', 'option2': '40m', 'option3': '131ft', 'option4': '12'}}, {'question': 'how deep is the owl?', 'questiontype': 0, 'show': True, 'isCorrect': '40m', 'answers': {'option1': '131ft', 'option2': '40m', 'option3': 'Kalkberg', 'option4': 'Saturday'}}, {'question': 'how high is the owl?', 'questiontype': 0, 'show': True, 'isCorrect': '131ft', 'answers': {'option1': 'Lübeck', 'option2': 'two', 'option3': '131ft', 'option4': 'six'}}, {'question': 'Where did the owl come from?', 'questiontype': 0, 'show': True, 'isCorrect': 'Germany', 'answers': {'option1': 'Germany', 'option2': 'two', 'option3': 'The Bad Segeberg', 'option4': 'Lübeck'}}, {'question': 'what is the name of the town?', 'questiontype': 0, 'show': True, 'isCorrect': 'Bad Segeberg', 'answers': {'option1': 'Bad Segeberg', 'option2': 'The Bad Segeberg', 'option3': '131ft', 'option4': 'Kalkberg'}}, {'question': 'what is the name of the town?', 'questiontype': 0, 'show': True, 'isCorrect': 'Lübeck', 'answers': {'option1': '131ft', 'option2': 'Germany', 'option3': '12', 'option4': 'Lübeck'}}] 
    # print({'output':output})
    return output


if __name__ == '__main__':
    input_data = json.loads(sys.stdin.read())
    output = predict(input_data)
    json.dump({'output': output}, sys.stdout)
