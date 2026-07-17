import spacy

nlp = spacy.load("en_core_web_sm")

def detect_additional_skills(text):

    doc = nlp(text)

    detected = []

    for ent in doc.ents:
        detected.append(ent.text)

    return list(set(detected))