from os import listdir
from os.path import isfile, join, isdir


class Tools:
    @staticmethod
    def fread(file):
        f = open(file)
        data = f.read()
        f.close()
        return data
