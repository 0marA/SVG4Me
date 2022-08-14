import os
import zipfile

def unzip(path_to_zip_file, directory_to_extract_to):
    with zipfile.ZipFile(path_to_zip_file, 'r') as zip_ref:
        zip_ref.extractall(directory_to_extract_to)
        
def walk(path):
    ## Loop twice so that it can print the first time
    for x in "to":
        for root, dirs, files in os.walk(path, topdown=False):
            for name in files:
                if name.endswith(".zip"):
                    unzip(os.path.join(root, name), os.path.join(root, name[:-4]))
                    os.remove(os.path.join(root, name))
                if name.endswith(".svg"):
                    return os.path.join(root, name)