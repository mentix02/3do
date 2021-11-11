#!/usr/bin/env python3

import sys
import json

import requests


URL = 'http://localhost:{}/api/tasks'


def main(argv):

	if len(argv) != 2:
		print(f'usage: {argv[0]} <port>', file=sys.stderr)
		exit(1)

	url = URL.format(argv[1])

	with open('data.json') as f:
		tasks = json.load(f)

	for task in tasks:
		r = requests.post(url, json=task)
		if not r.ok:
			print(f'error: {r.text}', file=sys.stderr)
			exit(1)


if __name__ == '__main__':
	main(sys.argv)
