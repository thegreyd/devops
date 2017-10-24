import pickle
di = pickle.load(open('res_dict', 'rb+'))
count = 0 
for i in di:
	if di[i] != 0:
		print i, "\t", di[i]
		count +=1 
print count
