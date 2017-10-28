from PIL import Image
from skimage.measure import block_reduce
import numpy as np

name = "C:\\Users\\gito\\Downloads\\3s.bmp"
image = Image.open(name)
image_array = np.array(image)
js_array = []
for y in range(image.size[0]):
    rows = []
    for x in range(image.size[1]):
        if image_array[x][y] == False:
            rows.append(('#r' + str(y) + 'x' + str(x)))
    js_array.extend(rows)
f = open(('usas' + '.txt'), 'wb')
for item in js_array:
	f.write(item + ',')
f.close()
