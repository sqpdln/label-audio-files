# Micro gui for labelling audio data.

Build:

```
make
. ./env/bin/activate
```

Run:

```
python server.py <path/to/audiofiles>
```

Optionally start at index i:
```
python server.py <path/to/audiofiles> <i>
```

Go to localhost:5000

Add more labels in main.js

Check labels for current sound and press enter for next sound.

Watch your ears, volume is not normalised.

For some reason, chrome sometimes doesn't load new audio src correctly, use mozilla.
