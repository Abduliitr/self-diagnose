#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue May 18 20:32:43 2021

@author: backpropagator
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier

dataset = pd.read_csv('./Training.csv')

labels = np.array(dataset.iloc[:,-1])

unique_classes = list(np.unique(labels))

dataset['prognosis'] = dataset['prognosis'].apply(unique_classes.index)

train_symptoms = np.array(dataset.iloc[:,:-1])

train_labels = np.array(dataset.iloc[:,-1])

def result(input_symptoms):
    input_symptoms=np.array(input_symptoms)
    clf = RandomForestClassifier()

    clf.fit(train_symptoms,train_labels)
    
    prob = clf.predict_proba(input_symptoms.reshape(1,-1))
    
    sorted_index = np.argsort(prob)
    
    first = sorted_index[0][-1]
    second = sorted_index[0][-2]
    third = sorted_index[0][-3]
    fourth = sorted_index[0][-4]
    fifth = sorted_index[0][-5]
    
    diseases = [
        unique_classes[first],
        unique_classes[second],
        unique_classes[third],
        unique_classes[fourth],
        unique_classes[fifth]
        ]
    
    return diseases

# if __name__ == '__main__':    
#     result([1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])