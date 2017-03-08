ENV=env

install: env numpy
	./$(ENV)/bin/pip3 install -r requirements.txt

clean:
	rm -rf $(ENV)

env:
	virtualenv -p python3 $(ENV)

# workaround race condition when installing resampy
numpy:
	./$(ENV)/bin/pip3 install numpy

check:
	./$(ENV)/bin/pep8 . --exclude=$(ENV)
