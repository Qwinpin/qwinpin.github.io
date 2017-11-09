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
	if i.find('all') != -1:
		sex = 'All'
	elif i.find('female') != -1:
		sex = 'Female'
	else:
		sex = 'Male'
		
	if i.find('neoplazm') != -1:
		iss = 'Neoplazm'
	elif i.find('infection') != -1:
		iss = 'Infection'
	else:
		iss = 'All'
	data = data.assign(Sex = pandas.Series([sex for x in range(141)]).values)
	data = data.assign(Cause = pandas.Series([iss for x in range(141)]).values)
	data.to_csv(('C:\\video\\xlsx\\' + i + '.csv'))
