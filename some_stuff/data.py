import pandas
import os
from pandas import read_excel
names = os.listdir('C:\\video\\xlsx')
for i in names:
	path = 'C:\\video\\xlsx\\' + i
	data = read_excel(path, skiprows = 1, index_col = 0)
	delet = data.columns.values[0:2]
	del data[delet[0]]
	del data[delet[1]]
	print(i)
	age = i[:-14]
	data = data.assign(Age = pandas.Series([age for x in range(141)]).values)
	data.to_csv(('C:\\video\\csv\\' + i[:-14] + '.csv'))
