from PIL import Image
from skimage.measure import block_reduce
import numpy as np

name = "C:\\Users\\gito\\Downloads\\grim.bmp"
image = Image.open(name)
image_array = np.array(image)
js_array = []
for y in range(image.size[0]):
    rows = []
    for x in range(image.size[1]):
        if image_array[x][y] == False:
            rows.append("'" + str(x) + "," + str(y) + "'")
    js_array.extend(rows)
f = open(('grim2' + '.txt'), 'wb')
for item in js_array:
	f.write(item + ",")
f.close()
