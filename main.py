from __future__ import print_function
import sys
import random
import string
from typing import List

import zerorpc

from pybrain.inspect_ops import _inspect_image, _inspect_sequence
from pybrain.render_ops import _split_image, _combine_image, _delete_temp_images


class API(object):

    def inspect_image(self, image_path):
        info = _inspect_image(image_path)
        return info

    def inspect_sequence(self, dir_path):
        info = _inspect_sequence(dir_path)
        return info

    def combine_image(self, image_paths, out_dir, filename, fps, extension, reverse, transparent, flip_horizontal, flip_vertical):
        # raise Exception(image_paths, out_dir, filename, fps, extension, fps, reverse, transparent)
        if not image_paths and not out_dir:
            raise Exception("Please load the sequences and choose the output folder!")
        elif not image_paths:
            raise Exception("Please load the sequences!")
        elif not out_dir:
            raise Exception("Please choose the output folder!")
        res = _combine_image(image_paths, out_dir, filename, fps, extension, reverse, transparent, flip_horizontal, flip_vertical)
        return res

    def split_image(self, image_path, out_dir):
        if not image_path and not out_dir:
            raise Exception("Please load a GIF or APNG and choose the output folder!")
        elif not image_path:
            raise Exception("Please load a GIF or APNG!")
        elif not out_dir:
            raise Exception("Please choose an output folder!")
        res = _split_image(image_path, out_dir)
        return res

    def delete_temp_images(self):
        res = _delete_temp_images()
        return res


def parse_port():
    return 4242


def main():
    address = f"tcp://127.0.0.1:{parse_port()}"
    server = zerorpc.Server(API())
    server.bind(address)
    print(f"Start running on {address}")
    print(server.run())


if __name__ == "__main__":
    main()
