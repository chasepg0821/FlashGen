from flask import Blueprint, request, jsonify
# from transformers import DistilBertTokenizerFast, DistilBertForSequenceClassification
# import torch
# from zipfile import ZipFile

api = Blueprint('api', __name__)

# MAX_LENGTH = 253 #125 for each prompt and answer + 3 for special tokens

# with ZipFile("bert_para_model.zip", 'r') as zip: 
#     zip.extractall()

@api.route('/make-comparison', methods=['POST', 'GET'])
def compare ():
    # tokenizer = DistilBertTokenizerFast.from_pretrained('distilbert-base-uncased', do_lower_case=True)
    # model = DistilBertForSequenceClassification.from_pretrained("./bert_para_model")

    # inputs = tokenizer("the castle fell to the conquerer", "the conquerer took the castle",max_length=253, padding=True, truncation=True, return_tensors='pt')

    # with torch.no_grad():
    #     outputs = model(**inputs)

    # logits = outputs.logits
    # predictions = torch.argmax(logits, dim=-1)

    return {
        "response" : "hi"
    }