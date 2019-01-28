# ImagoForm

A python command-line tool made to assist on GIF/APNG splitting/building, sequential file renaming, 
and perhaps more tools in the future

### Available subcommands
1. `rename`  
    Renames multiple images with incrementing sequence numbers, in the same folder it's executed.
    
2.  `split`  
    Splits an animated GIF into a directory of PNG frames.  
    Example:  
    ```
    python3.7 imagoform.py split sodis.gif
    ```
    The directory will be created in the same folder containing the gif

3.  `compose`  
    Creates an animated GIF out of a directory of PNG frames.  
    Example:  
    ```
    python3.7 imagoform.py compose animation/
    ```
    Where `animation` is the name of the directory containing the image frames. The resulting GIF 
    will have its frames ordered from their names alphabetically.

### Built with
*   [Click](http://click.palletsprojects.com/en/7.x/) : CLI interface
*   [Pillow](https://python-pillow.org/) : Image parsing library
*   [pyAPNG](https://github.com/eight04/pyAPNG) : APNG parsing
