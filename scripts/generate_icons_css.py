#!/usr/bin/python
import os



class_format = ".icon_%d { width: 32px; height: 32px; background: url('/%s'); }"

def all_files(path):
	for f in os.listdir(path):
		fullpath = os.path.join(path, f)
		if os.path.isdir(fullpath):
			for p in all_files(fullpath):
				yield p
		elif fullpath.endswith(".png"):
			yield fullpath


i = 0
for path in all_files("./static/images/icons"):
	print class_format % (i, path.replace("./static/", ""))
	i += 1